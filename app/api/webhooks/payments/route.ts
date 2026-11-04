import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/db/store';
import { paymentAdapter } from '@/lib/payments/adapter';

// In-memory idempotency cache for webhook events
const processedEvents = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const verification = await paymentAdapter.verifyWebhook(headers, rawBody);
    if (!verification.verified) {
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 });
    }

    const eventId = verification.eventId || `evt_${Date.now()}`;
    if (processedEvents.has(eventId)) {
      // Idempotency: return 200 immediately
      return NextResponse.json({ received: true, duplicate: true });
    }
    processedEvents.add(eventId);

    const { eventType, orderId, subscriptionId } = verification;

    if (eventType === 'payment.succeeded' && orderId) {
      const order = store.markOrderPaid(orderId);
      if (order) {
        console.log(`[VAULT WEBHOOK] Payment succeeded for order ${orderId}, unlocked item.`);
      }
    } else if (eventType === 'subscription.canceled' && subscriptionId) {
      store.cancelSubscription(subscriptionId);
      console.log(`[VAULT WEBHOOK] Subscription ${subscriptionId} canceled.`);
    }

    return NextResponse.json({ received: true, eventId });
  } catch (err: unknown) {
    console.error('Webhook processing error:', err);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
