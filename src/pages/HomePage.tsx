import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CategorySidebar } from '../components/CategorySidebar';
import { AnimatedSocialHero } from '../components/AnimatedSocialHero';
import {
  ShieldCheck,
  Zap,
  ArrowRight,
  Search,
  MessageCircle,
  Send,
  Building2,
  Lock,
  Flame,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    categories,
    siteSettings,
    formatPrice,
    searchQuery,
    setSearchQuery,
    navigateTo,
    setActiveCategory,
    blogs,
    faqs
  } = useApp();

  const [localSearch, setLocalSearch] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      navigateTo('products');
    }
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 6);
  const vpnProducts = products.filter((p) => p.category === 'VPN Subscriptions').slice(0, 3);
  const socialProducts = products.filter((p) => p.category.includes('Marketing')).slice(0, 3);

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 sm:px-3 py-1 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Official Subscriptions & Legitimate Marketing Agency</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Authorized Digital Services, VPN Passes & Social Marketing
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed max-w-xl">
              Power your workflow with verified software licenses, encrypted privacy suites,
              and genuine, terms-compliant social media reach acceleration. Settle seamlessly in Naira via Payrep MFB.
            </p>

            {/* Quick Hero Search Input */}
            <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center max-w-lg gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Search ExpressVPN, Meta Ads, TikTok hooks..."
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-10 pr-4 py-3 text-sm sm:text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <button
                type="submit"
                className="px-5 py-3 min-h-[44px] bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer whitespace-nowrap flex items-center justify-center"
              >
                Find Service
              </button>
            </form>

            {/* Trust Markers Bar */}
            <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fast Bank Verification</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Fake Accounts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Guaranteed Activation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Social Media Hero Illustration */}
          <div className="lg:col-span-5 relative w-full">
            <AnimatedSocialHero
              onExploreServices={() => {
                setActiveCategory('Facebook Marketing');
                navigateTo('products');
              }}
            />
          </div>
        </div>
      </section>

      {/* Mobile Horizontal Category Quick Strip (< 1024px) */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Browse Categories
          </span>
          <button
            onClick={() => {
              setActiveCategory(null);
              navigateTo('products');
            }}
            className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
          >
            <span>All ({products.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => {
              setActiveCategory(null);
              navigateTo('products');
            }}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 whitespace-nowrap shrink-0 hover:border-cyan-500/50 hover:text-white transition-colors"
          >
            All Services
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.name);
                navigateTo('products');
              }}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 whitespace-nowrap shrink-0 hover:border-cyan-500/50 hover:text-white transition-colors"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Marketplace Area with Left Sidebar + Product Grid (accsplacelogs structure) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Category Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <CategorySidebar />

          {/* WhatsApp Direct Help Box */}
          <div className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-slate-300 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Desk</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Have questions or need a custom volume quote? Reach our specialist anytime.
            </p>
            <a
              href={`https://wa.me/${siteSettings.whatsappFormatted}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors text-xs"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Product Grid Area */}
        <div className="lg:col-span-9 space-y-8">
          {/* Featured Services Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Featured Digital Services & Logs
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Hand-picked authorized passes and top-performing marketing service tiers
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory(null);
                navigateTo('products');
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>View All ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* VPN & Cybersecurity Spotlight Section */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-bold text-white">
                  Authorized VPN Subscriptions & Privacy Suites
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveCategory('VPN Subscriptions');
                  navigateTo('products');
                }}
                className="text-xs text-cyan-400 hover:underline cursor-pointer"
              >
                See all VPNs
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {vpnProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Social Media Marketing Spotlight */}
          <div className="pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Social Media Strategy & Marketing Packages
                </h3>
              </div>
              <button
                onClick={() => {
                  setActiveCategory('Facebook Marketing');
                  navigateTo('products');
                }}
                className="text-xs text-cyan-400 hover:underline cursor-pointer"
              >
                See all Marketing
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="p-5 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 sm:space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How Ordering Works at Digital Logs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A frictionless, high-trust process designed for rapid digital fulfillment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-mono-numbers font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40 inline-block">
              01
            </span>
            <h4 className="text-sm font-bold text-white">Select Service Tier</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Choose your VPN license, marketing package, or AI tool seat with transparent pricing in NGN or USD.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-mono-numbers font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40 inline-block">
              02
            </span>
            <h4 className="text-sm font-bold text-white">Submit Details</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provide your delivery WhatsApp number or email address. We never ask for sensitive passwords.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-mono-numbers font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40 inline-block">
              03
            </span>
            <h4 className="text-sm font-bold text-white">Transfer to Payrep MFB</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Send payment to our verified bank account (2091223616) and paste your transaction reference.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 sm:space-y-3">
            <span className="text-xs font-mono-numbers font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/40 inline-block">
              04
            </span>
            <h4 className="text-sm font-bold text-white">Instant Fulfillment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our team verifies payment and delivers your activation credentials or strategic deliverables rapidly.
            </p>
          </div>
        </div>
      </section>

      {/* Community Channels Banner */}
      <section className="p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-base sm:text-xl font-bold text-white">
            Join Our Telegram Community & WhatsApp Hotline
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Get daily updates on fresh authorized subscription inventory, promotional vouchers, and social media growth case studies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <a
            href={siteSettings.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>Join Telegram</span>
          </a>
          <a
            href={`https://wa.me/${siteSettings.whatsappFormatted}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Message WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Recent Blog Posts Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white">Latest Knowledge & Guides</h2>
            <p className="text-xs text-slate-400">Tactical insights on digital privacy and organic reach</p>
          </div>
          <button
            onClick={() => navigateTo('blog')}
            className="text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Read All Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              onClick={() => navigateTo('blog-detail', { blogId: blog.id })}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="text-[11px] text-cyan-400 font-medium mb-1.5">
                  {blog.category} · {blog.readTime}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between mt-4">
                <span>By {blog.author}</span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
