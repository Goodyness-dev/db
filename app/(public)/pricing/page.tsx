'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PaymentMethod } from '@/lib/types';

export default function PricingPage() {
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('apple_pay');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-mono">
      {/* Title */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider font-mono">
          MEMBERSHIP TIERS
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary uppercase tracking-tight font-sans">
          Choose How You Experience DB
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans px-2">
          Pay as you go per individual drop, or join the VIP Club for unlimited all-access streaming to everything DB publishes without being on file with OnlyFans.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch font-mono">
        {/* Tier 1: Pay Per Video */}
        <div className="p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-surface-1 border border-border flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted font-mono">A LA CARTE</span>
              <h3 className="font-display font-bold text-2xl text-text-primary mt-1 uppercase font-sans">
                Pay-Per-Video Drops
              </h3>
              <p className="text-xs text-text-secondary mt-2 font-sans">
                Great if you only want to collect specific releases.
              </p>
            </div>

            <div className="space-y-1 border-y border-border/60 py-4">
              <span className="text-xs text-text-muted">Average price per drop</span>
              <div className="font-display font-black text-3xl text-text-primary">$14.99 – $29.99</div>
              <span className="text-[11px] text-text-muted">One-time purchase • Lifetime access</span>
            </div>

            {/* Checklist */}
            <ul className="space-y-3 text-xs text-text-secondary font-sans">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold">+</span>
                <span>Permanent lifetime access to purchased item</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold">+</span>
                <span>Full 4K Ultra-HD streaming quality</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-mono font-bold">+</span>
                <span>Apple Pay, Cash App, Wire, Card & Crypto accepted</span>
              </li>
              <li className="flex items-center gap-2 text-text-muted">
                <span className="font-mono font-bold">—</span>
                <span>No access to VIP-only uncut archives</span>
              </li>
              <li className="flex items-center gap-2 text-text-muted">
                <span className="font-mono font-bold">—</span>
                <span>No Telegram VIP private community invite</span>
              </li>
            </ul>
          </div>

          <Link
            href="/catalog"
            className="w-full py-4 bg-surface-2 hover:bg-surface-3 text-text-primary border border-border hover:border-gold/30 font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center font-mono"
          >
            Browse Individual Drops &rarr;
          </Link>
        </div>

        {/* Tier 2: VIP All-Access Membership (Highlighted) */}
        <div className="relative p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-surface-1 border-2 border-gold flex flex-col justify-between space-y-8 shadow-2xl shadow-gold/15 overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold text-black font-extrabold text-[10px] uppercase tracking-wider px-4 py-1 rounded-bl-xl shadow-md font-mono">
            MOST POPULAR • 80% SAVINGS
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold font-mono">
                VIP CLUB
              </span>
              <h3 className="font-display font-bold text-2xl text-text-primary mt-1 uppercase font-sans">
                All-Inclusive Vault Pass
              </h3>
              <p className="text-xs text-text-secondary mt-2 font-sans">
                12+ videos this month for the price of 1 single drop.
              </p>
            </div>

            <div className="space-y-1 border-y border-gold/30 py-4 bg-gold/5 -mx-6 sm:-mx-10 px-6 sm:px-10">
              <span className="text-xs text-gold font-semibold uppercase font-mono">Monthly Membership</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-4xl text-text-primary">$29.99</span>
                <span className="text-xs text-text-muted">/ month</span>
              </div>
              <span className="text-[11px] text-text-muted">Billed monthly • Cancel anytime in 1 click</span>
            </div>

            <ul className="space-y-3 text-xs text-text-secondary font-sans">
              <li className="flex items-center gap-2 font-medium text-text-primary">
                <span className="text-gold font-mono font-bold">VIP</span>
                <span>All current & future 4K video releases included</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-text-primary">
                <span className="text-gold font-mono font-bold">VIP</span>
                <span>Full access to exclusive VIP Vault Uncut Archives</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-text-primary">
                <span className="text-gold font-mono font-bold">VIP</span>
                <span>Private VIP Telegram group invite link (@DBGOD1)</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-text-primary">
                <span className="text-gold font-mono font-bold">VIP</span>
                <span>Weekly subscriber polls deciding upcoming shoots</span>
              </li>
              <li className="flex items-center gap-2 font-medium text-text-primary">
                <span className="text-gold font-mono font-bold">VIP</span>
                <span>100% discreet billing: &quot;VAULT DIGITAL&quot;</span>
              </li>
            </ul>
          </div>

          {/* Quick Subscribe Form with Payment Options */}
          <form onSubmit={handleJoinVip} className="space-y-3 pt-2 font-mono">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to join..."
              className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-xs text-text-primary placeholder:text-text-muted outline-none transition-colors"
            />

            {/* Payment Method Selector Grid */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`py-2 rounded-lg text-xs font-bold uppercase border transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-white bg-white text-black'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                Apple Pay
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('cashapp')}
                className={`py-2 rounded-lg text-xs font-bold uppercase border transition-all ${
                  paymentMethod === 'cashapp'
                    ? 'border-emerald-400 bg-[#00D632]/20 text-emerald-400'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                Cash App
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('wire')}
                className={`py-2 rounded-lg text-xs font-bold uppercase border transition-all ${
                  paymentMethod === 'wire'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                Wire
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${
                  paymentMethod === 'card'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`py-1.5 rounded-lg text-xs font-bold uppercase border transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                Crypto
              </button>
            </div>

            {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 ${
                paymentMethod === 'apple_pay'
                  ? 'bg-white hover:bg-neutral-100 text-black shadow-white/10'
                  : paymentMethod === 'cashapp'
                  ? 'bg-[#00D632] hover:bg-[#00BF2C] text-black shadow-[#00D632]/25'
                  : 'bg-gold hover:bg-gold-light text-black shadow-gold/25'
              }`}
            >
              {isLoading
                ? 'GENERATING VIP CHECKOUT...'
                : paymentMethod === 'apple_pay'
                ? 'UNLOCK VIP WITH APPLE PAY — $29.99/MO'
                : paymentMethod === 'cashapp'
                ? 'UNLOCK VIP WITH CASH APP — $29.99/MO'
                : paymentMethod === 'wire'
                ? 'WIRE TRANSFER VIP PASS — $29.99/MO'
                : 'UNLOCK VIP VAULT PASS — $29.99/MO'}
            </button>
          </form>
        </div>
      </div>

      {/* Discretion & Telegram assurance */}
      <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-surface-1 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary font-mono">
        <div>
          <span className="font-bold text-text-primary block uppercase">ZERO COMMITMENT</span>
          <span className="font-sans">You may cancel at any point from your Member Billing page in one single click.</span>
        </div>
        <a
          href="https://t.me/DBGOD1"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-surface-2 hover:bg-surface-3 border border-border rounded-lg text-text-primary font-mono font-semibold shrink-0 transition-colors"
        >
          TG: @DBGOD1 (11.9K+) &rarr;
        </a>
      </div>
    </div>
  );
}
