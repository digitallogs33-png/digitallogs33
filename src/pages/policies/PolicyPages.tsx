import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { navigateTo, siteSettings } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">1. Information We Collect</h2>
        <p>
          At Digital Logs, privacy is central to our core mission. We only collect the minimal personal data required to fulfill digital orders: customer name, email address, WhatsApp/phone number, and public page links for marketing strategy packages.
        </p>
        <p>
          <strong className="text-white">Zero Password Guarantee:</strong> Digital Logs will NEVER ask for, store, or process your personal social media passwords, 2FA codes, or confidential bank login PINs.
        </p>

        <h2 className="text-base font-bold text-white pt-2">2. How We Use Information</h2>
        <p>
          Your contact information is strictly utilized to:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
          <li>Deliver authorized digital subscription vouchers and license activation instructions.</li>
          <li>Verify manual bank transfers made to Payrep MFB.</li>
          <li>Provide customer support via WhatsApp ({siteSettings.whatsappNumber}) and Telegram.</li>
        </ul>

        <h2 className="text-base font-bold text-white pt-2">3. Third-Party Disclosures</h2>
        <p>
          We do not sell, rent, or trade your personal information to third-party data brokers or marketing lists.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-500 mt-1">Effective Date: October 2026</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By placing an order on Digital Logs, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any portion, please refrain from using our services.
        </p>

        <h2 className="text-base font-bold text-white pt-2">2. Authorized Distribution & Scope</h2>
        <p>
          Digital Logs provides authorized subscription access passes, cybersecurity license vouchers, and legitimate social media marketing strategies. We do not provide unauthorized account transfers, stolen credentials, or fraudulent engagement services.
        </p>

        <h2 className="text-base font-bold text-white pt-2">3. Platform Compliance</h2>
        <p>
          All marketing consultations, creative blueprints, and campaign staging adhere strictly to Meta, TikTok, and Instagram commercial policies. Clients are responsible for ensuring their advertised content conforms with local regulations and community guidelines.
        </p>
      </div>
    </div>
  );
};

export const RefundPolicyPage: React.FC = () => {
  const { navigateTo, siteSettings } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Refund & Guarantee Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Updated: October 2026</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">1. Activation Guarantee</h2>
        <p>
          We guarantee that every subscription voucher key or workspace team invite issued by Digital Logs will activate successfully. In the rare event an issued license voucher fails to activate upon initial redemption, our team will issue an immediate replacement within 6 hours.
        </p>

        <h2 className="text-base font-bold text-white pt-2">2. Eligibility for Full Refund</h2>
        <p>
          You are eligible for a 100% full refund to your originating bank account if:
        </p>
        <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
          <li>We are unable to fulfill your ordered digital voucher or marketing strategy within 24 hours of payment verification.</li>
          <li>A replacement voucher cannot resolve an activation failure.</li>
          <li>Duplicate payments were transferred in error to our Payrep MFB settlement account.</li>
        </ul>

        <h2 className="text-base font-bold text-white pt-2">3. How to Request a Refund</h2>
        <p>
          Send your Order ID and bank transfer session receipt to our official WhatsApp desk at <strong className="text-white font-mono-numbers">{siteSettings.whatsappNumber}</strong> or email {siteSettings.supportEmail}. Refunds are processed via Nigerian bank transfer within 24 to 48 business hours.
        </p>
      </div>
    </div>
  );
};

export const DeliveryPolicyPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
      <button
        onClick={() => navigateTo('home')}
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Delivery & Subscription Policy</h1>
        <p className="text-xs text-slate-500 mt-1">Updated: October 2026</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white">1. Electronic Delivery Only</h2>
        <p>
          All products on Digital Logs are digital goods. No physical items will be shipped to your postal address. Delivery takes place electronically via email and/or WhatsApp message to the contact numbers provided during checkout.
        </p>

        <h2 className="text-base font-bold text-white pt-2">2. Delivery Timeframes</h2>
        <ul className="list-disc list-inside space-y-1 text-slate-400 pl-2">
          <li><strong className="text-white">VPN Vouchers & Privacy Keys:</strong> Typically dispatched within 10 to 30 minutes following bank payment confirmation.</li>
          <li><strong className="text-white">AI Tools & Workspace Seats:</strong> Delivered via official email workspace invitation within 1 to 2 hours.</li>
          <li><strong className="text-white">Marketing Strategy Packages:</strong> Delivered as scheduled according to the chosen package tier (1 to 7 business days).</li>
        </ul>

        <h2 className="text-base font-bold text-white pt-2">3. Subscription Renewals</h2>
        <p>
          Subscriptions do not auto-renew with recurring credit card deductions. When your duration expires (e.g. 7 days or 30 days), you may simply place a new order on Digital Logs to extend your access.
        </p>
      </div>
    </div>
  );
};
