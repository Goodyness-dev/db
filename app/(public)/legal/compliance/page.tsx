import React from 'react';
import Link from 'next/link';

export default function CompliancePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 font-mono">
      <div className="space-y-3">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-surface-2 border border-border text-xs text-text-secondary font-mono">
          <span className="text-gold font-bold mr-1.5">STATUTORY COMPLIANCE •</span>
          <span>Federal Record Custodian</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary uppercase tracking-tight font-sans">
          18 U.S.C. § 2257 RECORD-KEEPING COMPLIANCE STATEMENT
        </h1>
        <p className="text-xs text-text-muted">
          Last updated: October 2026.
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-surface-1 border border-border space-y-6 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
        <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold font-mono text-xs">
          <span className="font-bold text-gold mr-2">COMPLIANCE NOTICE •</span>
          All visual depictions, images, videos, and associated materials appearing on <strong>VAULT by DB</strong> comply strictly with federal record-keeping requirements set forth in 18 U.S.C. § 2257 and 28 C.F.R. Part 75.
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary font-mono">
            1. Performer Age Verification
          </h2>
          <p>
            All performers depicted in any visual content available on this website were at least 18 years of age at the time the visual depictions were originally produced and recorded. Government-issued photo identification and signed consent agreements verifying each performer’s legal age have been reviewed, verified, and archived in accordance with applicable federal law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary font-mono">
            2. Custodian of Records
          </h2>
          <p>
            The original records required by 18 U.S.C. § 2257 and 28 C.F.R. Part 75 are maintained by the designated Custodian of Records at the following location:
          </p>
          <div className="p-4 rounded-xl bg-surface-2 border border-border font-mono text-xs text-text-primary space-y-1">
            <p><strong>Custodian of Records:</strong> Vault Compliance Officer</p>
            <p><strong>Entity:</strong> Vault Media Group LLC</p>
            <p><strong>Record Location:</strong> Secure Digital Archive Vault / Registered Agent</p>
            <p><strong>Inquiries & Verification:</strong> compliance@vaultbydb.com</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary font-mono">
            3. Zero Tolerance for Non-Consensual or Underage Material
          </h2>
          <p>
            VAULT maintains a strict zero-tolerance policy regarding any depiction of minors or non-consensual visual content. This website does not permit third-party unvetted user uploads. All materials are produced exclusively under controlled studio environments with full documentary releases.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary font-mono">
            4. Content Removal Requests
          </h2>
          <p>
            Any person depicted who wishes to request verification or review of their records or request removal of materials may submit a notice directly via our{' '}
            <Link href="/legal/dmca" className="text-gold underline font-semibold">
              Content Removal & DMCA Portal
            </Link>
            . Inquiries are processed within 48 hours.
          </p>
        </section>
      </div>
    </div>
  );
}
