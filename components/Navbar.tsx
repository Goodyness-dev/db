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
        {/* Brand with DB's Photo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/media/db-owner-1.jpg"
            alt="Creator DB"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/40 group-hover:ring-gold transition-all shadow-md"
          />
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-widest text-text-primary group-hover:text-gold transition-colors">
              VAULT
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold -mt-0.5 font-mono">
              BY DB
            </span>
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
