import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export const PaymentFooter: React.FC = () => {
  const { activePaymentMethods, paymentMethods, isAdmin, navigateTo } = useApp();
  const currentYear = new Date().getFullYear();
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  return (
    <>
      {/* Full-width Black Payment & Copyright Footer Section */}
      <section
        className="w-full bg-black border-t border-zinc-800 text-slate-400 py-6 sm:py-8 px-4 sm:px-6 relative select-none"
        aria-label="Payment methods and copyright notice"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          
          {/* Centered Dynamic Copyright Notice */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            <p className="text-xs sm:text-xs font-semibold tracking-wider text-slate-300 uppercase">
              &copy; {currentYear} DIGITAL LOGS. ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Sub-label for transparency & compliance */}
          <p className="mt-1 text-[11px] text-slate-500 max-w-xl">
            Authorized Digital Subscriptions, Encrypted Software Passes & Organic Reach Acceleration
          </p>

          {/* Horizontal Row of Active Payment-Method Logos beneath Copyright */}
          <div
            className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-3xl"
            role="list"
            aria-label="Accepted payment methods"
          >
            {activePaymentMethods.map((method) => (
              <div
                key={method.id}
                role="listitem"
                className="group relative h-8 sm:h-9 px-3 py-1 bg-white rounded-md shadow-sm border border-slate-200 flex items-center justify-center transition-all duration-200 hover:shadow-md hover:border-slate-300 hover:scale-102"
                title={`${method.displayName} (${method.currency || 'NGN'}) - ${method.description || 'Verified Payment Method'}`}
              >
                <img
                  src={method.logoPath}
                  alt={method.altText}
                  width={110}
                  height={24}
                  loading="lazy"
                  className="h-5 sm:h-5.5 w-auto object-contain max-w-[95px] sm:max-w-[115px]"
                />
              </div>
            ))}
          </div>

          {/* Settlement Status & Policy Transparency Row */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Settlement: Direct Payrep MFB Bank Transfer &amp; Naira Wallet</span>
            </span>

            <span className="hidden sm:inline text-slate-700">&bull;</span>

            <button
              onClick={() => setShowComplianceModal(true)}
              className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer inline-flex items-center gap-1 underline underline-offset-2 decoration-slate-700 hover:decoration-cyan-400"
            >
              <Info className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>Payment Policy &amp; Gateway Disclosure</span>
            </button>

            {isAdmin && (
              <>
                <span className="hidden sm:inline text-slate-700">&bull;</span>
                <button
                  onClick={() => navigateTo('admin')}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer text-[10px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60"
                >
                  Admin: Manage Payment Channels
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Payment Channels & Gateway Transparency Modal */}
      {showComplianceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowComplianceModal(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 sm:p-6 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Digital Logs Payment Integrity
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Transparent payment processing &amp; official settlement status
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowComplianceModal(false)}
                className="text-slate-400 hover:text-white p-1 text-xs cursor-pointer rounded-lg hover:bg-slate-800"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Currently Active Channels */}
            <div className="space-y-3 text-xs text-slate-300">
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Currently Active &amp; Supported Channels</span>
                </h4>
                <div className="space-y-2">
                  {paymentMethods
                    .filter((m) => m.isActive)
                    .map((method) => (
                      <div
                        key={method.id}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-7 px-2 bg-white rounded flex items-center justify-center shrink-0">
                            <img
                              src={method.logoPath}
                              alt={method.altText}
                              className="h-4 w-auto object-contain max-w-[80px]"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-white text-xs">{method.displayName}</p>
                            <p className="text-[10px] text-slate-400">{method.description}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded-full shrink-0">
                          Active
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Inactive / Gateway-Pending Channels */}
              <div className="pt-2">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Card Gateways (Pending Integration)</span>
                </h4>
                <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
                  Per strict consumer protection rules, card brands (Mastercard, Visa, Verve) are
                  not displayed in the public footer as accepted payment methods until a compliant,
                  automated 3D-Secure payment gateway is fully connected and audited.
                </p>
                <div className="space-y-1.5">
                  {paymentMethods
                    .filter((m) => !m.isActive)
                    .map((method) => (
                      <div
                        key={method.id}
                        className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-300">{method.displayName}</span>
                          <span className="text-[10px] text-slate-500">({method.currency})</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          Inactive (Requires Gateway)
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowComplianceModal(false);
                  navigateTo('add-funds');
                }}
                className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <span>View Bank Transfer Deposit Details</span>
                <ExternalLink className="w-3 h-3" />
              </button>

              <button
                onClick={() => setShowComplianceModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
