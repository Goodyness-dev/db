'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  CheckCircle2,
  X,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Coins,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoinVip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          planId: 'plan-monthly-vip',
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout initiation failed.');

      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      setErrorMsg((err as Error)?.message || 'Failed to connect to gateway');
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
          <Crown className="w-4 h-4" />
          Transparent Access Tiers
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary uppercase tracking-tight">
          Choose How You Experience DB
        </h1>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          Pay as you go per individual drop, or join the VIP Club for unlimited all-access streaming to everything DB publishes.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        {/* Tier 1: Pay Per Video */}
        <div className="p-8 sm:p-10 rounded-3xl bg-surface-1 border border-border flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">A La Carte</span>
              <h3 className="font-display font-bold text-2xl text-text-primary mt-1">
                Pay-Per-Video Drops
              </h3>
              <p className="text-xs text-text-secondary mt-2">
                Great if you only want to collect specific releases.
              </p>
            </div>

            <div className="space-y-1 border-y border-border/60 py-4">
              <span className="text-xs text-text-muted">Average price per drop</span>
              <div className="font-display font-black text-3xl text-text-primary">$14.99 – $29.99</div>
              <span className="text-[11px] text-text-muted">One-time purchase • Lifetime access</span>
            </div>

            {/* Checklist */}
            <ul className="space-y-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Permanent lifetime access to purchased item</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full 4K Ultra-HD streaming quality</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant email delivery of secure access link</span>
              </li>
              <li className="flex items-center gap-2.5 text-text-muted">
                <X className="w-4 h-4 text-text-muted shrink-0" />
                <span>No access to VIP-only uncut archives</span>
              </li>
              <li className="flex items-center gap-2.5 text-text-muted">
                <X className="w-4 h-4 text-text-muted shrink-0" />
                <span>No Telegram VIP private community invite</span>
              </li>
            </ul>
          </div>

          <Link
            href="/catalog"
            className="w-full py-4 bg-surface-2 hover:bg-surface-3 text-text-primary border border-border hover:border-gold/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center"
          >
            Browse Individual Drops
          </Link>
        </div>

        {/* Tier 2: VIP All-Access Membership (Highlighted) */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-surface-1 border-2 border-gold flex flex-col justify-between space-y-8 shadow-2xl shadow-gold/15 overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 bg-gold text-black font-extrabold text-[11px] uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-md">
            Most Popular • 80% Savings
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                VIP Members Club
              </span>
              <h3 className="font-display font-bold text-2xl text-text-primary mt-1">
                All-Inclusive Vault Pass
              </h3>
              <p className="text-xs text-text-secondary mt-2">
                12+ videos this month for the price of 1 single drop.
              </p>
            </div>

            <div className="space-y-1 border-y border-gold/30 py-4 bg-gold/5 -mx-8 sm:-mx-10 px-8 sm:px-10">
              <span className="text-xs text-gold font-semibold uppercase">Monthly Membership</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-4xl text-text-primary">$29.99</span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>
              <span className="text-[11px] text-text-muted">Billed monthly • Cancel anytime in 1 click</span>
            </div>

            {/* Checklist */}
            <ul className="space-y-3 text-xs text-text-secondary">
              <li className="flex items-center gap-2.5 font-medium text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>All current & future 4K video releases included</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Full access to exclusive VIP Vault Uncut Archives</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Private VIP Telegram group invite link</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>Weekly subscriber polls deciding upcoming shoots</span>
              </li>
              <li className="flex items-center gap-2.5 font-medium text-text-primary">
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                <span>100% discreet billing: &quot;VAULT DIGITAL&quot;</span>
              </li>
            </ul>
          </div>

          {/* Quick Subscribe Form */}
          <form onSubmit={handleJoinVip} className="space-y-3 pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to join..."
              className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary placeholder:text-text-muted outline-none transition-colors"
            />

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  paymentMethod === 'card'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Debit / Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                Crypto (USDT)
              </button>
            </div>

            {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-gold/25 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating VIP Checkout...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Unlock VIP Vault Pass — $29.99/mo
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Discretion & Telegram assurance */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-surface-1 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold text-text-primary block">Zero Contractual Commitment</span>
            <span>You may cancel at any point from your Member Billing page in one single click.</span>
          </div>
        </div>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-surface-2 hover:bg-surface-3 border border-border rounded-lg text-text-primary font-semibold flex items-center gap-2 shrink-0 transition-colors"
        >
          <Send className="w-3.5 h-3.5 text-[#229ED9]" />
          Join 11K Telegram
        </a>
      </div>
    </div>
  );
}
