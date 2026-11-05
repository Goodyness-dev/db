import { CheckoutSession, PaymentProcessorAdapter, PaymentWebhookResult } from './types';
import { PaymentMethod } from '../types';
import { store } from '../db/store';

export class MockPaymentAdapter implements PaymentProcessorAdapter {
  async createOneTimeCheckout(params: {
    orderId: string;
    amountCents: number;
    email: string;
    itemTitle: string;
    returnUrl: string;
    paymentMethod?: PaymentMethod;
  }): Promise<CheckoutSession> {
    const sessionId = `sim_chk_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const methodParam = params.paymentMethod ? `&method=${params.paymentMethod}` : '';

    return {
      sessionId,
      orderId: params.orderId,
      checkoutUrl: `/checkout/simulate?sessionId=${sessionId}&orderId=${params.orderId}${methodParam}&returnUrl=${encodeURIComponent(params.returnUrl)}`,
      amountCents: params.amountCents,
      currency: 'USD',
      paymentMethod: params.paymentMethod,
      expiresAt,
    };
  }

  async createSubscriptionCheckout(params: {
    userId: string;
    planId: string;
    amountCents: number;
    email: string;
    returnUrl: string;
    paymentMethod?: PaymentMethod;
  }): Promise<CheckoutSession> {
    const sessionId = `sim_sub_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const method = params.paymentMethod || 'card';

    // Create a pending order for tracking
    const order = store.createOrder({
      email: params.email,
      totalCents: params.amountCents,
      planId: params.planId,
      processor: method,
    });

    return {
      sessionId,
      orderId: order.id,
      checkoutUrl: `/checkout/simulate?sessionId=${sessionId}&orderId=${order.id}&isSubscription=true&method=${method}&returnUrl=${encodeURIComponent(params.returnUrl)}`,
      amountCents: params.amountCents,
      currency: 'USD',
      paymentMethod: method,
      expiresAt,
    };
  }

  async verifyWebhook(headers: Record<string, string>, rawBody: string): Promise<PaymentWebhookResult> {
    try {
      const payload = JSON.parse(rawBody);
      return {
        verified: true,
        eventId: payload.id || `evt_${Date.now()}`,
        eventType: payload.type || 'payment.succeeded',
        orderId: payload.data?.orderId,
        subscriptionId: payload.data?.subscriptionId,
        paymentMethod: payload.data?.paymentMethod,
      };
    } catch (err: unknown) {
      return {
        verified: false,
        error: (err as Error)?.message || 'Invalid payload',
      };
    }
  }

  async cancelSubscription(processorSubscriptionId: string): Promise<{ success: boolean; message?: string }> {
    return {
      success: true,
      message: `Subscription ${processorSubscriptionId} marked to cancel at end of billing cycle.`,
    };
  }

  async refund(orderId: string, amountCents: number, reason?: string): Promise<{ success: boolean; refundId?: string }> {
    const order = store.refundOrder(orderId);
    if (!order) {
      return { success: false };
    }
    return {
      success: true,
      refundId: `ref_${Date.now()}`,
    };
  }
}

export const paymentAdapter = new MockPaymentAdapter();
