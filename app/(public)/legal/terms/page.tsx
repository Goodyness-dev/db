import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs text-text-muted">Effective Date: October 2026</p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-1 border border-border space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">1. Age Requirement & Legal Capacity</h2>
          <p>
            By accessing VAULT by DB, you represent and warrant that you are at least 18 years of age (or the legal age of majority in your jurisdiction of residence) and possess legal capacity to enter into these binding terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">2. Digital Goods License & Anti-Piracy</h2>
          <p>
            All video drops, images, teasers, and audio materials are proprietary copyrighted works. When you purchase a single drop or subscribe to the VIP Club, you receive a non-exclusive, personal, non-transferable revocable license to stream the media for personal entertainment.
          </p>
          <p className="font-semibold text-text-primary">
            Screen-recording, unauthorized downloading, redistribution, re-hosting, or cyberlocker sharing is strictly forbidden. Content streams are embedded with forensic and dynamic session watermarks. Violators will face immediate account termination and statutory civil copyright enforcement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">3. Subscriptions & Billing</h2>
          <p>
            VIP Club Memberships renew automatically each month at $29.99 unless canceled prior to the renewal date. You may cancel at any time within your Member Billing dashboard. Cancellation halts subsequent renewals while preserving active access until current billing period expiration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase text-text-primary">4. Discreet Billing Descriptor</h2>
          <p>
            For your discretion and confidentiality, charges will appear on financial account statements neutrally as &quot;VAULT DIGITAL SVCS&quot; or designated compliant merchant aliases.
          </p>
        </section>
      </div>
    </div>
  );
}
