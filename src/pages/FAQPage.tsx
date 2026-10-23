import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Send,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { faqs, siteSettings } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Ordering', 'Payment', 'Subscriptions', 'Marketing Services'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto mb-2">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Clear answers about ordering, manual Payrep MFB bank settlements, digital voucher delivery, and our strict anti-fake engagement standards.
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. payment, transfer, VPN, refund)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Categories Segmented Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-slate-800/80 max-w-fit mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No questions matched your search. Contact our WhatsApp support desk for immediate answers!
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Still Have Questions Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-white">Still have questions?</h3>
          <p className="text-xs text-slate-400">
            Our support desk is online to assist with payment verification and voucher setup.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`https://wa.me/${siteSettings.whatsappFormatted}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={siteSettings.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            <Send className="w-4 h-4 text-cyan-400" />
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
};
