import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';
import { paymentAdapter } from '@/lib/payments/adapter';
import { PaymentMethod } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, videoId, planId, promoCode, paymentMethod } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required for secure delivery.' }, { status: 400 });
    }

    let totalCents = 0;
    let itemTitle = 'VAULT Digital Item';

    if (videoId) {
      const video = store.getVideoById(videoId);
      if (!video) {
        return NextResponse.json({ error: 'Video not found.' }, { status: 404 });
      }
      totalCents = video.priceCents;
      itemTitle = video.title;
    } else if (planId) {
      totalCents = 2999; // $29.99/mo VIP membership
      itemTitle = 'DB VIP Vault Monthly Membership';
    } else {
      return NextResponse.json({ error: 'Must specify videoId or planId.' }, { status: 400 });
    }

    // Apply promo code if provided
    let discountCents = 0;
    if (promoCode) {
      const promo = store.validatePromoCode(promoCode);
      if (promo) {
        if (promo.percentOff) {
          discountCents = Math.round((totalCents * promo.percentOff) / 100);
        } else if (promo.amountOffCents) {
          discountCents = promo.amountOffCents;
        }
        totalCents = Math.max(0, totalCents - discountCents);
      }
    }

    const validatedMethod: PaymentMethod = [
      'card',
      'apple_pay',
      'cashapp',
      'wire',
      'crypto',
    ].includes(paymentMethod)
      ? paymentMethod
      : 'card';

    // Create order
    const order = store.createOrder({
      email,
      totalCents,
      videoId,
      videoTitle: itemTitle,
      planId,
      promoCode,
      processor: validatedMethod,
    });

    const returnUrl = videoId
      ? `/watch/${videoId}?orderId=${order.id}&email=${encodeURIComponent(email)}`
      : `/library?email=${encodeURIComponent(email)}&upgraded=vip`;

    const session = await paymentAdapter.createOneTimeCheckout({
      orderId: order.id,
      amountCents: totalCents,
      email,
      itemTitle,
      returnUrl,
      paymentMethod: validatedMethod,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      checkoutUrl: session.checkoutUrl,
      totalCents,
      paymentMethod: validatedMethod,
    });
  } catch (err: unknown) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Internal checkout error' }, { status: 500 });
  }
}
