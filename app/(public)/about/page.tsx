import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 font-mono">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider font-mono">
          THE VISION
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-text-primary uppercase tracking-tight font-sans">
          ABOUT CREATOR DB
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto leading-relaxed font-sans px-2">
          Luxury aesthetic. Unapologetic sensuality. Direct fan connection without corporate middle-men.
        </p>
      </div>

      {/* Story & Manifesto */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 items-center bg-surface-1 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl">
        <div className="md:col-span-5 aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-border relative">
          <img
            src="/media/db-owner-1.jpg"
            alt="Creator DB"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 font-mono">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">CREATOR & DIRECTOR</span>
            <h3 className="font-display font-extrabold text-xl text-white">DB (@DBGOD1)</h3>
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary uppercase leading-tight font-sans">
            Why I Built The Vault
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
            <p>
              For the past two years, my Telegram channel grew into a vibrant community of over 11,000 passionate loyalists. But handling thousands of manual DMs, payment screenshots, and one-by-one file transfers held back the creative vision.
            </p>
            <p>
              <strong className="text-text-primary">VAULT</strong> is the answer. It is my private home on the web. No algorithm suppression, no corporate censors, no compromised compression.
            </p>
            <p>
              Every video drop here is filmed in authentic 4K resolution, color-graded with a moody, luxurious film grain, and engineered for those who appreciate true aesthetic quality and unscripted intimacy.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-3 font-mono">
            <a
              href="https://t.me/DBGOD1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-[#229ED9] hover:bg-[#1E8BC1] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#229ED9]/20"
            >
              TG: @DBGOD1 (11.9K+) &rarr;
            </a>
            <a
              href="https://x.com/DBGODPLAYHOUSE"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-surface-2 hover:bg-surface-3 text-white border border-border hover:border-gold/40 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
            >
              X: @DBGODPLAYHOUSE &rarr;
            </a>
            <Link
              href="/catalog"
              className="px-5 py-3.5 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary border border-border font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Browse The Drops &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Brand Identity & Visual Portfolio */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono">
          <div>
            <span className="text-xs text-gold font-bold uppercase tracking-wider">BRAND ARCHIVE</span>
            <h3 className="font-display font-extrabold text-2xl text-text-primary uppercase">
              DB Identity & Aesthetic
            </h3>
          </div>
          <span className="text-xs text-text-muted">05 EXCLUSIVE STILLS</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-border relative group bg-surface-1">
            <img
              src="/media/db-owner-2.jpg"
              alt="DB Brand Still 02"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-mono text-gold font-bold uppercase">01. EDITORIAL</span>
            </div>
          </div>

          <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-border relative group bg-surface-1">
            <img
              src="/media/db-owner-3.jpg"
              alt="DB Brand Still 03"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-mono text-gold font-bold uppercase">02. INTIMATE</span>
            </div>
          </div>

          <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-border relative group bg-surface-1">
            <img
              src="/media/db-owner-4.jpg"
              alt="DB Brand Still 04"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-mono text-gold font-bold uppercase">03. DOMINANT</span>
            </div>
          </div>

          <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-border relative group bg-surface-1">
            <img
              src="/media/db-owner-5.jpg"
              alt="DB Brand Still 05"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] font-mono text-gold font-bold uppercase">04. SIGNATURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">01. SCARCITY</span>
          <h4 className="font-display font-bold text-base text-text-primary font-sans uppercase">Limited Drops</h4>
          <p className="text-xs text-text-muted leading-relaxed font-sans">
            Seasonal batches and exclusive cuts created in limited windows.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">02. DISCRETION</span>
          <h4 className="font-display font-bold text-base text-text-primary font-sans uppercase">Total Privacy</h4>
          <p className="text-xs text-text-muted leading-relaxed font-sans">
            Neutral statement descriptors, encrypted streaming, and zero public customer lists.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">03. 4K QUALITY</span>
          <h4 className="font-display font-bold text-base text-text-primary font-sans uppercase">True 4K UHD</h4>
          <p className="text-xs text-text-muted leading-relaxed font-sans">
            Shot on prime cinema lenses with professional high-dynamic range color profiles.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">04. DIRECT LINE</span>
          <h4 className="font-display font-bold text-base text-text-primary font-sans uppercase">Subscriber Polls</h4>
          <p className="text-xs text-text-muted leading-relaxed font-sans">
            VIP subscribers directly cast votes to determine the locations, themes, and wardrobe for upcoming shoots.
          </p>
        </div>
      </div>
    </div>
  );
}
