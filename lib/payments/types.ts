import { PaymentMethod } from '../types';

export interface CheckoutSession {
  sessionId: string;
  checkoutUrl: string;
  orderId: string;
  amountCents: number;
  currency: string;
  paymentMethod?: PaymentMethod;
  expiresAt: string;
}

export interface PaymentWebhookResult {
  verified: boolean;
  eventId?: string;
  eventType?: 'payment.succeeded' | 'payment.failed' | 'subscription.created' | 'subscription.renewed' | 'subscription.canceled';
  orderId?: string;
  subscriptionId?: string;
  paymentMethod?: PaymentMethod;
  error?: string;
}

export interface PaymentProcessorAdapter {
  createOneTimeCheckout(params: {
    orderId: string;
    amountCents: number;
    email: string;
    itemTitle: string;
    returnUrl: string;
    paymentMethod?: PaymentMethod;
  }): Promise<CheckoutSession>;

  createSubscriptionCheckout(params: {
    userId: string;
    planId: string;
    amountCents: number;
    email: string;
    returnUrl: string;
    paymentMethod?: PaymentMethod;
  }): Promise<CheckoutSession>;

  verifyWebhook(headers: Record<string, string>, rawBody: string): Promise<PaymentWebhookResult>;

  cancelSubscription(processorSubscriptionId: string): Promise<{ success: boolean; message?: string }>;

  refund(orderId: string, amountCents: number, reason?: string): Promise<{ success: boolean; refundId?: string }>;
}
