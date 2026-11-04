'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Crown,
  CreditCard,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Receipt,
  RotateCcw
} from 'lucide-react';
import { store } from '@/lib/db/store';

export default function MemberBillingPage() {
  const [email, setEmail] = useState('');
  const [cancelStatus, setCancelStatus] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vault_member_email');
    if (saved) setEmail(saved);
  }, []);

  const subscriptions = store.getSubscriptions();
  const userSub = subscriptions.find(
    (s) => s.userEmail.toLowerCase() === (email || '').toLowerCase().trim()
  );

  const orders = store.getOrders().filter(
    (o) => o.email.toLowerCase() === (email || '').toLowerCase().trim()
  );

  const handleCancelSub = () => {
    if (userSub) {
      store.cancelSubscription(userSub.id);
      setCancelStatus('Your subscription has been set to cancel at the end of the current billing cycle. No further charges will occur.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-text-primary uppercase tracking-tight">
            Billing & Membership Management
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-1">
            Review active VIP subscriptions, next renewal dates, and payment history.
          </p>
        </div>

        {/* Member Email */}
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="fan@example.com"
            className="px-3 py-1.5 bg-surface-2 border border-border text-xs text-text-primary rounded-lg outline-none"
          />
          <button
            onClick={() => {
              if (email) localStorage.setItem('vault_member_email', email);
            }}
            className="px-3 py-1.5 bg-gold text-black text-xs font-bold rounded-lg"
          >
            Update
          </button>
        </div>
      </div>

      {cancelStatus && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{cancelStatus}</span>
        </div>
      )}

      {/* Subscription Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-surface-1 border border-border space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-bold text-gold flex items-center gap-1.5">
                <Crown className="w-4 h-4" />
                Active VIP Plan
              </span>
              <h3 className="font-display font-bold text-xl text-text-primary">
                {userSub ? userSub.planName : 'No Active VIP Subscription'}
              </h3>
            </div>
            {userSub && (
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                userSub.cancelAtPeriodEnd
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              }`}>
                {userSub.cancelAtPeriodEnd ? 'Cancels at Period End' : 'Active'}
              </span>
            )}
          </div>

          {userSub ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-border/60 py-4 text-xs">
              <div>
                <span className="text-text-muted block">Rate</span>
                <span className="font-bold text-text-primary text-sm">${(userSub.priceCents / 100).toFixed(2)} / mo</span>
              </div>
              <div>
                <span className="text-text-muted block">Period End</span>
                <span className="font-bold text-text-primary text-sm">{userSub.currentPeriodEnd.slice(0, 10)}</span>
              </div>
              <div>
                <span className="text-text-muted block">Auto-Renew</span>
                <span className="font-bold text-text-primary text-sm">{userSub.cancelAtPeriodEnd ? 'Disabled' : 'Enabled'}</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-surface-2 border border-border text-xs text-text-secondary space-y-3">
              <p>You do not currently have an active monthly VIP pass.</p>
              <Link
                href="/pricing"
                className="inline-block px-4 py-2 bg-gold hover:bg-gold-light text-black font-bold text-xs rounded-lg transition-all"
              >
                Join VIP Club ($29.99/mo)
              </Link>
            </div>
          )}

          {userSub && !userSub.cancelAtPeriodEnd && (
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-text-muted">
                Need to pause or cancel?
              </span>
              <button
                onClick={handleCancelSub}
                className="px-4 py-2 bg-surface-2 hover:bg-rose-950/40 text-text-secondary hover:text-rose-300 border border-border hover:border-rose-500/40 text-xs font-semibold rounded-xl transition-all"
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </div>

        {/* Discreet Billing Information */}
        <div className="p-6 rounded-3xl bg-surface-1 border border-border space-y-4">
          <div className="flex items-center gap-2 text-gold">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="text-xs font-bold uppercase tracking-wider">Discreet Guarantee</h4>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            All renewals and transactions appear on bank and card statements as a neutral digital service (&quot;VAULT DIGITAL SVCS&quot;).
          </p>
          <div className="p-3 rounded-xl bg-surface-2 border border-border text-[11px] text-text-muted font-mono">
            DESCRIPTOR: VAULT DIGITAL SVCS<br />
            SUPPORT: billing@vaultbydb.com
          </div>
        </div>
      </div>

      {/* Receipts and Order History */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-text-primary uppercase tracking-tight flex items-center gap-2">
          <Receipt className="w-5 h-5 text-gold" />
          Receipt & Purchase History
        </h3>

        {orders.length === 0 ? (
          <div className="p-8 rounded-2xl bg-surface-1 border border-border text-center text-xs text-text-muted">
            No completed orders recorded under {email || 'your email'}.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-2 text-text-muted uppercase text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Item</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-2/50 transition-colors">
                    <td className="p-4 font-mono text-gold">{order.id}</td>
                    <td className="p-4 font-medium text-text-primary">{order.videoTitle || 'VIP Subscription'}</td>
                    <td className="p-4 uppercase text-[11px] text-text-muted">{order.processor}</td>
                    <td className="p-4 font-bold text-text-primary">${(order.totalCents / 100).toFixed(2)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-text-muted">{order.createdAt.slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
