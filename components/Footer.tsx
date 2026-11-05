import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Send, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-1 text-text-secondary mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-widest text-text-primary">
                VAULT
              </span>
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                BY DB
              </span>
            </div>
            <p className="text-xs leading-relaxed text-text-muted">
              Private members club and exclusive digital storefront for creator DB. Cinematic ultra 4K drops, unscripted archives, and direct creator access.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/DBGOD1"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-surface-2 border border-border flex items-center gap-2 text-text-secondary hover:text-gold hover:border-gold/40 text-xs transition-colors"
                title="Official Telegram @DBGOD1"
              >
                <Send className="w-3.5 h-3.5 text-[#229ED9]" />
                <span>@DBGOD1</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Storefront
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog" className="hover:text-text-primary transition-colors">
                  All Video Drops
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  VIP Club Membership
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-text-primary transition-colors">
                  Member Library
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-text-primary transition-colors">
                  About Creator DB
                </Link>
              </li>
            </ul>
          </div>

          {/* Discretion & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Security & Privacy
            </h4>
            <div className="space-y-2.5 text-xs text-text-muted">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Discreet billing statement: charges appear neutrally as &quot;VAULT DIGITAL SVCS&quot;.</span>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero buyer list sharing. Secure encrypted streaming with watermarking.</span>
              </div>
            </div>
          </div>

          {/* Compliance & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              Compliance (2257)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/legal/compliance" className="hover:text-gold transition-colors">
                  18 U.S.C. § 2257 Record-Keeping
                </Link>
              </li>
              <li>
                <Link href="/legal/dmca" className="hover:text-text-primary transition-colors">
                  DMCA & Takedown Request Form
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="hover:text-text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/refunds" className="hover:text-text-primary transition-colors">
                  Refund Policy & Chargebacks
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-text-muted">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-gold" />
            <span>Strict 18+ adult platform. All depicted individuals were verified 18+ at the time of creation.</span>
          </div>
          <p>© {new Date().getFullYear()} VAULT by DB. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
