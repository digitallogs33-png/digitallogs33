import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  Send,
  MessageCircle,
  PackageSearch,
  SlidersHorizontal
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    siteSettings,
    currency,
    setCurrency,
    cartCount,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    activePage,
    navigateTo,
    currentUser,
    isAdmin,
    setActiveCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('products');
    }
  };

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'All Services', page: 'products' },
    { label: 'About Us', page: 'about' },
    { label: 'Blog', page: 'blog' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top utility ticker */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 text-[11px] sm:text-xs text-slate-300 py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {/* Left: Support Channels */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 font-medium">
            <a
              href={siteSettings.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors py-1"
            >
              <Send className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Join Telegram Channel</span>
              <span className="sm:hidden">Telegram</span>
            </a>
            <span className="text-slate-700 hidden xs:inline">·</span>
            <a
              href={`https://wa.me/${siteSettings.whatsappFormatted}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors py-1"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden md:inline">WhatsApp: {siteSettings.whatsappNumber}</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
          </div>

          {/* Right: Currency switcher + Order Lookup */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            <button
              onClick={() => navigateTo('order-lookup')}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer py-1"
            >
              <PackageSearch className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] sm:text-xs">Track Order</span>
            </button>

            <span className="text-slate-700">|</span>

            {/* Currency selector buttons */}
            <div className="flex items-center bg-slate-800/90 rounded border border-slate-700/60 p-0.5">
              <button
                onClick={() => setCurrency('NGN')}
                className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer min-h-[24px] flex items-center ${
                  currency === 'NGN'
                    ? 'bg-cyan-500 text-slate-950 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Nigerian Naira"
              >
                ₦ NGN
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition-colors cursor-pointer min-h-[24px] flex items-center ${
                  currency === 'USD'
                    ? 'bg-cyan-500 text-slate-950 shadow-xs font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="US Dollar"
              >
                $ USD
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark & Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setActiveCategory(null);
              navigateTo('home');
            }}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Digital Logs
              </span>
              <p className="text-[9px] sm:text-[10px] text-slate-400 -mt-0.5 sm:-mt-1 hidden xs:block tracking-wide uppercase">
                Authorized Subscriptions & Services
              </p>
            </div>
          </button>
        </div>

        {/* Live Search bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search VPNs, Meta Ads, TikTok packages, AI tools..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-semibold tracking-wide text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                if (link.page === 'products') {
                  setActiveCategory(null);
                }
                navigateTo(link.page);
              }}
              className={`hover:text-cyan-400 transition-colors whitespace-nowrap cursor-pointer py-1 ${
                activePage === link.page
                  ? 'text-cyan-400 font-bold border-b border-cyan-400'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions (Cart + Account/Dashboard + Admin) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile search toggle */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account / Dashboard Button */}
          {currentUser ? (
            <button
              onClick={() => navigateTo('dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="max-w-[100px] truncate">{currentUser.name}</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Admin Access Link */}
          <button
            onClick={() => navigateTo('admin')}
            className={`hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              isAdmin
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors min-w-[42px] min-h-[42px] flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search bar dropdown */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-3.5 sm:px-6 pb-3 border-t border-slate-800/60 bg-slate-950 animate-in fade-in">
          <form onSubmit={handleSearchSubmit} className="relative pt-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, VPNs, marketing..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2.5 text-sm sm:text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 mt-1 pointer-events-none" />
          </form>
        </div>
      )}

      {/* Mobile drawer navigation with backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 top-[88px] sm:top-[96px] bg-slate-950/70 backdrop-blur-xs z-30 md:hidden"
            aria-hidden="true"
          />
          <div className="relative z-40 md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl max-h-[calc(100vh-90px)] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    if (link.page === 'products') setActiveCategory(null);
                    navigateTo(link.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors min-h-[44px] flex items-center cursor-pointer ${
                    activePage === link.page
                      ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-1.5">
              <button
                onClick={() => {
                  navigateTo('order-lookup');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3.5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-900 rounded-lg text-left min-h-[44px] cursor-pointer"
              >
                <PackageSearch className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Track Order Reference</span>
              </button>

              {currentUser ? (
                <button
                  onClick={() => {
                    navigateTo('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-3 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-850 rounded-lg text-left min-h-[44px] cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">Dashboard ({currentUser.name})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 px-3.5 py-3 text-sm font-medium text-slate-300 hover:bg-slate-900 rounded-lg text-left min-h-[44px] cursor-pointer"
                >
                  <UserIcon className="w-4 h-4 shrink-0" />
                  <span>Customer Login / Register</span>
                </button>
              )}

              <button
                onClick={() => {
                  navigateTo('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-3.5 py-3 text-sm font-semibold text-amber-300 hover:bg-slate-900 rounded-lg text-left min-h-[44px] cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
