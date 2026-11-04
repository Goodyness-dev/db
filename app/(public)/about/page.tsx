import React from 'react';
import Link from 'next/link';
import { Send, Sparkles, Shield, Film, ArrowRight, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          The Vision
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-text-primary uppercase tracking-tight">
          ABOUT CREATOR DB
        </h1>
        <p className="text-sm sm:text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
          Luxury aesthetic. Unapologetic sensuality. Direct fan connection without corporate middle-men.
        </p>
      </div>

      {/* Story & Manifesto */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center bg-surface-1 border border-border rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="md:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden border border-border relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&q=80&auto=format&fit=crop"
            alt="Creator DB"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">Creator & Director</span>
            <h3 className="font-display font-extrabold text-xl text-white">DB</h3>
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary uppercase leading-tight">
            Why I Built The Vault
          </h2>
          <div className="space-y-4 text-xs sm:text-sm text-text-secondary leading-relaxed">
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

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#229ED9] hover:bg-[#1E8BC1] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#229ED9]/20"
            >
              <Send className="w-4 h-4" />
              Join The Official Telegram (11K+)
            </a>
            <Link
              href="/catalog"
              className="px-6 py-3.5 bg-surface-2 hover:bg-surface-3 text-text-primary border border-border font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Browse The Drops
            </Link>
          </div>
        </div>
      </div>

      {/* The 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">01. Scarcity</span>
          <h4 className="font-display font-bold text-base text-text-primary">Limited Drops</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Seasonal batches and exclusive cuts created in limited windows.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">02. Discretion</span>
          <h4 className="font-display font-bold text-base text-text-primary">Total Privacy</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Neutral statement descriptors, encrypted streaming, and zero public customer lists.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">03. Cinema Quality</span>
          <h4 className="font-display font-bold text-base text-text-primary">True 4K UHD</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            Shot on prime cinema lenses with professional high-dynamic range color profiles.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-surface-1 border border-border space-y-2">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">04. Direct Line</span>
          <h4 className="font-display font-bold text-base text-text-primary">Subscriber Polls</h4>
          <p className="text-xs text-text-muted leading-relaxed">
            VIP subscribers directly cast votes to determine the locations, themes, and wardrobe for upcoming shoots.
          </p>
        </div>
      </div>
    </div>
  );
}
