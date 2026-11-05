'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-2xl py-3'
          : 'bg-background/50 backdrop-blur-md py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Focus: DB's Image */}
        <Link href="/" className="flex items-center group relative py-0.5" title="DB • Creator Vault">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold via-amber-300 to-gold rounded-full blur-xs opacity-60 group-hover:opacity-100 transition duration-300" />
            <img
              src="/media/db-owner-1.jpg"
              alt="DB"
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-background ring-2 ring-gold/80 group-hover:ring-gold shadow-lg shadow-gold/25 transition-all duration-300 group-hover:scale-105"
            />
            <span
              className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full shadow-sm"
              title="DB Online & Verified"
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/catalog"
            className="text-xs uppercase tracking-wider font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="/pricing"
            className="text-xs uppercase tracking-wider font-semibold text-text-secondary hover:text-gold transition-colors"
          >
            VIP Club
          </Link>
          <Link
            href="/about"
            className="text-xs uppercase tracking-wider font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            About DB
          </Link>
          <Link
            href="/admin"
            className="text-[11px] uppercase tracking-wider font-mono px-2.5 py-1 bg-surface-2 text-text-muted hover:text-gold border border-border rounded-md transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Telegram Link */}
          <a
            href="https://t.me/DBGOD1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-surface-2 hover:bg-surface-3 border border-border hover:border-gold/30 rounded-lg text-xs font-mono font-medium text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5"
            title="Join Telegram Channel"
          >
            <span className="font-bold text-[#229ED9]">TG</span>
            <span>@DBGOD1</span>
          </a>

          {/* X (Twitter) Link */}
          <a
            href="https://x.com/DBGODPLAYHOUSE"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-surface-2 hover:bg-surface-3 border border-border hover:border-gold/30 rounded-lg text-xs font-mono font-medium text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5"
            title="Follow on X"
          >
            <span className="font-bold text-white">X</span>
            <span>@DBGODPLAYHOUSE</span>
          </a>

          {/* Member Library */}
          <Link
            href="/library"
            className="px-3 py-1.5 text-xs uppercase tracking-wider font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            Library
          </Link>

          {/* Subscribe VIP Button */}
          <Link
            href="/pricing"
            className="px-4 py-2 bg-gradient-to-r from-gold via-gold-light to-gold text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md shadow-gold/20 hover:scale-105"
          >
            Join VIP
          </Link>
        </div>

        {/* Mobile Actions & Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/pricing"
            className="px-3 py-1.5 bg-gold text-black font-bold text-xs uppercase rounded-lg"
          >
            VIP
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="px-3 py-1.5 text-xs font-mono font-bold text-text-primary bg-surface-2 border border-border rounded-lg tracking-wider"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-dropdown border-b border-border px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {/* Creator Profile Row in Mobile Menu */}
          <div className="flex items-center gap-3 pb-3 border-b border-border/60">
            <div className="relative">
              <img
                src="/media/db-owner-1.jpg"
                alt="DB"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-gold/70 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm text-text-primary uppercase tracking-wide">DB</span>
              <span className="text-[10px] font-mono text-gold uppercase tracking-wider">OFFICIAL VAULT</span>
            </div>
          </div>

          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-wider text-text-primary py-2.5 border-b border-border/50"
          >
            Browse Catalog
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-wider text-gold py-2.5 border-b border-border/50"
          >
            VIP Club Membership ($29.99/mo)
          </Link>
          <Link
            href="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-wider text-text-primary py-2.5 border-b border-border/50"
          >
            My Purchases & Library
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold uppercase tracking-wider text-text-secondary py-2.5 border-b border-border/50"
          >
            About DB
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-mono text-text-muted py-2"
          >
            Admin Dashboard
          </Link>

          {/* Socials Grid in Mobile Drawer */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              href="https://t.me/DBGOD1"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#229ED9]/15 hover:bg-[#229ED9]/25 border border-[#229ED9]/40 rounded-xl text-xs font-mono font-semibold text-white flex items-center justify-center gap-1.5"
            >
              <span>TG: @DBGOD1</span>
            </a>
            <a
              href="https://x.com/DBGODPLAYHOUSE"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-surface-2 hover:bg-surface-3 border border-border rounded-xl text-xs font-mono font-semibold text-white flex items-center justify-center gap-1.5"
            >
              <span>X: @DBGODPLAYHOUSE</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
