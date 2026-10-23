import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageCircle,
  Send,
  Building2,
  Mail,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { siteSettings, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Message sent! Our support team will respond shortly.', 'success');
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(siteSettings.bankAccountNumber);
    setCopiedBank(true);
    showToast('Payrep MFB account number copied to clipboard', 'info');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Contact Digital Logs</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Need quick voucher support, bulk pricing, or manual payment confirmation? Reach out through our official channels.
        </p>
      </div>

      {/* Prominent Direct Channels Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* WhatsApp Card */}
        <a
          href={`https://wa.me/${siteSettings.whatsappFormatted}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-400 transition-all group flex items-start gap-4"
        >
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
              Instant Support Desk
            </span>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              WhatsApp Messenger
            </h3>
            <p className="text-xs text-emerald-300 font-mono-numbers">
              {siteSettings.whatsappNumber}
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Click to initiate a direct chat with our fulfillment agent.
            </p>
          </div>
        </a>

        {/* Telegram Card */}
        <a
          href={siteSettings.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 hover:border-cyan-400 transition-all group flex items-start gap-4"
        >
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
              Official Community
            </span>
            <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
              Telegram Channel
            </h3>
            <p className="text-xs text-cyan-300">
              {siteSettings.telegramHandle}
            </p>
            <p className="text-[11px] text-slate-400 pt-1">
              Join for inventory drops, discount vouchers, and announcements.
            </p>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-white">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Thank You, {name}!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Your inquiry regarding "{subject}" has been received. Our team will contact you via email ({email}) or WhatsApp shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Your Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Divine Michael"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 or local phone"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="VPN Subscription Activation">VPN Subscription Activation</option>
                    <option value="Social Media Marketing Quote">Social Media Marketing Quote</option>
                    <option value="Payrep MFB Bank Transfer Proof">Payrep MFB Bank Transfer Proof</option>
                    <option value="Custom Enterprise Volume">Custom Enterprise Volume</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Message / Details <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide order details, preferred activation method, or specific questions..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
                >
                  Send Inquiry Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Settlement & Hours info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Official Bank Account Information */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-2">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>Official Settlement Bank</span>
            </div>

            <div className="space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Bank:</span>
                <span className="font-semibold text-white">{siteSettings.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Account No:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono-numbers font-bold text-cyan-300">{siteSettings.bankAccountNumber}</span>
                  <button
                    onClick={handleCopyAccount}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                    title="Copy Account Number"
                  >
                    {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Account Name:</span>
                <span className="font-semibold text-slate-200">{siteSettings.bankAccountName}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                <span>Ref / Narration:</span>
                <span className="font-mono-numbers">{siteSettings.paymentReferenceId}</span>
              </div>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Support Desk Hours</span>
            </div>
            <div className="space-y-1.5 text-slate-400">
              <p><strong className="text-white">Monday – Saturday:</strong> 08:00 AM – 11:00 PM (WAT)</p>
              <p><strong className="text-white">Sunday:</strong> 10:00 AM – 08:00 PM (WAT)</p>
              <p className="text-[11px] text-cyan-400 pt-1">
                WhatsApp automated ticketing is active 24/7.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
