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
  Loader2,
  Building2,
  Smartphone,
  Copy,
  ExternalLink,
  Check
} from 'lucide-react';
import { PaymentMethod } from '@/lib/types';

function CheckoutSimulateContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('sessionId') || 'sim_default';
  const orderId = searchParams.get('orderId') || 'ord-unknown';
  const returnUrl = searchParams.get('returnUrl') || '/library';
  const isSubscription = searchParams.get('isSubscription') === 'true';
  const initialMethod = (searchParams.get('method') as PaymentMethod) || 'apple_pay';

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'declined'>('idle');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(initialMethod);
  const [copied, setCopied] = useState<string | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');

  // Cash App sender handle
  const [customerCashtag, setCustomerCashtag] = useState('$fan_vip');

  const amountDisplay = isSubscription ? '$29.99' : '$19.99';
  const amountCents = isSubscription ? 2999 : 1999;
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
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface-1 border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Gateway Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center font-bold text-sm">
              V
            </div>
            <div>
              <span className="font-display font-bold text-sm text-text-primary block">
                VAULT SECURE CHECKOUT
              </span>
              <span className="text-[10px] text-text-muted">High-Risk Discreet Gateway</span>
            </div>
          </div>
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-gold/10 border border-gold/40 text-gold rounded-full">
            Active Gateway
          </span>
        </div>

        {paymentStatus === 'success' ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary">
              Payment Confirmed & Verified
            </h3>
            <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
              Order {orderId} processed via {selectedMethod.replace('_', ' ').toUpperCase()}. Entitlement created. Unlocking your private 4K stream player...
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
              Payment Could Not Be Completed
            </h3>
            <p className="text-xs text-text-muted">
              Transaction declined or incomplete. Please check your funds or select another method.
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
            {/* Order summary banner */}
            <div className="p-4 rounded-2xl bg-surface-2 border border-border flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-text-muted block">
                  Order <span className="font-mono text-gold font-bold">{orderId}</span>
                </span>
                <span className="text-xs text-text-primary font-medium">
                  {isSubscription ? 'DB VIP Club Monthly Membership' : 'Digital Video Drop Unlock'}
                </span>
              </div>
              <div className="text-right">
                <span className="font-display font-black text-2xl text-gold">{amountDisplay}</span>
                <span className="text-[10px] text-text-muted block">USD</span>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-text-secondary">
                Select Your Payment Channel
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('apple_pay')}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'apple_pay'
                      ? 'border-white bg-white text-black shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="text-xs"></span>
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('cashapp')}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'cashapp'
                      ? 'border-emerald-400 bg-[#00D632]/20 text-emerald-400 shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="text-emerald-400 text-xs font-black">$</span>
                  <span>Cash App</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('wire')}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'wire'
                      ? 'border-gold bg-gold/15 text-gold shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Wire/Bank</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'card'
                      ? 'border-gold bg-gold/15 text-gold shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('crypto')}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                    selectedMethod === 'crypto'
                      ? 'border-gold bg-gold/15 text-gold shadow-md'
                      : 'border-border bg-surface-2 text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5" />
                  <span>Crypto</span>
                </button>
              </div>
            </div>

            {/* SECTION 1: APPLE PAY */}
            {selectedMethod === 'apple_pay' && (
              <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-700 space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg"></span>
                    <span className="font-bold text-sm text-white">Apple Pay</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">Apple Wallet Linked</span>
                </div>

                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Card</span>
                    <span>Apple Card (•••• 9012)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Contact</span>
                    <span>Authorized Device Email</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-neutral-800">
                    <span>Total Amount</span>
                    <span>{amountDisplay}</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-neutral-400 mb-3 flex items-center justify-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-neutral-300" />
                    Double-click side button or confirm with Face ID / Touch ID
                  </p>
                  <button
                    onClick={() => handleSimulatePayment('success')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-extrabold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
                  >
                    {paymentStatus === 'processing' ? (
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                    ) : (
                      <>
                        <span className="text-base font-bold"></span>
                        <span>Pay with Apple Pay ({amountDisplay})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 2: CASH APP */}
            {selectedMethod === 'cashapp' && (
              <div className="p-5 rounded-2xl bg-surface-2 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#00D632] text-black font-black flex items-center justify-center text-xs">
                      $
                    </div>
                    <span className="font-bold text-sm text-text-primary">Cash App Pay</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00D632]/20 text-emerald-400">
                    Direct Creator Cashtag
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-surface-1 border border-border space-y-1 text-center">
                    <span className="text-[11px] text-text-muted">Send exact payment to DB&apos;s Cashtag:</span>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-display font-black text-xl text-emerald-400 tracking-wide">$DBGOD1</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('$DBGOD1', 'cashtag')}
                        className="p-1 hover:text-white text-text-muted transition-colors"
                        title="Copy Cashtag"
                      >
                        {copied === 'cashtag' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <span className="text-[10px] text-text-muted block">
                      Include note: <strong className="text-gold font-mono">{orderId}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-text-muted mb-1">
                      Your Cash App $Cashtag (for instant auto-verification):
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
                    className="w-full py-3.5 bg-[#00D632] hover:bg-[#00BF2C] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#00D632]/20 flex items-center justify-center gap-2"
                  >
                    {paymentStatus === 'processing' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Cash App Sent ({amountDisplay})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 3: WIRE TRANSFER */}
            {selectedMethod === 'wire' && (
              <div className="p-5 rounded-2xl bg-surface-2 border border-gold/40 space-y-4">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gold" />
                    <span className="font-bold text-sm text-text-primary">Direct Bank Wire / ACH</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gold/15 text-gold">
                    100% Private Bank
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Transfer funds directly to DB&apos;s corporate banking depository. Include the reference code in your transfer memo for automatic matching.
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
                        <button onClick={() => copyToClipboard('021000021', 'routing')} className="hover:text-gold text-text-muted">
                          {copied === 'routing' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-0.5 border-b border-border/60">
                      <span className="text-text-muted">Account Number:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-text-primary font-bold">9482019482</span>
                        <button onClick={() => copyToClipboard('9482019482', 'account')} className="hover:text-gold text-text-muted">
                          {copied === 'account' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-text-muted">Transfer Memo:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-gold font-bold">{wireReference}</span>
                        <button onClick={() => copyToClipboard(wireReference, 'ref')} className="hover:text-gold text-text-muted">
                          {copied === 'ref' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleSimulatePayment('success')}
                    disabled={paymentStatus === 'processing'}
                    className="w-full py-3.5 bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                  >
                    {paymentStatus === 'processing' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>I Have Dispatched Wire ({amountDisplay})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SECTION 4: CREDIT CARD */}
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase font-bold text-text-muted mb-1">
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
                      <label className="block text-[11px] uppercase font-bold text-text-muted mb-1">
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
                      <label className="block text-[11px] uppercase font-bold text-text-muted mb-1">
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
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    {paymentStatus === 'processing' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Pay with Card ({amountDisplay})</span>
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
              </div>
            )}

            {/* SECTION 5: CRYPTO */}
            {selectedMethod === 'crypto' && (
              <div className="p-4 rounded-xl bg-surface-2 border border-border text-center space-y-3">
                <p className="text-xs font-bold text-gold">USDT (TRC-20) Private Wallet</p>
                <div className="p-2.5 rounded-lg bg-surface-1 font-mono text-[11px] text-text-primary break-all border border-border">
                  TXYZ98273648172648102381273981274
                </div>
                <p className="text-[10px] text-text-muted">Zero-KYC, zero-trace blockchain confirmation.</p>

                <button
                  onClick={() => handleSimulatePayment('success')}
                  disabled={paymentStatus === 'processing'}
                  className="w-full py-3.5 bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {paymentStatus === 'processing' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Crypto Broadcast ({amountDisplay})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Discreet statement reminder */}
            <div className="text-[11px] text-text-muted text-center flex items-center justify-center gap-1.5 pt-2 border-t border-border/60">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Statement: &quot;VAULT DIGITAL SVCS&quot; • Not on OnlyFans record</span>
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
