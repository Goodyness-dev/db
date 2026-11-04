import {
  Video,
  Category,
  Order,
  Subscription,
  Entitlement,
  PromoCode,
  ComplianceRecord,
  TakedownRequest
} from '../types';
import {
  INITIAL_VIDEOS,
  INITIAL_CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_PROMO_CODES,
  INITIAL_COMPLIANCE_RECORDS,
  INITIAL_TAKEDOWNS,
} from './mock-data';

// Singleton in-memory store for server-side Next.js route handlers
class VaultStore {
  private videos: Video[] = [...INITIAL_VIDEOS];
  private categories: Category[] = [...INITIAL_CATEGORIES];
  private orders: Order[] = [...INITIAL_ORDERS];
  private subscriptions: Subscription[] = [...INITIAL_SUBSCRIPTIONS];
  private entitlements: Entitlement[] = [
    // Pre-seed some entitlements for testing
    {
      id: 'ent-1',
      userId: 'usr-101',
      userEmail: 'marcus.v@protonmail.com',
      videoId: 'vid-2',
      source: 'purchase',
      sourceId: 'ord-8921',
      startsAt: '2026-11-04T22:14:48Z',
    },
    {
      id: 'ent-vip-1',
      userId: 'usr-vip-1',
      userEmail: 'alex.cole@vipvault.org',
      source: 'subscription',
      sourceId: 'sub-301',
      startsAt: '2026-10-15T00:00:00Z',
    },
    // Demo user with access to DROP 01
    {
      id: 'ent-demo',
      userId: 'usr-demo',
      userEmail: 'vip@dbvault.com',
      videoId: 'vid-1',
      source: 'purchase',
      sourceId: 'demo-ord',
      startsAt: '2026-10-01T00:00:00Z',
    }
  ];
  private promoCodes: PromoCode[] = [...INITIAL_PROMO_CODES];
  private complianceRecords: ComplianceRecord[] = [...INITIAL_COMPLIANCE_RECORDS];
  private takedowns: TakedownRequest[] = [...INITIAL_TAKEDOWNS];

  // Videos
  getVideos(): Video[] {
    return this.videos;
  }

  getVideoBySlug(slug: string): Video | undefined {
    return this.videos.find((v) => v.slug === slug);
  }

  getVideoById(id: string): Video | undefined {
    return this.videos.find((v) => v.id === id);
  }

  createVideo(video: Omit<Video, 'id' | 'viewCount' | 'createdAt'>): Video {
    const newVideo: Video = {
      ...video,
      id: `vid-${Date.now()}`,
      viewCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.videos.unshift(newVideo);
    return newVideo;
  }

  updateVideo(id: string, updates: Partial<Video>): Video | undefined {
    const idx = this.videos.findIndex((v) => v.id === id);
    if (idx === -1) return undefined;
    this.videos[idx] = { ...this.videos[idx], ...updates };
    return this.videos[idx];
  }

  deleteVideo(id: string): boolean {
    const idx = this.videos.findIndex((v) => v.id === id);
    if (idx === -1) return false;
    this.videos.splice(idx, 1);
    return true;
  }

  // Categories
  getCategories(): Category[] {
    return this.categories;
  }

  // Orders
  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  createOrder(data: {
    email: string;
    totalCents: number;
    videoId?: string;
    videoTitle?: string;
    planId?: string;
    promoCode?: string;
    processor: 'card' | 'crypto' | 'mock';
  }): Order {
    const order: Order = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: `usr-${Buffer.from(data.email).toString('hex').slice(0, 8)}`,
      email: data.email.toLowerCase().trim(),
      status: 'pending',
      totalCents: data.totalCents,
      currency: 'USD',
      processor: data.processor,
      processorSessionId: `sess_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      videoId: data.videoId,
      videoTitle: data.videoTitle,
      planId: data.planId,
      promoCode: data.promoCode,
      ipHash: Math.random().toString(16).substring(2, 14),
      createdAt: new Date().toISOString(),
    };
    this.orders.unshift(order);
    return order;
  }

  markOrderPaid(orderId: string): Order | undefined {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return undefined;
    order.status = 'paid';
    order.paidAt = new Date().toISOString();

    // Automatically generate entitlement
    if (order.videoId) {
      this.grantEntitlement(order.email, order.videoId, 'purchase', order.id);
    } else if (order.planId) {
      // Create subscription & subscription entitlement
      this.createSubscription({
        email: order.email,
        planId: order.planId,
        planName: 'VIP Club Membership',
        priceCents: order.totalCents,
      });
    }

    return order;
  }

  refundOrder(orderId: string): Order | undefined {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return undefined;
    order.status = 'refunded';

    // Revoke entitlement
    if (order.videoId) {
      const ent = this.entitlements.find(
        (e) => e.userEmail === order.email && e.videoId === order.videoId && !e.revokedAt
      );
      if (ent) {
        ent.revokedAt = new Date().toISOString();
      }
    }
    return order;
  }

  // Subscriptions
  getSubscriptions(): Subscription[] {
    return this.subscriptions;
  }

  createSubscription(data: {
    email: string;
    planId: string;
    planName: string;
    priceCents: number;
  }): Subscription {
    const now = new Date();
    const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const sub: Subscription = {
      id: `sub-${Math.floor(100 + Math.random() * 900)}`,
      userId: `usr-${Buffer.from(data.email).toString('hex').slice(0, 8)}`,
      userEmail: data.email.toLowerCase().trim(),
      planId: data.planId,
      planName: data.planName,
      priceCents: data.priceCents,
      status: 'active',
      processorSubscriptionId: `sub_proc_${Date.now()}`,
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: periodEnd.toISOString(),
      cancelAtPeriodEnd: false,
      createdAt: now.toISOString(),
    };
    this.subscriptions.unshift(sub);

    // Grant blanket subscription entitlement
    this.entitlements.push({
      id: `ent-${Date.now()}`,
      userId: sub.userId,
      userEmail: sub.userEmail,
      source: 'subscription',
      sourceId: sub.id,
      startsAt: now.toISOString(),
      endsAt: periodEnd.toISOString(),
    });

    return sub;
  }

  cancelSubscription(id: string): Subscription | undefined {
    const sub = this.subscriptions.find((s) => s.id === id);
    if (!sub) return undefined;
    sub.cancelAtPeriodEnd = true;
    sub.canceledAt = new Date().toISOString();
    return sub;
  }

  // Entitlements
  getEntitlements(email: string): Entitlement[] {
    const cleanEmail = email.toLowerCase().trim();
    return this.entitlements.filter((e) => e.userEmail === cleanEmail && !e.revokedAt);
  }

  grantEntitlement(email: string, videoId: string, source: 'purchase' | 'subscription' | 'gift' | 'admin', sourceId = 'manual'): Entitlement {
    const cleanEmail = email.toLowerCase().trim();
    const existing = this.entitlements.find(
      (e) => e.userEmail === cleanEmail && e.videoId === videoId && !e.revokedAt
    );
    if (existing) return existing;

    const ent: Entitlement = {
      id: `ent-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      userId: `usr-${Buffer.from(cleanEmail).toString('hex').slice(0, 8)}`,
      userEmail: cleanEmail,
      videoId,
      source,
      sourceId,
      startsAt: new Date().toISOString(),
    };
    this.entitlements.push(ent);
    return ent;
  }

