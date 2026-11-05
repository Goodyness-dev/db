export type UserRole = 'customer' | 'admin' | 'manager';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
  ageConfirmedAt?: string;
  createdAt: string;
}

export type VideoStatus = 'draft' | 'scheduled' | 'published' | 'archived';

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  isSubscriptionOnly: boolean;
  status: VideoStatus;
  durationSeconds: number;
  categoryId: string;
  categoryName: string;
  tags: string[];
  thumbnailUrl: string;
  teaserUrl: string;
  streamUrl: string;
  viewCount: number;
  featured?: boolean;
  resolution?: string; // e.g. "4K UHD", "1080p 60fps"
  publishedAt: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  itemCount: number;
}

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'chargeback';

export type PaymentMethod = 'card' | 'apple_pay' | 'cashapp' | 'wire' | 'crypto' | 'mock';

export interface Order {
  id: string;
  userId: string;
  email: string;
  status: OrderStatus;
  totalCents: number;
  currency: string;
  processor: PaymentMethod;
  processorSessionId: string;
  videoId?: string;
  videoTitle?: string;
  planId?: string;
  promoCode?: string;
  discountCents?: number;
  cashAppCashtag?: string;
  wireReference?: string;
  ipHash: string;
  createdAt: string;
  paidAt?: string;
}

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'expired';

export interface Subscription {
  id: string;
  userId: string;
  userEmail: string;
  planId: string;
  planName: string;
  priceCents: number;
  status: SubscriptionStatus;
  processorSubscriptionId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  createdAt: string;
}

export interface Entitlement {
  id: string;
  userId: string;
  userEmail: string;
  videoId?: string; // null means all subscription items
  source: 'purchase' | 'subscription' | 'gift' | 'admin';
  sourceId: string;
  startsAt: string;
  endsAt?: string; // null means lifetime
  revokedAt?: string;
}

export interface PromoCode {
  id: string;
  code: string;
  percentOff?: number;
  amountOffCents?: number;
  maxUses: number;
  usedCount: number;
  expiresAt: string;
  active: boolean;
}

export interface ComplianceRecord {
  id: string;
  videoId: string;
  videoTitle: string;
  performerName: string;
  performerDobVerified: boolean;
  idDocumentRef: string;
  consentFormRef: string;
  recordedDate: string;
  status: 'compliant' | 'pending_review' | 'expired';
  notes: string;
}

export interface TakedownRequest {
  id: string;
  requesterName: string;
  requesterEmail: string;
  videoId: string;
  videoTitle: string;
  reason: string;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  createdAt: string;
}

export interface PaymentConfig {
  cashAppCashtag: string;
  wireBankName: string;
  wireAccountName: string;
  wireAccountNumber: string;
  wireRoutingNumber: string;
  wireSwiftCode: string;
  applePayMerchantId: string;
  telegramHandle: string;
}
