'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Coins,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Loader2
} from 'lucide-react';

function CheckoutSimulateContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId') || 'sim_default';
  const orderId = searchParams.get('orderId') || 'ord-unknown';
  const returnUrl = searchParams.get('returnUrl') || '/library';
  const isSubscription = searchParams.get('isSubscription') === 'true';

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'declined'>('idle');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');

  const handleSimulatePayment = async (outcome: 'success' | 'declined') => {
    setPaymentStatus('processing');

    setTimeout(async () => {
      if (outcome === 'success') {
        try {
          await fetch('/api/webhooks/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-vault-signature': 'sig_mock_verified',
            },
            body: JSON.stringify({
              id: `evt_sim_${Date.now()}`,
              type: isSubscription ? 'subscription.created' : 'payment.succeeded',
              data: {
                orderId,
                amountCents: isSubscription ? 2999 : 1999,
              },
            }),
          });
        } catch (e) {
          console.error(e);
        }

        setPaymentStatus('success');
        setTimeout(() => {
          window.location.href = returnUrl;
        }, 1500);
      } else {
        setPaymentStatus('declined');
      }
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold text-xs">
              V
            </div>
            <div>
              <span className="font-display font-bold text-sm text-text-primary block">
                SECURE CHECKOUT GATEWAY
              </span>
              <span className="text-[10px] text-text-muted">High-Risk Processor Sandbox</span>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-gold/10 border border-gold/40 text-gold rounded">
            Test Mode
          </span>
        </div>

        {paymentStatus === 'success' ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary">
              Payment Approved Instantly
            </h3>
            <p className="text-xs text-text-muted">
              Webhook verified. Unlocking your media entitlement and redirecting to the private vault player...
            </p>
            <div className="flex justify-center pt-2">
              <Loader2 className="w-5 h-5 text-gold animate-spin" />
            </div>
          </div>
        ) : paymentStatus === 'declined' ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-crimson/20 text-crimson flex items-center justify-center mx-auto border border-crimson/40">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-text-primary">
              Card Declined By Issuer
            </h3>
            <p className="text-xs text-text-muted">
              Simulated card decline or insufficient funds response.
            </p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="px-6 py-2.5 bg-surface-2 border border-border text-xs font-semibold rounded-xl text-text-primary hover:bg-surface-3"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-text-muted">Order ID: <span className="font-mono text-text-secondary">{orderId}</span></span>
                <span className="font-display font-black text-2xl text-gold">
                  {isSubscription ? '$29.99' : '$19.99'}
                </span>
              </div>
              <p className="text-[11px] text-text-muted">
                {isSubscription ? 'DB VIP Club Monthly Membership' : 'Digital Video Drop Unlock'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  selectedMethod === 'card'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('crypto')}
                className={`py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  selectedMethod === 'crypto'
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-border bg-surface-2 text-text-secondary'
                }`}
              >
                <Coins className="w-3.5 h-3.5" />
                Crypto (USDT)
              </button>
            </div>

            {selectedMethod === 'card' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] uppercase font-bold text-text-muted mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-primary"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-text-muted mb-1">
                      Expires
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-text-muted mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-primary"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-surface-2 border border-border text-center space-y-2">
                <p className="text-xs font-bold text-gold">USDT (TRC-20) Gateway</p>
                <p className="text-[11px] font-mono text-text-muted break-all">
                  TXYZ98273648172648102381273981274
                </p>
                <p className="text-[10px] text-text-muted">Simulate broadcast & block confirmations below.</p>
              </div>
            )}

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleSimulatePayment('success')}
                disabled={paymentStatus === 'processing'}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                {paymentStatus === 'processing' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Simulating Processor Webhook...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Simulate Successful Payment
                  </>
                )}
              </button>

              <button
                onClick={() => handleSimulatePayment('declined')}
                disabled={paymentStatus === 'processing'}
                className="w-full py-2 bg-surface-2 hover:bg-surface-3 text-text-muted hover:text-text-primary border border-border text-xs rounded-xl transition-colors"
              >
                Simulate Card Decline
              </button>
            </div>

            <div className="text-[11px] text-text-muted text-center flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Descriptor: &quot;VAULT DIGITAL SVCS&quot; (Discreet)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutSimulatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
        </div>
      }
    >
      <CheckoutSimulateContent />
    </Suspense>
  );
}
