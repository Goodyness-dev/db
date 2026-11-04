'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Send, User, Film, Crown, Menu, X } from 'lucide-react';

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
          ? 'bg-background/85 backdrop-blur-xl border-b border-border shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-surface-2 border border-border group-hover:border-gold/50 flex items-center justify-center transition-all duration-300">
            <span className="font-display font-black text-lg text-gold tracking-tighter">V</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base tracking-widest text-text-primary group-hover:text-gold transition-colors">
              VAULT
            </span>
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold -mt-1">
              BY DB
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/catalog"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <Film className="w-4 h-4 text-text-muted" />
            Catalog
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <Crown className="w-4 h-4 text-gold" />
            VIP Club
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            About DB
          </Link>
          <Link
            href="/admin"
            className="text-xs font-semibold px-2.5 py-1 bg-surface-2 text-text-muted hover:text-gold border border-border rounded-md transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Telegram Funnel Badge */}
          <a
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-surface-2 hover:bg-surface-3 border border-border hover:border-gold/30 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary transition-all flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5 text-[#229ED9]" />
            <span>Telegram</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-[#229ED9]/15 text-[#229ED9] rounded-full">
              11K+
            </span>
          </a>

          {/* Member Library */}
          <Link
            href="/library"
            className="px-3.5 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5"
          >
            <User className="w-4 h-4 text-text-muted" />
            Library
          </Link>

          {/* Subscribe VIP Button */}
          <Link
            href="/pricing"
            className="px-4 py-2 bg-gradient-to-r from-gold via-gold-light to-gold text-black font-semibold text-xs rounded-lg transition-all duration-300 shadow-md shadow-gold/20 hover:scale-105 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Join VIP
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/pricing"
            className="px-3 py-1.5 bg-gold text-black font-bold text-xs rounded-lg"
          >
            VIP
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-text-primary bg-surface-1 border border-border rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dropdown border-b border-border px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-text-primary py-2 border-b border-border/50"
          >
            Browse Catalog
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gold py-2 border-b border-border/50"
          >
            VIP Club Membership ($29.99/mo)
          </Link>
          <Link
            href="/library"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-text-primary py-2 border-b border-border/50"
          >
            My Purchases & Library
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-text-secondary py-2 border-b border-border/50"
          >
            About DB
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-text-muted py-2"
          >
            Admin Dashboard
          </Link>
          <div className="pt-2">
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-surface-2 border border-border rounded-xl text-sm font-medium text-text-primary flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#229ED9]" />
              Join DB's Telegram Channel (11k+ Members)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