  hasAccess(email?: string, videoId?: string): boolean {
    if (!email || !videoId) return false;
    const cleanEmail = email.toLowerCase().trim();
    const video = this.getVideoById(videoId);
    if (!video) return false;

    // Check specific video purchase
    const directAccess = this.entitlements.some(
      (e) => e.userEmail === cleanEmail && e.videoId === videoId && !e.revokedAt
    );
    if (directAccess) return true;

    // Check if user has active subscription
    const activeSub = this.subscriptions.some(
      (s) => s.userEmail === cleanEmail && (s.status === 'active' || s.status === 'past_due')
    );
    if (activeSub) return true;

    return false;
  }

  // Promo Codes
  validatePromoCode(code: string): PromoCode | null {
    const promo = this.promoCodes.find(
      (p) => p.code.toUpperCase() === code.toUpperCase().trim() && p.active
    );
    if (!promo) return null;
    if (promo.usedCount >= promo.maxUses) return null;
    return promo;
  }

  createPromoCode(data: Omit<PromoCode, 'id' | 'usedCount'>): PromoCode {
    const promo: PromoCode = {
      ...data,
      id: `promo-${Date.now()}`,
      usedCount: 0,
    };
    this.promoCodes.push(promo);
    return promo;
  }

  getPromoCodes(): PromoCode[] {
    return this.promoCodes;
  }

  // Compliance
  getComplianceRecords(): ComplianceRecord[] {
    return this.complianceRecords;
  }

  getTakedowns(): TakedownRequest[] {
    return this.takedowns;
  }

  addTakedown(data: Omit<TakedownRequest, 'id' | 'status' | 'createdAt'>): TakedownRequest {
    const tk: TakedownRequest = {
      ...data,
      id: `tk-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    this.takedowns.unshift(tk);
    return tk;
  }

  // Metrics for Admin Dashboard
  getMetrics() {
    const totalRevenueCents = this.orders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + o.totalCents, 0);

    const activeSubs = this.subscriptions.filter((s) => s.status === 'active');
    const mrrCents = activeSubs.reduce((sum, s) => sum + s.priceCents, 0);

    const todayOrders = this.orders.filter((o) => {
      const today = new Date().toISOString().slice(0, 10);
      return o.createdAt.startsWith(today) && o.status === 'paid';
    });
    const todayRevenueCents = todayOrders.reduce((sum, o) => sum + o.totalCents, 0);

    return {
      totalRevenueCents,
      todayRevenueCents,
      mrrCents,
      activeSubscribers: activeSubs.length,
      totalOrders: this.orders.length,
      paidOrdersCount: this.orders.filter((o) => o.status === 'paid').length,
      churnRatePercent: 4.2,
      totalVideos: this.videos.length,
      totalViews: this.videos.reduce((sum, v) => sum + v.viewCount, 0),
    };
  }
}

// Global instance
export const store = new VaultStore();
