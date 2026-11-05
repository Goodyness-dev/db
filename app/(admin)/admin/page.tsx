'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { store } from '@/lib/db/store';
import { INITIAL_VIDEOS, INITIAL_CATEGORIES } from '@/lib/db/mock-data';
import AdminSidebar from '@/components/AdminSidebar';
import { Video, Order, Subscription, ComplianceRecord, TakedownRequest, PaymentConfig } from '@/lib/types';

function PaymentMethodBadge({ method }: { method: string }) {
  switch (method) {
    case 'apple_pay':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-neutral-800 text-white border border-neutral-700">
          APPLE PAY
        </span>
      );
    case 'cashapp':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#00D632]/15 text-[#00D632] border border-[#00D632]/40">
          CASH APP
        </span>
      );
    case 'wire':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/15 text-sky-400 border border-sky-500/30">
          WIRE / ACH
        </span>
      );
    case 'crypto':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-amber-500/15 text-amber-400 border border-amber-500/30">
          CRYPTO
        </span>
      );
    case 'card':
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30">
          CARD
        </span>
      );
  }
}

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState('overview');

  // Local state for dashboard interactions
  const [videos, setVideos] = useState<Video[]>(store.getVideos());
  const [orders, setOrders] = useState<Order[]>(store.getOrders());
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(store.getSubscriptions());
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>(store.getComplianceRecords());
  const [takedowns, setTakedowns] = useState<TakedownRequest[]>(store.getTakedowns());

  // Payment configuration state
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(store.getPaymentConfig());
  const [configSaved, setConfigSaved] = useState(false);
  const [lastPaymentAlert, setLastPaymentAlert] = useState<string | null>(null);

  // Search & filter
  const [orderSearch, setOrderSearch] = useState('');
  const [newVideoModal, setNewVideoModal] = useState(false);
  const [telegramAlertsEnabled, setTelegramAlertsEnabled] = useState(true);

  // Cross-tab real-time demo synchronization
  useEffect(() => {
    let prevCount = orders.length;

    const handleSync = () => {
      const latestOrders = store.getOrders();
      const latestSubs = store.getSubscriptions();

      if (latestOrders.length > prevCount && latestOrders[0]) {
        const newest = latestOrders[0];
        setLastPaymentAlert(`⚡ NEW PAYMENT RECEIVED: $${(newest.totalCents / 100).toFixed(2)} via ${newest.processor.toUpperCase()}`);
        setTimeout(() => setLastPaymentAlert(null), 6000);
      }
      prevCount = latestOrders.length;

      setOrders([...latestOrders]);
      setSubscriptions([...latestSubs]);
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('vault_live_order_event', handleSync);

    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('vault_live_sync');
      bc.onmessage = () => handleSync();
    }

    const interval = setInterval(handleSync, 1000);

    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('vault_live_order_event', handleSync);
      if (bc) bc.close();
      clearInterval(interval);
    };
  }, [orders.length]);

  // New video form
  const [newVideoForm, setNewVideoForm] = useState({
    title: '',
    description: '',
    priceCents: 1999,
    categoryId: 'cat-1',
    categoryName: '4K Solo Drops',
    tags: '4K, Solo, VIP',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1280&q=80&auto=format&fit=crop',
    teaserUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isSubscriptionOnly: false,
    resolution: '4K UHD 60FPS',
    durationSeconds: 1200,
  });

  // Calculate live dynamic metrics from current orders & subscriptions
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const totalRevenueCents = paidOrders.reduce((sum, o) => sum + o.totalCents, 0);
  const activeSubs = subscriptions.filter((s) => s.status === 'active');
  const mrrCents = activeSubs.reduce((sum, s) => sum + s.priceCents, 0);
  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0);

  // Handlers
  const handleRefund = (orderId: string) => {
    const refunded = store.refundOrder(orderId);
    if (refunded) {
      setOrders([...store.getOrders()]);
    }
  };

  const handleMarkPaid = (orderId: string) => {
    const paid = store.markOrderPaid(orderId);
    if (paid) {
      setOrders([...store.getOrders()]);
      setSubscriptions([...store.getSubscriptions()]);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    store.updatePaymentConfig(paymentConfig);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleCancelSub = (subId: string) => {
    const canceled = store.cancelSubscription(subId);
    if (canceled) {
      setSubscriptions([...store.getSubscriptions()]);
    }
  };

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newVideoForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const cat = INITIAL_CATEGORIES.find((c) => c.id === newVideoForm.categoryId);

    store.createVideo({
      slug: slug || `drop-${Date.now()}`,
      title: newVideoForm.title,
      description: newVideoForm.description,
      priceCents: Number(newVideoForm.priceCents),
      currency: 'USD',
      isSubscriptionOnly: newVideoForm.isSubscriptionOnly,
      status: 'published',
      durationSeconds: Number(newVideoForm.durationSeconds),
      categoryId: newVideoForm.categoryId,
      categoryName: cat?.name || '4K Solo Drops',
      tags: newVideoForm.tags.split(',').map((t) => t.trim()),
      thumbnailUrl: newVideoForm.thumbnailUrl,
      teaserUrl: newVideoForm.teaserUrl,
      streamUrl: newVideoForm.streamUrl,
      resolution: newVideoForm.resolution,
      publishedAt: new Date().toISOString(),
    });

    setVideos([...store.getVideos()]);
    setNewVideoModal(false);
  };

  const handleDeleteVideo = (id: string) => {
    store.deleteVideo(id);
    setVideos([...store.getVideos()]);
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (!orderSearch.trim()) return true;
    const q = orderSearch.toLowerCase();
    return o.id.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Real-time Order Alert Toast Banner */}
      {lastPaymentAlert && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 font-mono text-xs font-bold flex items-center justify-between shadow-2xl animate-in slide-in-from-top-2">
          <span>{lastPaymentAlert}</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/30 px-2 py-0.5 rounded">JUST NOW</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-wider mb-2">
            [ ROOT ] Authenticated Admin • DB Master Control
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight uppercase">
            CREATOR CONTROL CENTER
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNewVideoModal(true)}
            className="px-4 py-2.5 bg-gold hover:bg-gold-light text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-gold/20"
          >
            + PUBLISH NEW DROP
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Navigation Sidebar */}
        <AdminSidebar currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* Content Area */}
        <div className="flex-1 w-full space-y-8">
          {/* TAB 1: OVERVIEW */}
          {currentTab === 'overview' && (
            <div className="space-y-8">
              {/* Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>MRR</span>
                    <span className="text-gold font-bold">[ MONTHLY ]</span>
                  </div>
                  <div className="font-display font-black text-2xl text-text-primary">
                    ${(mrrCents / 100).toFixed(2)}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-medium">
                    +{activeSubs.length} VIP Members Active
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>GROSS SALES</span>
                    <span className="text-emerald-400 font-bold">[ VOLUME ]</span>
                  </div>
                  <div className="font-display font-black text-2xl text-text-primary">
                    ${(totalRevenueCents / 100).toFixed(2)}
                  </div>
                  <span className="text-[11px] text-text-muted font-mono">
                    Across {paidOrders.length} completed transactions
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>SUBSCRIBERS</span>
                    <span className="text-gold font-bold">[ VIP ]</span>
                  </div>
                  <div className="font-display font-black text-2xl text-text-primary">
                    {activeSubs.length}
                  </div>
                  <span className="text-[11px] text-text-muted font-mono">
                    Churn rate: 4.2% (healthy)
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-muted font-mono">
                    <span>TOTAL PLAYS</span>
                    <span className="text-text-secondary font-bold">[ ARCHIVE ]</span>
                  </div>
                  <div className="font-display font-black text-2xl text-text-primary">
                    {totalViews.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-text-muted font-mono">
                    Across {videos.length} published drops
                  </span>
                </div>
              </div>

              {/* 7-Day Revenue Trend Chart */}
              <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-text-primary uppercase tracking-tight">
                      7-Day Revenue Trend
                    </h3>
                    <p className="text-xs text-text-muted font-mono">Sales spiked following the Telegram teaser release</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    +42% vs last week
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2 pt-6 items-end h-48 border-b border-border/60 pb-3">
                  {[
                    { day: 'Thu', val: 38, amount: '$380' },
                    { day: 'Fri', val: 55, amount: '$550' },
                    { day: 'Sat', val: 82, amount: '$820' },
                    { day: 'Sun', val: 95, amount: '$950' },
                    { day: 'Mon', val: 45, amount: '$450' },
                    { day: 'Tue', val: 68, amount: '$680' },
                    { day: 'Today', val: 100, amount: '$1,120' },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <span className="text-[10px] font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                        {bar.amount}
                      </span>
                      <div
                        style={{ height: `${bar.val}%` }}
                        className={`w-full max-w-[40px] rounded-t-lg transition-all ${
                          bar.day === 'Today'
                            ? 'bg-gradient-to-t from-gold-dark to-gold shadow-lg shadow-gold/20'
                            : 'bg-surface-3 group-hover:bg-gold/60'
                        }`}
                      />
                      <span className="text-[10px] uppercase font-mono font-bold text-text-muted">
                        {bar.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-text-primary uppercase tracking-tight">
                    Recent Customer Purchases ({orders.length})
                  </h3>
                  <button onClick={() => setCurrentTab('orders')} className="text-xs font-mono text-gold hover:underline">
                    VIEW ALL ORDERS &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-[10px] uppercase text-text-muted border-b border-border">
                      <tr>
                        <th className="pb-3">Buyer Email</th>
                        <th className="pb-3">Drop Title</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Method</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-surface-2/40">
                          <td className="py-3 font-medium text-text-primary">{o.email}</td>
                          <td className="py-3 text-text-secondary">{o.videoTitle || 'VIP Subscription'}</td>
                          <td className="py-3 font-bold text-text-primary">${(o.totalCents / 100).toFixed(2)}</td>
                          <td className="py-3">
                            <PaymentMethodBadge method={o.processor} />
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS */}
          {currentTab === 'videos' && (
            <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary uppercase">
                    Video Drops Catalog ({videos.length})
                  </h3>
                  <p className="text-xs text-text-muted font-mono">Manage pricing, subscription tiers, and media streaming endpoints.</p>
                </div>
                <button
                  onClick={() => setNewVideoModal(true)}
                  className="px-4 py-2 bg-gold hover:bg-gold-light text-black text-xs font-mono font-bold uppercase rounded-xl"
                >
                  + ADD VIDEO DROP
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-2 text-[10px] uppercase text-text-muted border-b border-border">
                    <tr>
                      <th className="p-3.5">Title</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Tier</th>
                      <th className="p-3.5">Views</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {videos.map((vid) => (
                      <tr key={vid.id} className="hover:bg-surface-2/40 transition-colors">
                        <td className="p-3.5">
                          <div className="font-medium text-text-primary">{vid.title}</div>
                          <span className="text-[10px] text-text-muted">{vid.resolution || '4K'} • {Math.floor(vid.durationSeconds / 60)} mins</span>
                        </td>
                        <td className="p-3.5 text-text-secondary">{vid.categoryName}</td>
                        <td className="p-3.5 font-bold text-text-primary">
                          {vid.priceCents === 0 ? 'FREE / VIP' : `$${(vid.priceCents / 100).toFixed(2)}`}
                        </td>
                        <td className="p-3.5">
                          {vid.isSubscriptionOnly ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gold/15 text-gold border border-gold/40">
                              VIP Only
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-text-secondary border border-border">
                              Pay-Per-View
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-text-muted">{vid.viewCount.toLocaleString()}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteVideo(vid.id)}
                            className="px-2 py-1 text-text-muted hover:text-crimson border border-border hover:border-crimson/50 rounded transition-colors text-[10px]"
                          >
                            [ DELETE ]
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {currentTab === 'orders' && (
            <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary uppercase">
                    Customer Transactions ({orders.length})
                  </h3>
                  <p className="text-xs text-text-muted font-mono">Live synced across browser tabs. Instant fulfillment & refund handling.</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="SEARCH ORDER ID / EMAIL..."
                    className="w-full px-3 py-1.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs font-mono text-text-primary outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-2 text-[10px] uppercase text-text-muted border-b border-border">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer Email</th>
                      <th className="p-3.5">Item</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">IP Hash</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-surface-2/40 transition-colors">
                        <td className="p-3.5 font-mono text-gold">{ord.id}</td>
                        <td className="p-3.5 font-medium text-text-primary">{ord.email}</td>
                        <td className="p-3.5 text-text-secondary">{ord.videoTitle || 'VIP Subscription'}</td>
                        <td className="p-3.5 font-bold text-text-primary">${(ord.totalCents / 100).toFixed(2)}</td>
                        <td className="p-3.5">
                          <PaymentMethodBadge method={ord.processor} />
                          {ord.processor === 'cashapp' && ord.cashAppCashtag && (
                            <div className="text-[10px] text-text-muted font-mono mt-0.5">{ord.cashAppCashtag}</div>
                          )}
                          {ord.processor === 'wire' && ord.wireReference && (
                            <div className="text-[10px] text-text-muted font-mono mt-0.5">{ord.wireReference}</div>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-[10px] text-text-muted">{ord.ipHash}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            ord.status === 'paid'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          }`}>
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          {ord.status === 'pending' && (
                            <button
                              onClick={() => handleMarkPaid(ord.id)}
                              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold rounded-lg transition-colors"
                            >
                              Confirm Paid
                            </button>
                          )}
                          {ord.status === 'paid' && (
                            <button
                              onClick={() => handleRefund(ord.id)}
                              className="px-2.5 py-1 bg-surface-2 hover:bg-rose-950/40 text-text-secondary hover:text-rose-400 border border-border text-[11px] font-semibold rounded-lg transition-colors"
                            >
                              Refund
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SUBSCRIBERS */}
          {currentTab === 'subscribers' && (
            <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary uppercase">
                    VIP Club Members ({subscriptions.length})
                  </h3>
                  <p className="text-xs text-text-muted font-mono">Automatic renewals, grace window monitor, and cancellation controls.</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-surface-2 text-[10px] uppercase text-text-muted border-b border-border">
                    <tr>
                      <th className="p-3.5">Member Email</th>
                      <th className="p-3.5">Plan</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Next Renewal</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5 text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {subscriptions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-surface-2/40 transition-colors">
                        <td className="p-3.5 font-medium text-text-primary">{sub.userEmail}</td>
                        <td className="p-3.5 text-gold font-semibold">{sub.planName}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sub.status === 'active'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-text-muted">{sub.currentPeriodEnd.slice(0, 10)}</td>
                        <td className="p-3.5 font-bold text-text-primary">${(sub.priceCents / 100).toFixed(2)}/mo</td>
                        <td className="p-3.5 text-right">
                          {sub.status === 'active' && !sub.cancelAtPeriodEnd && (
                            <button
                              onClick={() => handleCancelSub(sub.id)}
                              className="px-2.5 py-1 bg-surface-2 hover:bg-rose-950/40 text-text-secondary hover:text-rose-400 border border-border text-[11px] font-semibold rounded-lg transition-colors"
                            >
                              Cancel Renewal
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: COMPLIANCE */}
          {currentTab === 'compliance' && (
            <div className="space-y-6 font-mono">
              <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gold font-bold text-sm">[ 2257 RECORD CUSTODIAN ]</span>
                  <h3 className="font-display font-bold text-xl text-text-primary uppercase">
                    18 U.S.C. § 2257 Performer Records
                  </h3>
                </div>
                <p className="text-xs text-text-secondary">
                  Statutory custodian verification records, performer government ID references, and signed release documents.
                </p>

                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-2 text-[10px] uppercase text-text-muted border-b border-border">
                      <tr>
                        <th className="p-3.5">Video Title</th>
                        <th className="p-3.5">Performer</th>
                        <th className="p-3.5">DOB Status</th>
                        <th className="p-3.5">Encrypted ID Ref</th>
                        <th className="p-3.5">Recorded Date</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {complianceRecords.map((comp) => (
                        <tr key={comp.id} className="hover:bg-surface-2/40">
                          <td className="p-3.5 font-medium text-text-primary">{comp.videoTitle}</td>
                          <td className="p-3.5 text-text-secondary">{comp.performerName}</td>
                          <td className="p-3.5 text-emerald-400 font-bold text-[11px]">Verified 18+</td>
                          <td className="p-3.5 font-mono text-[10px] text-text-muted">{comp.idDocumentRef}</td>
                          <td className="p-3.5 text-text-muted">{comp.recordedDate}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {comp.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Takedown Requests Log */}
              <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-4">
                <h3 className="font-display font-bold text-base text-text-primary uppercase">
                  Takedown & Removal Requests Log
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-2 text-[10px] uppercase text-text-muted border-b border-border">
                      <tr>
                        <th className="p-3.5">Ticket ID</th>
                        <th className="p-3.5">Requester</th>
                        <th className="p-3.5">Target Video</th>
                        <th className="p-3.5">Reason</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {takedowns.map((tk) => (
                        <tr key={tk.id}>
                          <td className="p-3.5 font-mono text-gold">{tk.id}</td>
                          <td className="p-3.5">{tk.requesterName} ({tk.requesterEmail})</td>
                          <td className="p-3.5 font-medium text-text-primary">{tk.videoTitle}</td>
                          <td className="p-3.5 text-text-muted max-w-xs truncate">{tk.reason}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {tk.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {currentTab === 'settings' && (
            <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-8 font-mono">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                  <h3 className="font-display font-bold text-xl text-text-primary uppercase">
                    Payment Options & Gateway Configuration
                  </h3>
                  <p className="text-xs text-text-muted">
                    Configure receiving credentials for Apple Pay, Cash App ($Cashtag), Wire / ACH bank transfers, and Telegram alerts.
                  </p>
                </div>
                {configSaved && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-pulse">
                    [ SETTINGS SAVED ]
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-8">
                {/* 1. APPLE PAY */}
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                        APPLE PAY MERCHANT GATEWAY
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          ACTIVE
                        </span>
                      </h4>
                      <p className="text-xs text-text-muted">Enables one-touch FaceID / TouchID purchases for Safari, iOS, and macOS customers.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Merchant Identifier</label>
                      <input
                        type="text"
                        value={paymentConfig.applePayMerchantId}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, applePayMerchantId: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-gold rounded-xl text-text-primary outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Domain Association Certificate</label>
                      <input
                        type="text"
                        readOnly
                        value="https://vault-db-chi.vercel.app/.well-known/apple-developer-merchantid-domain-association"
                        className="w-full px-3.5 py-2.5 bg-surface-1/60 border border-border rounded-xl text-text-muted font-mono text-[11px] truncate"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. CASH APP */}
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                        CASH APP P2P DIRECT
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#00D632]/15 text-[#00D632] border border-[#00D632]/30">
                          INSTANT VERIFICATION
                        </span>
                      </h4>
                      <p className="text-xs text-text-muted">Buyers send directly to your Cashtag with their Order ID in the note for automatic fulfillment.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Creator Cashtag ($)</label>
                      <input
                        type="text"
                        value={paymentConfig.cashAppCashtag}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, cashAppCashtag: e.target.value })}
                        placeholder="$DBGOD1"
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-[#00D632] rounded-xl text-text-primary font-mono font-bold outline-none"
                      />
                      <span className="text-[11px] text-text-muted mt-1 block">Live link: https://cash.app/{paymentConfig.cashAppCashtag}</span>
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Payment Instructions to Buyer</label>
                      <input
                        type="text"
                        readOnly
                        value="Enter Order ID in Cash App payment note for instant unlock"
                        className="w-full px-3.5 py-2.5 bg-surface-1/60 border border-border rounded-xl text-text-muted text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. WIRE TRANSFER / DIRECT ACH */}
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                        BANK WIRE & HIGH-VOLUME ACH TRANSFER
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30">
                          DISCREET / HIGH VALUE
                        </span>
                      </h4>
                      <p className="text-xs text-text-muted">For high-tier collectors and custom drops. Buyer receives these exact wire instructions.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Beneficiary Bank Name</label>
                      <input
                        type="text"
                        value={paymentConfig.wireBankName}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, wireBankName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-sky-400 rounded-xl text-text-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Account Holder / Entity Name</label>
                      <input
                        type="text"
                        value={paymentConfig.wireAccountName}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, wireAccountName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-sky-400 rounded-xl text-text-primary outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Account Number</label>
                      <input
                        type="text"
                        value={paymentConfig.wireAccountNumber}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, wireAccountNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-sky-400 rounded-xl text-text-primary outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Routing Number (ABA / FedWire)</label>
                      <input
                        type="text"
                        value={paymentConfig.wireRoutingNumber}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, wireRoutingNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-sky-400 rounded-xl text-text-primary outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">SWIFT / BIC Code (International Wires)</label>
                      <input
                        type="text"
                        value={paymentConfig.wireSwiftCode}
                        onChange={(e) => setPaymentConfig({ ...paymentConfig, wireSwiftCode: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-surface-1 border border-border focus:border-sky-400 rounded-xl text-text-primary outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Wire Reference Policy</label>
                      <input
                        type="text"
                        readOnly
                        value="Automated reference generator prefix: VAULT-ORD-XXXX"
                        className="w-full px-3.5 py-2.5 bg-surface-1/60 border border-border rounded-xl text-text-muted font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. TELEGRAM NOTIFICATIONS */}
                <div className="p-6 rounded-2xl bg-surface-2 border border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-text-primary uppercase">
                        TELEGRAM CREATOR DISPATCH (@DBGOD1)
                      </h4>
                      <p className="text-xs text-text-muted">Receive instant push notifications in your personal Telegram on every sale or renewal.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={telegramAlertsEnabled}
                      onChange={(e) => setTelegramAlertsEnabled(e.target.checked)}
                      className="w-5 h-5 accent-gold cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Creator Telegram Handle</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted">@</span>
                        <input
                          type="text"
                          value={paymentConfig.telegramHandle}
                          onChange={(e) => setPaymentConfig({ ...paymentConfig, telegramHandle: e.target.value })}
                          className="w-full pl-8 pr-3.5 py-2.5 bg-surface-1 border border-border focus:border-gold rounded-xl text-text-primary outline-none font-mono font-bold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-text-secondary font-semibold mb-1">Public Broadcast Channel</label>
                      <input
                        type="text"
                        readOnly
                        value="https://t.me/DBGOD1 (11.9K+ Viewers)"
                        className="w-full px-3.5 py-2.5 bg-surface-1/60 border border-border rounded-xl text-text-muted text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. PROCESSOR ADAPTER DESCRIPTOR */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                    CARD & CRYPTO PROCESSOR DESCRIPTORS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-text-muted mb-1">Processor Type</label>
                      <input
                        type="text"
                        readOnly
                        value="Adult-Compliant Gateway Adapter (Mock / CCBill / SegPay)"
                        className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-text-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-text-muted mb-1">Card Statement Descriptor</label>
                      <input
                        type="text"
                        readOnly
                        value="VAULT DIGITAL SVCS (Active)"
                        className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-gold font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gold hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-gold/20 font-mono"
                  >
                    SAVE PAYMENT SETTINGS &rarr;
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Publish New Video Drop */}
      {newVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto font-mono">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <h3 className="font-display font-bold text-lg text-text-primary uppercase">
                Publish New Video Drop
              </h3>
              <button
                onClick={() => setNewVideoModal(false)}
                className="text-text-muted hover:text-text-primary text-xs font-bold font-mono"
              >
                [ CLOSE ]
              </button>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Drop Title</label>
                <input
                  type="text"
                  required
                  value={newVideoForm.title}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, title: e.target.value })}
                  placeholder="e.g. DROP 07: MIDNIGHT ENCOUNTER II (4K)"
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newVideoForm.description}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, description: e.target.value })}
                  placeholder="Atmospheric notes, filming details, resolution specs..."
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Price in Cents (e.g. 1999 = $19.99)</label>
                  <input
                    type="number"
                    required
                    value={newVideoForm.priceCents}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, priceCents: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Category</label>
                  <select
                    value={newVideoForm.categoryId}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, categoryId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                  >
                    {INITIAL_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Resolution Badge</label>
                  <input
                    type="text"
                    value={newVideoForm.resolution}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, resolution: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Duration in Seconds (1200 = 20 mins)</label>
                  <input
                    type="number"
                    value={newVideoForm.durationSeconds}
                    onChange={(e) => setNewVideoForm({ ...newVideoForm, durationSeconds: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Thumbnail Image URL</label>
                <input
                  type="text"
                  required
                  value={newVideoForm.thumbnailUrl}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, thumbnailUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Teaser Video Loop URL (Public Preview)</label>
                <input
                  type="text"
                  required
                  value={newVideoForm.teaserUrl}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, teaserUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Full 4K Stream URL (Protected Delivery)</label>
                <input
                  type="text"
                  required
                  value={newVideoForm.streamUrl}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, streamUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-surface-2 border border-border focus:border-gold rounded-xl text-text-primary outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="subOnly"
                  checked={newVideoForm.isSubscriptionOnly}
                  onChange={(e) => setNewVideoForm({ ...newVideoForm, isSubscriptionOnly: e.target.checked })}
                  className="w-4 h-4 accent-gold"
                />
                <label htmlFor="subOnly" className="text-text-primary font-semibold cursor-pointer">
                  VIP Members Only (Locked archive drop, $0 with VIP pass)
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewVideoModal(false)}
                  className="px-4 py-2 bg-surface-2 border border-border rounded-xl text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gold hover:bg-gold-light text-black font-bold rounded-xl shadow-md shadow-gold/20"
                >
                  Publish Drop &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
