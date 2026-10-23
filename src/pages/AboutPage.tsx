import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Target,
  Users,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { siteSettings, navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>About Digital Logs</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Trustworthy Digital Subscriptions & Real Marketing Strategy
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Digital Logs is an authorized digital marketplace providing enterprise VPN vouchers, AI subscription workspace seats, and compliant social media growth solutions for modern creators and enterprises.
        </p>
      </div>

      {/* Origin & Philosophy */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Our Operational Standard
        </h2>
        <p>
          The digital marketplace has too often been cluttered with stolen accounts, temporary cracked keys, and artificial bot followers that put customer businesses at immediate risk of termination. Digital Logs was founded on a simple counter-principle: <strong className="text-white">legitimacy, transparency, and dependable support.</strong>
        </p>
        <p>
          Every subscription access voucher we distribute is an authorized commercial allocation, backed by official redemption procedures. When it comes to social media growth across Facebook, TikTok, and Instagram, we offer structured strategic services—audience targeting frameworks, creative hook scripting, and Business Suite campaign staging—rather than synthetic bot metrics that violate platform terms.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Zero Credential Access</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We never request your personal social media passwords, 2FA backup codes, or private bank credentials. All collaboration is executed externally and safely.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Payrep MFB Verified</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our bank transfers are settled directly via Payrep MFB (Account 2091223616), ensuring seamless Nigerian domestic settlement with rapid manual verification.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">Genuine Marketing ROI</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our social marketing packages emphasize authentic video retention, proper hashtag clustering, and audience segmentation that converts followers into paying customers.
          </p>
        </div>
      </div>

      {/* Official Business Details Callout */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Official Brand & Support Channels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400">WhatsApp Support Hotline:</span>
            <p className="text-sm font-bold text-emerald-400 font-mono-numbers">
              {siteSettings.whatsappNumber}
            </p>
            <p className="text-[11px] text-slate-500">Available for order queries and voucher activation.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400">Official Telegram Community:</span>
            <p className="text-sm font-bold text-cyan-400">
              {siteSettings.telegramHandle}
            </p>
            <p className="text-[11px] text-slate-500">Inventory updates and strategy releases.</p>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            <span>Explore Our Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
