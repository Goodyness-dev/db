import React from 'react';
import Link from 'next/link';
import { store } from '@/lib/db/store';
import VideoCard from '@/components/VideoCard';

export default function HomePage() {
  const videos = store.getVideos();
  const featuredDrop = videos[0];
  const latestDrops = videos.slice(1, 5);

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border/60">
        {/* Background Ambient Video / Backdrop with cinematic gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-25 filter blur-sm scale-105"
            src="/media/vault-drop-01.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/60 to-background" />
        </div>

        {/* Ambient Gold Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gold/15 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8 py-14 sm:py-20 font-mono">
          {/* Headline */}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-7xl tracking-tight text-text-primary uppercase leading-tight font-sans">
              PRIVATE VAULT <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                BY CREATOR DB
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-text-secondary font-normal leading-relaxed font-sans px-2">
              Unfiltered, cinematic 4K productions and exclusive private archives. Instant unlocking in under 60 seconds with 100% discreet billing.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 font-mono">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-xl shadow-gold/25 hover:scale-105 text-center"
            >
              EXPLORE ALL DROPS &rarr;
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-4 bg-surface-2 hover:bg-surface-3 text-text-primary border border-border hover:border-gold/40 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all text-center"
            >
              JOIN VIP CLUB ($29.99/MO)
            </Link>
          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href="https://t.me/DBGOD1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/90 border border-border hover:border-[#229ED9] text-xs font-mono text-text-secondary hover:text-white transition-all shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-[#229ED9]">TELEGRAM</span>
              <span className="text-text-muted">•</span>
              <span>@DBGOD1 (11.9K+) &rarr;</span>
            </a>
            <a
              href="https://x.com/DBGODPLAYHOUSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/90 border border-border hover:border-gold/40 text-xs font-mono text-text-secondary hover:text-white transition-all shadow-md"
            >
              <span className="font-bold text-white">X</span>
              <span className="text-text-muted">•</span>
              <span>@DBGODPLAYHOUSE &rarr;</span>
            </a>
          </div>

          {/* Value Props Row */}
          <div className="pt-8 sm:pt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto border-t border-border/40 text-left font-mono">
            <div className="p-2.5 sm:p-3 bg-surface-1/40 sm:bg-transparent rounded-xl border border-border/30 sm:border-0">
              <span className="block font-display font-black text-lg sm:text-xl text-text-primary">4K UHD</span>
              <span className="text-[11px] sm:text-xs text-text-muted">Mastered 60FPS</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-surface-1/40 sm:bg-transparent rounded-xl border border-border/30 sm:border-0">
              <span className="block font-display font-black text-lg sm:text-xl text-text-primary">&lt; 60s</span>
              <span className="text-[11px] sm:text-xs text-text-muted">Instant Unlock</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-surface-1/40 sm:bg-transparent rounded-xl border border-border/30 sm:border-0">
              <span className="block font-display font-black text-lg sm:text-xl text-text-primary">100%</span>
              <span className="text-[11px] sm:text-xs text-text-muted">Discreet Statement</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-surface-1/40 sm:bg-transparent rounded-xl border border-border/30 sm:border-0">
              <span className="block font-display font-black text-lg sm:text-xl text-text-primary">APPLE & CASH</span>
              <span className="text-[11px] sm:text-xs text-text-muted">Plus Wire & USDT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drop Banner */}
      {featuredDrop && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-crimson font-bold uppercase tracking-wider">SPOTLIGHT</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight uppercase">
                Featured Release
              </h2>
            </div>
            <span className="text-xs text-gold font-mono font-semibold uppercase tracking-wider">
              4K CINEMA MASTER
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-1 border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl overflow-hidden relative">
            <div className="lg:col-span-7 aspect-video rounded-xl sm:rounded-2xl overflow-hidden relative group">
              <img
                src={featuredDrop.thumbnailUrl}
                alt={featuredDrop.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Link
                  href={`/video/${featuredDrop.slug}`}
                  className="px-6 py-3 rounded-full bg-gold/90 hover:bg-gold text-black font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-gold/30 hover:scale-105 transition-transform"
                >
                  PLAY TEASER
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 sm:space-y-6">
              <div className="inline-block px-3 py-1 bg-crimson/15 border border-crimson/40 text-crimson-light text-xs font-mono font-bold uppercase rounded-full">
                TRENDING ON TELEGRAM
              </div>
              <h3 className="font-display font-bold text-xl sm:text-3xl text-text-primary leading-tight uppercase">
                {featuredDrop.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                {featuredDrop.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-text-muted">
                <span>18M 42S</span>
                <span>•</span>
                <span>4K UHD 60FPS</span>
                <span>•</span>
                <span>{featuredDrop.viewCount.toLocaleString()} VIEWS</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 font-mono">
                <Link
                  href={`/video/${featuredDrop.slug}`}
                  className="px-6 py-3.5 bg-gold hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/20 text-center"
                >
                  UNLOCK FOR ${(featuredDrop.priceCents / 100).toFixed(2)} &rarr;
                </Link>
                <Link
                  href={`/video/${featuredDrop.slug}`}
                  className="px-5 py-3.5 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary text-xs font-semibold rounded-xl border border-border uppercase text-center"
                >
                  Watch Teaser
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Drops Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight uppercase">
              Latest Video Drops
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-1 font-mono">
              Hover over cards to preview video teaser reels instantly.
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono font-semibold text-gold hover:text-gold-light transition-colors"
          >
            VIEW ALL ({videos.length}) &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestDrops.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* VIP Club Pitch Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-surface-1 via-surface-2 to-surface-1 border border-gold/40 p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-mono font-bold uppercase tracking-wider">
                VIP CLUB MEMBERSHIP
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary tracking-tight leading-tight uppercase">
                Unlock Everything DB Drops <br />
                <span className="text-gold">For Just $29.99 / Month</span>
              </h2>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl font-sans">
                Skip buying videos one by one. VIP Members receive instant all-access streaming to every past and upcoming video, exclusive unscripted archive reels, private polls, and zero hidden fees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-text-secondary font-mono">
                <div>• All 15+ 4K Vault Videos Included</div>
                <div>• Weekly Early-Access Drops</div>
                <div>• Private VIP Telegram Access</div>
                <div>• Cancel anytime in 1 click</div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 sm:p-8 bg-surface-1 border border-border rounded-2xl text-center space-y-5">
              <div className="space-y-1 font-mono">
                <span className="text-xs uppercase font-bold text-text-muted">Monthly All-Access</span>
                <div className="font-display font-black text-3xl sm:text-4xl text-gold">$29.99</div>
                <span className="text-[11px] sm:text-xs text-text-muted">Renews monthly • Cancel anytime</span>
              </div>

              <Link
                href="/pricing"
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/25 hover:scale-105 flex items-center justify-center text-center"
              >
                JOIN VIP CLUB NOW &rarr;
              </Link>

              <span className="text-[11px] text-text-muted font-mono">
                Discreet billing: &quot;VAULT DIGITAL&quot;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-mono">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight uppercase font-sans">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Discreet, instant, and secure digital delivery.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="font-bold text-text-primary uppercase text-sm">
              Q: What will show on my credit card / bank statement?
            </h4>
            <p className="text-text-secondary leading-relaxed font-sans">
              Your privacy is paramount. Billing is 100% discreet and shows neutrally as &quot;VAULT DIGITAL SVCS&quot; or a generic digital goods descriptor.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="font-bold text-text-primary uppercase text-sm">
              Q: How do I watch after paying?
            </h4>
            <p className="text-text-secondary leading-relaxed font-sans">
              Access is instantaneous. As soon as checkout completes, you are redirected straight to your private high-definition streaming player. We also email a permanent secure access link to the email you entered at checkout.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="font-bold text-text-primary uppercase text-sm">
              Q: Can I pay with Apple Pay, Cash App, or Wire?
            </h4>
            <p className="text-text-secondary leading-relaxed font-sans">
              Yes. We support Apple Pay, Cash App ($DBGOD1), direct Bank Wire / ACH transfers, credit cards, and crypto (USDT & Bitcoin).
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="font-bold text-text-primary uppercase text-sm">
              Q: How do I cancel my VIP Club subscription?
            </h4>
            <p className="text-text-secondary leading-relaxed font-sans">
              You can cancel at any time with a single click inside your Member Billing tab. Access remains active until the end of your billing cycle with zero renewal charges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
