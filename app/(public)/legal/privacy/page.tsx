import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight">
          Privacy & Discretion Policy
        </h1>
        <p className="text-xs text-text-muted">Effective Date: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-1 border border-border space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">1. Discretion First</h2>
          <p>
            VAULT by DB is architected from the ground up for maximum privacy. We do not sell, rent, or publicly display customer identities or subscription records under any circumstances.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Email Address:</strong> Required strictly for delivering your private access links and subscription receipts.</li>
            <li><strong>Payment Records:</strong> Handled entirely through external PCI-DSS compliant checkout portals. We never see or store full credit card numbers.</li>
            <li><strong>Hashed Security Signatures:</strong> One-way hashed IP addresses and session tokens used strictly to enforce concurrency limits and prevent account sharing or unauthorized leaks.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">3. Data Retention & Deletion Rights</h2>
          <p>
            You have the absolute right to request full erasure of your account details. You may submit an erasure request at privacy@vaultbydb.com, which will be executed within 30 days, retaining only legally mandatory tax transaction logs.
          </p>
        </section>
      </div>
    </div>
  );
}
