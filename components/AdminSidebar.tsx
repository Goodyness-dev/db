'use client';

import React from 'react';
import Link from 'next/link';

interface AdminSidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ currentTab, onTabChange }: AdminSidebarProps) {
  const navItems = [
    { id: 'overview', num: '01', label: 'Overview & MRR' },
    { id: 'videos', num: '02', label: 'Video Catalog' },
    { id: 'orders', num: '03', label: 'Orders & Refunds' },
    { id: 'subscribers', num: '04', label: 'VIP Subscribers' },
    { id: 'compliance', num: '05', label: '2257 Compliance' },
    { id: 'settings', num: '06', label: 'Processor & Alerts' },
  ];

  return (
    <aside className="w-full md:w-64 bg-surface-1 border border-border rounded-3xl p-5 space-y-6 shrink-0 h-fit">
      {/* Admin header */}
      <div className="flex items-center gap-3 border-b border-border/80 pb-4">
        <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center font-display font-black text-lg">
          DB
        </div>
        <div>
          <h2 className="font-display font-bold text-sm text-text-primary tracking-wide">
            VAULT CONTROL
          </h2>
          <span className="text-[10px] text-text-muted uppercase tracking-wider font-mono">
            CREATOR ROOT
          </span>
        </div>
      </div>

      {/* Nav list */}
      <nav className="space-y-1.5">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                isActive
                  ? 'bg-gold text-black shadow-md shadow-gold/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`font-mono text-[10px] ${isActive ? 'text-black/70' : 'text-text-muted'}`}>
                  {item.num}
                </span>
                <span>{item.label}</span>
              </div>
              {isActive && <span className="font-mono text-[10px] font-bold">[ACTIVE]</span>}
            </button>
          );
        })}
      </nav>

      {/* Quick Creator Links */}
      <div className="pt-4 border-t border-border/80 space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted block font-mono">
          SHORTCUTS
        </span>
        <Link
          href="/"
          className="flex items-center justify-between text-xs text-text-secondary hover:text-gold transition-colors py-1 font-medium"
        >
          <span>Storefront Preview</span>
          <span className="text-[11px] font-mono text-text-muted">VIEW &rarr;</span>
        </Link>
        <Link
          href="/pricing"
          className="flex items-center justify-between text-xs text-text-secondary hover:text-gold transition-colors py-1 font-medium"
        >
          <span>VIP Offer Page</span>
          <span className="text-[11px] font-mono text-text-muted">VIEW &rarr;</span>
        </Link>
      </div>
    </aside>
  );
}
