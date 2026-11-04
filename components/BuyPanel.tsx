'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  CreditCard,
  Coins,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Loader2
} from 'lucide-react';
import { Video } from '@/lib/types';

interface BuyPanelProps {
  video: Video;
  onSuccess?: (orderId: string, email: string) => void;
}

export default function BuyPanel({ video, onSuccess }: BuyPanelProps) {
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto'>('card');
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percentOff: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateTotal = () => {
    let cents = video.priceCents;
    if (appliedPromo) {
      cents = Math.round(cents * (1 - appliedPromo.percentOff / 100));
    }
    return cents;
  };

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (code === 'DBVIP') {
      setAppliedPromo({ code: 'DBVIP', percentOff: 20 });
    } else if (code === 'LAUNCH50') {
      setAppliedPromo({ code: 'LAUNCH50', percentOff: 50 });
    } else {
      setPromoError('Invalid or expired discount code.');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address for instant delivery.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          videoId: video.id,
          promoCode: appliedPromo?.code,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initiate checkout.');
      }

      // Redirect to simulator / processor
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      setErrorMessage((err as Error)?.message || 'Payment initiation failed.');
      setIsLoading(false);
    }
  };

  if (video.isSubscriptionOnly) {
    return (
      <div className="bg-surface-1 border border-gold/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs uppercase font-extrabold tracking-widest">VIP Club Exclusive</span>
        </div>

        <div>
          <h3 className="text-xl font-display font-bold text-text-primary">
            Locked Inside The Vault
          </h3>
          <p className="mt-2 text-xs text-text-secondary leading-relaxed">
            This video is reserved solely for DB VIP members. One monthly pass unlocks this drop, the entire 15+ video vault archive, and all future weekly releases.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-2 border border-border space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">VIP All-Access Pass</span>
            <span className="font-display font-bold text-gold text-lg">$29.99 / mo</span>
          </div>
          <div className="text-[11px] text-text-muted flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
            <span>Cancel anytime with 1 click. Zero contracts.</span>
          </div>
        </div>

        <Link
          href="/pricing"
          className="w-full py-4 bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold/25 hover:scale-[1.02] transition-all"
        >
          Join VIP Club — Unlock Instantly
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const finalCents = calculateTotal();

  return (
    <div className="bg-surface-1 border border-border hover:border-gold/30 transition-colors rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-border/80 pb-4">
        <div>
          <span className="text-xs uppercase font-semibold text-text-muted block">Direct Drop Purchase</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="font-display font-black text-3xl text-text-primary">
              ${(finalCents / 100).toFixed(2)}
            </span>
            {appliedPromo && (
              <span className="text-xs line-through text-text-muted">
                ${(video.priceCents / 100).toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-bold bg-gold/10 border border-gold/30 text-gold rounded-full">
          Lifetime Access
        </span>
      </div>

      {/* Guest Checkout Form */}
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            Your Email (for instant private access link)
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="fan@example.com"
            className="w-full px-4 py-3 bg-surface-2 border border-border focus:border-gold rounded-xl text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors"
          />
        </div>

        {/* Payment Method Selector */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1.5">
            Select Payment Method
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setPaymentMethod('card')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-gold bg-gold/10 text-gold shadow-sm'
                  : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Debit / Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('crypto')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                paymentMethod === 'crypto'
                  ? 'border-gold bg-gold/10 text-gold shadow-sm'
                  : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
              }`}
            >
              <Coins className="w-4 h-4" />
              Crypto (USDT / BTC)
            </button>
          </div>
        </div>

        {/* Promo code accordion */}
        <div className="pt-1">
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code (e.g. DBVIP)"
              className="flex-1 px-3 py-2 bg-surface-2 border border-border focus:border-gold rounded-lg text-xs text-text-primary placeholder:text-text-muted outline-none uppercase"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-3.5 py-2 bg-surface-3 hover:bg-surface-2 text-text-primary text-xs font-medium rounded-lg border border-border"
            >
              Apply
            </button>
          </div>
          {appliedPromo && (
            <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Code {appliedPromo.code} applied ({appliedPromo.percentOff}% off)!
            </p>
          )}
          {promoError && <p className="mt-1.5 text-xs text-rose-400">{promoError}</p>}
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:scale-[1.01] transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting Secure Gateway...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Instant Unlock — ${(finalCents / 100).toFixed(2)}
            </>
          )}
        </button>
      </form>

      {/* Discretion statement */}
      <div className="space-y-2 text-[11px] text-text-muted border-t border-border/60 pt-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Discreet statement charge: &quot;VAULT DIGITAL SVCS&quot;</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
          <span>Immediate streaming token generated right after approval.</span>
        </div>
      </div>

      {/* Upsell to VIP */}
      <div className="p-4 rounded-xl bg-surface-2/80 border border-gold/30 text-center space-y-2">
        <p className="text-xs text-text-secondary">
          Want this drop plus <span className="text-gold font-bold">everything else</span> DB releases?
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Get DB VIP Club Pass for $29.99/mo &rarr;
        </Link>
      </div>
    </div>
  );
}
