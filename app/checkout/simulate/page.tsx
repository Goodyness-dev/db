'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PaymentMethod } from '@/lib/types';
import { store } from '@/lib/db/store';

function CheckoutSimulateContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId') || 'sim_default';
  const orderId = searchParams.get('orderId') || `ord-${Math.floor(1000 + Math.random() * 9000)}`;
  const videoIdParam = searchParams.get('videoId');
  const returnUrl = searchParams.get('returnUrl') || (videoIdParam ? `/watch/${videoIdParam}` : '/library');
  const isSubscription = searchParams.get('isSubscription') === 'true';
  const initialMethod = (searchParams.get('method') as PaymentMethod) || 'apple_pay';
  const emailParam = searchParams.get('email') || 'collector.vip@gmail.com';
  const itemTitleParam = searchParams.get('itemTitle') || (isSubscription ? 'VIP Club Membership' : 'DROP 01: DBGODPLAYHOUSE (4K)');

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'declined'>('idle');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(initialMethod);
  const [copied, setCopied] = useState<string | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');

  // Cash App sender handle
  const [customerCashtag, setCustomerCashtag] = useState('$fan_vip');

  const amountParam = searchParams.get('amount');
  const amountCents = amountParam ? parseInt(amountParam, 10) : (isSubscription ? 2999 : 5000);
  const amountDisplay = isSubscription ? '$29.99' : `$${(amountCents / 100).toFixed(2)}`;
  const wireReference = `VAULT-${orderId.toUpperCase()}`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSimulatePayment = async (outcome: 'success' | 'declined') => {
    setPaymentStatus('processing');

    setTimeout(async () => {
      if (outcome === 'success') {
        // 1. Immediately create & mark paid in client-synced VaultStore
        store.createOrder({
          id: orderId,
          email: emailParam,
          totalCents: amountCents,
          processor: selectedMethod,
          videoId: videoIdParam || undefined,
          videoTitle: itemTitleParam,
          planId: isSubscription ? 'plan-monthly-vip' : undefined,
          cashAppCashtag: selectedMethod === 'cashapp' ? customerCashtag : undefined,
          wireReference: selectedMethod === 'wire' ? wireReference : undefined,
        });

        store.markOrderPaid(orderId);

        if (videoIdParam) {
          store.grantEntitlement(emailParam, videoIdParam, 'purchase', orderId);
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('vault_member_email', emailParam);
        }

        // 2. Call backend webhook handler
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
                amountCents,
                paymentMethod: selectedMethod,
              },
            }),
          });
        } catch (e) {
          console.error(e);
        }

        setPaymentStatus('success');
        setTimeout(() => {
          window.location.href = returnUrl;
        }, 1600);
      } else {
        setPaymentStatus('declined');
      }
    }, 1000);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Gateway Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold text-sm font-mono">
              V
            </div>
            <div>
              <span className="font-display font-bold text-sm text-text-primary block tracking-wide">
                VAULT SECURE CHECKOUT
              </span>
              <span className="text-[10px] text-text-muted font-mono">HIGH-RISK DISCREET GATEWAY</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-gold/10 border border-gold/40 text-gold rounded-full font-mono">
            ACTIVE GATEWAY
          </span>
        </div>

        {paymentStatus === 'success' ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="inline-block px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs uppercase tracking-widest border border-emerald-500/40">
              PAYMENT CONFIRMED & VERIFIED
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary uppercase">
              Access Granted Instantly
            </h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed font-mono">
              Order {orderId} processed via {selectedMethod.replace('_', ' ').toUpperCase()}. Entitlement active. Redirecting to your private player...
            </p>
            <div className="text-xs font-mono text-gold animate-pulse pt-2">
              REDIRECTING TO MEMBER VAULT...
            </div>
          </div>
        ) : paymentStatus === 'declined' ? (
          <div className="text-center py-6 space-y-4 animate-in fade-in">
            <div className="inline-block px-4 py-1.5 rounded-full bg-crimson/20 text-crimson font-mono font-bold text-xs uppercase border border-crimson/40">
              PAYMENT DECLINED
            </div>
            <h3 className="font-display font-bold text-lg text-text-primary uppercase">
              Transaction Not Completed
            </h3>
            <p className="text-xs text-text-muted font-mono">
              Transaction declined or incomplete. Please check your balance or select another method.
            </p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="px-6 py-2.5 bg-surface-2 border border-border text-xs font-mono font-bold uppercase rounded-xl text-text-primary hover:bg-surface-3"
            >
              Try Again &rarr;
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Order summary banner */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-baseline justify-between font-mono">
              <div>
                <span className="text-[11px] text-text-muted block">
                  ORDER: <span className="text-gold font-bold">{orderId}</span>
                </span>
                <span className="text-xs text-text-primary font-medium">
                  {isSubscription ? 'DB VIP CLUB MONTHLY PASS' : itemTitleParam}
                </span>
              </div>
              <div className="text-right">
                <span className="font-display font-black text-2xl text-gold">{amountDisplay}</span>
                <span className="text-[10px] text-text-muted block">USD</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Select Payment Channel
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('apple_pay')}
                  className={`py-2 px-1 rounded-xl border text-[11px] uppercase transition-all ${
                    selectedMethod === 'apple_pay'
                      ? 'border-white bg-white text-black shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Apple Pay
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('cashapp')}
                  className={`py-2 px-1 rounded-xl border text-[11px] uppercase transition-all ${
                    selectedMethod === 'cashapp'
                      ? 'border-emerald-400 bg-[#00D632]/20 text-emerald-400 shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Cash App
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('wire')}
                  className={`py-2 px-1 rounded-xl border text-[11px] uppercase transition-all ${
                    selectedMethod === 'wire'
                      ? 'border-gold bg-gold/15 text-gold shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Wire / ACH
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`py-2 px-1 rounded-xl border text-[11px] uppercase transition-all ${
                    selectedMethod === 'card'
                      ? 'border-gold bg-gold/15 text-gold shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Card
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('crypto')}
                  className={`py-2 px-1 rounded-xl border text-[11px] uppercase transition-all ${
                    selectedMethod === 'crypto'
                      ? 'border-gold bg-gold/15 text-gold shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Crypto
                </button>
              </div>
            </div>

            {/* SECTION 1: APPLE PAY */}
            {selectedMethod === 'apple_pay' && (
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-700 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="font-bold text-sm text-white uppercase tracking-wider font-mono">
                    Apple Pay Mobile Wallet
                  </span>
                  <span className="text-xs font-mono text-neutral-400">DEVICE LINKED</span>
                </div>

                <div className="space-y-2 text-xs text-neutral-300 font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Card</span>
                    <span>Apple Card (•••• 9012)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Account</span>
                    <span>{emailParam}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Charge</span>
                    <span>{amountDisplay}</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-neutral-400 mb-3 font-mono">
                    Double-click side button or confirm with Face ID / Touch ID
                  </p>
                  <button
                    onClick={() => handleSimulatePayment('success')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl"
                  >
                    {paymentStatus === 'processing'
                      ? 'AUTHORIZING APPLE PAY...'
                      : `CONFIRM APPLE PAY (${amountDisplay})`}
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 2: CASH APP */}
            {selectedMethod === 'cashapp' && (
              <div className="p-5 rounded-2xl bg-surface-2 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <span className="font-bold text-sm text-text-primary uppercase tracking-wider font-mono">
                    Cash App Direct
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00D632]/20 text-emerald-400">
                    DIRECT CASHTAG
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-surface-1 border border-border space-y-1 text-center font-mono">
                    <span className="text-[11px] text-text-muted">Send exact payment to DB&apos;s Cashtag:</span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-display font-black text-xl text-emerald-400 tracking-wide">$DBGOD1</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('$DBGOD1', 'cashtag')}
                        className="px-2 py-0.5 text-[10px] border border-border rounded hover:text-white text-text-muted transition-colors uppercase font-mono font-bold"
                      >
                        {copied === 'cashtag' ? 'COPIED' : 'COPY'}
                      </button>
                    </div>
                    <span className="text-[10px] text-text-muted block">
                      Include note in transfer: <strong className="text-gold font-mono">{orderId}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-text-muted mb-1 font-mono">
                      Your Cash App $Cashtag (for auto-verification):
                    </label>
                    <input
                      type="text"
                      value={customerCashtag}
                      onChange={(e) => setCustomerCashtag(e.target.value)}
                      placeholder="$yourcashtag"
                      className="w-full px-3 py-2 bg-surface-1 border border-border focus:border-emerald-400 rounded-lg text-xs font-mono text-emerald-400 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSimulatePayment('success')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-3.5 bg-[#00D632] hover:bg-[#00BF2C] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00D632]/20"
                  >
                    {paymentStatus === 'processing'
                      ? 'VERIFYING CASHTAG...'
                      : `CONFIRM CASH APP SENT (${amountDisplay})`}
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 3: WIRE TRANSFER */}
            {selectedMethod === 'wire' && (
              <div className="p-5 rounded-2xl bg-surface-2 border border-gold/40 space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <span className="font-bold text-sm text-text-primary uppercase tracking-wider font-mono">
                    Direct Bank Wire / ACH
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gold/15 text-gold">
                    PRIVATE BANKING
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <p className="text-[11px] text-text-secondary leading-relaxed font-mono">
                    Transfer funds directly to DB&apos;s corporate banking depository. Include the transfer reference in your memo.
                  </p>

                  <div className="p-3.5 rounded-xl bg-surface-1 border border-border space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between items-center py-0.5 border-b border-border/60">
                      <span className="text-text-muted">Bank Name:</span>
                      <span className="text-text-primary font-semibold">JPMorgan Chase Bank</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-border/60">
                      <span className="text-text-muted">Beneficiary:</span>
                      <span className="text-text-primary">Vault Media Productions / DB</span>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-border/60">
                      <span className="text-text-muted">Routing / ABA:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-primary font-bold">021000021</span>
                        <button onClick={() => copyToClipboard('021000021', 'routing')} className="hover:text-gold text-text-muted text-[10px] uppercase font-bold">
                          {copied === 'routing' ? 'COPIED' : 'COPY'}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-border/60">
                      <span className="text-text-muted">Account Number:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-primary font-bold">9482019482</span>
                        <button onClick={() => copyToClipboard('9482019482', 'account')} className="hover:text-gold text-text-muted text-[10px] uppercase font-bold">
                          {copied === 'account' ? 'COPIED' : 'COPY'}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted">Transfer Memo:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-gold font-bold">{wireReference}</span>
                        <button onClick={() => copyToClipboard(wireReference, 'ref')} className="hover:text-gold text-text-muted text-[10px] uppercase font-bold">
                          {copied === 'ref' ? 'COPIED' : 'COPY'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSimulatePayment('success')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-3.5 bg-gold hover:bg-gold-light text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/20"
                  >
                    {paymentStatus === 'processing'
                      ? 'RECORDING WIRE DISPATCH...'
                      : `I HAVE SENT WIRE TRANSFER (${amountDisplay})`}
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 4: CREDIT CARD */}
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase font-mono font-bold text-text-muted mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-primary outline-none focus:border-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase font-mono font-bold text-text-muted mb-1">
                        Expires
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-primary outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase font-mono font-bold text-text-muted mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-xs font-mono text-text-primary outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleSimulatePayment('success')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {paymentStatus === 'processing'
                      ? 'PROCESSING CARD...'
                      : `CONFIRM CARD PAYMENT (${amountDisplay})`}
                  </button>
                  <button
                    onClick={() => handleSimulatePayment('declined')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-2 bg-surface-2 hover:bg-surface-3 text-text-muted hover:text-text-primary border border-border text-xs font-mono rounded-xl transition-colors uppercase"
                  >
                    Simulate Card Decline
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 5: CRYPTO */}
            {selectedMethod === 'crypto' && (
              <div className="p-4 rounded-xl bg-surface-2 border border-border text-center space-y-3 font-mono">
                <p className="text-xs font-bold text-gold uppercase">USDT TRC-20 PRIVATE WALLET</p>
                <div className="p-2.5 rounded-lg bg-surface-1 text-[11px] text-text-primary break-all border border-border">
                  TXYZ98273648172648102381273981274
                </div>
                <p className="text-[10px] text-text-muted">Zero-KYC, zero-trace blockchain confirmation.</p>

                <button
                  onClick={() => handleSimulatePayment('success')}
                  disabled={paymentStatus === 'processing'}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  {paymentStatus === 'processing'
                    ? 'VERIFYING BLOCKCHAIN...'
                    : `CONFIRM CRYPTO SENT (${amountDisplay})`}
                </button>
              </div>
            )}

            {/* Discreet statement reminder */}
            <div className="text-[11px] text-text-muted text-center pt-2 border-t border-border/60 font-mono">
              <span>STATEMENT: &quot;VAULT DIGITAL SVCS&quot; • NOT ON ONLYFANS FILE</span>
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
        <div className="min-h-[80vh] flex items-center justify-center font-mono text-gold text-xs">
          INITIALIZING SECURE CHECKOUT...
        </div>
      }
    >
      <CheckoutSimulateContent />
    </Suspense>
  );
}
