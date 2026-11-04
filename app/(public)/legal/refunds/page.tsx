import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, AlertTriangle } from 'lucide-react';

export default function RefundsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight">
          Refund Policy & Chargeback Notice
        </h1>
        <p className="text-xs text-text-muted">Effective Date: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-1 border border-border space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <div className="p-4 rounded-xl bg-surface-2 border border-border flex items-start gap-3">
          <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">Before Contacting Your Bank</h4>
            <p className="text-xs text-text-secondary mt-1">
              If you experience technical issues, double charges, or unrecognized billing, contact our direct team at <strong className="text-gold">billing@vaultbydb.com</strong>. We resolve questions within 12 hours.
            </p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">1. Digital Streaming Nature</h2>
          <p>
            Due to the immediate digital delivery and instantaneous consumption of digital media files upon checkout, purchases of single video drops are considered final and non-refundable once stream access has commenced.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">2. Subscriptions & Cancellations</h2>
          <p>
            You may cancel your recurring VIP Club Membership at any moment through your member portal. When you cancel, future billings will not occur. Subscriptions that have already renewed for an active billing cycle are generally non-refundable unless there was a verifiable billing system error.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">3. Fraud & Chargeback Defense Protocol</h2>
          <p>
            In accordance with merchant banking guidelines, VAULT records cryptographically hashed IP addresses, timestamped stream token issuances, device fingerprints, and verified email authorizations. In the event of an unjustified chargeback or fraudulent claim, access logs and transaction proofs are submitted directly to the card issuing bank, and the associated accounts are permanently blacklisted across our processor network.
          </p>
        </section>
      </div>
    </div>
  );
}
