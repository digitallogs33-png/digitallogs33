import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Send,
  MessageCircle,
  Building2,
  Mail,
  Lock,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, categories, navigateTo, setActiveCategory } = useApp();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Top Value Banner */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">100% Authorized & Compliant</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Official subscription vouchers and honest organic social media reach strategies. Zero account farming.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Secure Payrep MFB Settlement</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Verified Nigerian banking settlement with fast manual transfer verification and instant voucher dispatch.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-xs">Live WhatsApp & Telegram Desk</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Direct customer assistance via +880 1962-061283 and our official community Telegram channel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-400 flex items-center justify-center text-slate-950 font-bold">
                <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                Digital Logs
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Digital Logs is a dedicated digital services marketplace delivering authorized subscriptions,
              cybersecurity privacy suites, and legitimate social media marketing strategies.
              Inspired by high-performance digital commerce architecture.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp:</span>
                <a
                  href={`https://wa.me/${siteSettings.whatsappFormatted}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-cyan-400 transition-colors font-mono-numbers"
                >
                  {siteSettings.whatsappNumber}
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Send className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Telegram:</span>
                <a
                  href={siteSettings.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Official Channel</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Email:</span>
                <span className="text-slate-300">{siteSettings.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory(null);
                    navigateTo('products');
                  }}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  All Products & Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  About Digital Logs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('blog')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Articles & Insights
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('faq')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('order-lookup')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-cyan-400"
                >
                  Track Order Status
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Services
            </h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.name);
                      navigateTo('products');
                    }}
                    className="hover:text-cyan-400 transition-colors cursor-pointer text-left truncate max-w-full block"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Compliance, Payment & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Legal & Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('refund')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Refund & Guarantee Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('delivery')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Delivery & Subscription Terms
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer text-[11px]"
                >
                  Administrator Portal
                </button>
              </li>
            </ul>

            {/* Official Bank Account Summary Box */}
            <div className="mt-4 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] space-y-1">
              <span className="text-slate-300 font-semibold block">Official Settlement Bank:</span>
              <p className="text-slate-400">{siteSettings.bankName} - {siteSettings.bankAccountNumber}</p>
              <p className="text-[10px] text-slate-500 truncate">{siteSettings.bankAccountName}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Digital Logs. All rights reserved.</p>
          <p className="text-center sm:text-right text-[10px] text-slate-600">
            Digital Logs operates as an independent digital agency offering legitimate strategy, optimization, and authorized software license passes.
          </p>
        </div>
      </div>
    </footer>
  );
};
