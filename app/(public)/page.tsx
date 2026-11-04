import React from 'react';
import Link from 'next/link';
import {
  Play,
  Sparkles,
  Crown,
  ShieldCheck,
  Send,
  Lock,
  ArrowRight,
  Flame,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { store } from '@/lib/db/store';
import VideoCard from '@/components/VideoCard';

export default function HomePage() {
  const videos = store.getVideos();
  const featuredDrop = videos[0];
  const latestDrops = videos.slice(1, 5);
  const vipDrop = videos.find((v) => v.isSubscriptionOnly);

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-border/60">
        {/* Background Ambient Video / Backdrop with cinematic gradient */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-25 filter blur-sm scale-105"
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/60 to-background" />
        </div>

        {/* Ambient Gold Glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-20">
          {/* Telegram badge pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-2/90 border border-gold/30 text-xs text-text-primary backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-gold">NEW DROP LIVE</span>
            <span className="text-text-muted">•</span>
            <span className="text-text-secondary flex items-center gap-1">
              <Send className="w-3 h-3 text-[#229ED9]" />
              11,400+ on DB Telegram
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-text-primary uppercase leading-tight">
              PRIVATE VAULT <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                BY CREATOR DB
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary font-normal leading-relaxed">
              Unfiltered, cinematic 4K productions and exclusive private archives. Instant unlocking in under 60 seconds with 100% discreet billing.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold-light text-black font-extrabold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-xl shadow-gold/25 hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              Explore All Drops
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-4 bg-surface-2 hover:bg-surface-3 text-text-primary border border-border hover:border-gold/40 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-gold" />
              Join VIP Club ($29.99/mo)
            </Link>
          </div>

          {/* Value Props Row */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-border/40 text-left">
            <div className="p-3">
              <span className="block font-display font-black text-xl text-text-primary">4K UHD</span>
              <span className="text-xs text-text-muted">Mastered 60FPS</span>
            </div>
            <div className="p-3">
              <span className="block font-display font-black text-xl text-text-primary">&lt; 60s</span>
              <span className="text-xs text-text-muted">Instant Unlock</span>
            </div>
            <div className="p-3">
              <span className="block font-display font-black text-xl text-text-primary">100%</span>
              <span className="text-xs text-text-muted">Discreet Statement</span>
            </div>
            <div className="p-3">
              <span className="block font-display font-black text-xl text-text-primary">Card & Crypto</span>
              <span className="text-xs text-text-muted">USDT / BTC Accepted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drop Banner */}
      {featuredDrop && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-crimson" />
              <h2 className="font-display font-extrabold text-2xl text-text-primary tracking-tight uppercase">
                Spotlight Release
              </h2>
            </div>
            <span className="text-xs text-gold font-semibold uppercase tracking-wider">
              High Definition Master
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-1 border border-border rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
            <div className="lg:col-span-7 aspect-video rounded-2xl overflow-hidden relative group">
              <img
                src={featuredDrop.thumbnailUrl}
                alt={featuredDrop.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Link
                  href={`/video/${featuredDrop.slug}`}
                  className="w-16 h-16 rounded-full bg-gold/90 hover:bg-gold text-black flex items-center justify-center shadow-xl shadow-gold/30 hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 bg-crimson/15 border border-crimson/40 text-crimson-light text-xs font-bold uppercase rounded-full">
                Trending on Telegram
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary leading-tight">
                {featuredDrop.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {featuredDrop.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span>Duration: 18m 42s</span>
                <span>•</span>
                <span>Resolution: 4K UHD</span>
                <span>•</span>
                <span>{featuredDrop.viewCount.toLocaleString()} Views</span>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href={`/video/${featuredDrop.slug}`}
                  className="px-6 py-3.5 bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Unlock For ${(featuredDrop.priceCents / 100).toFixed(2)}
                </Link>
                <Link
                  href={`/video/${featuredDrop.slug}`}
                  className="px-5 py-3.5 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary text-xs font-semibold rounded-xl border border-border"
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
            <p className="text-xs sm:text-sm text-text-muted mt-1">
              Hover over cards to preview video teaser reels instantly.
            </p>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-semibold text-gold hover:text-gold-light flex items-center gap-1 transition-colors"
          >
            View All ({videos.length}) &rarr;
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4" />
                VIP Club Membership
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary tracking-tight leading-tight">
                Unlock Everything DB Drops <br />
                <span className="text-gold">For Just $29.99 / Month</span>
              </h2>

              <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                Skip buying videos one by one. VIP Members receive instant all-access streaming to every past and upcoming video, exclusive unscripted archive reels, private polls, and zero hidden fees.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>All 15+ 4K Vault Videos Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>Weekly Early-Access Drops</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>Private VIP Telegram Channel Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                  <span>Cancel anytime in 1 click</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-surface-1 border border-border rounded-2xl text-center space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold text-text-muted">Monthly All-Access</span>
                <div className="font-display font-black text-4xl text-gold">$29.99</div>
                <span className="text-xs text-text-muted">Renews monthly • Cancel anytime</span>
              </div>

              <Link
                href="/pricing"
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-gold/25 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Join VIP Club Now
              </Link>

              <span className="text-[11px] text-text-muted flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Discreet billing: &quot;VAULT DIGITAL&quot;
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary tracking-tight uppercase">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-text-muted">
            Discreet, instant, and secure digital delivery.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gold" />
              What will show on my credit card / bank statement?
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed pl-6">
              Your privacy is paramount. Billing is 100% discreet and shows neutrally as &quot;VAULT DIGITAL SVCS&quot; or a generic digital goods descriptor.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gold" />
              How do I watch after paying?
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed pl-6">
              Access is instantaneous. As soon as checkout completes, you are redirected straight to your private high-definition streaming player. We also email a permanent secure access link to the email you entered at checkout.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gold" />
              Can I pay with Crypto?
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed pl-6">
              Yes. We support USDT (TRC-20 & ERC-20) as well as Bitcoin for fans who prefer complete financial privacy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-1 border border-border space-y-2">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-gold" />
              How do I cancel my VIP Club subscription?
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed pl-6">
              You can cancel at any time with a single click inside your Member Billing tab. Access remains active until the end of your billing cycle with zero renewal charges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
