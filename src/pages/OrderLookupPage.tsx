import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PackageSearch,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const OrderLookupPage: React.FC = () => {
  const { orders, siteSettings, formatPrice, submitPaymentProof, navigateTo, showToast } = useApp();

  const [inputOrderId, setInputOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Proof submission inside lookup
  const [proofRef, setProofRef] = useState('');
  const [proofNotes, setProofNotes] = useState('');
  const [proofSent, setProofSent] = useState(false);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) {
      showToast('Please enter an order ID to search', 'error');
      return;
    }

    const cleanId = inputOrderId.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === cleanId);
    setSearchedOrder(found || null);
    setHasSearched(true);
    setProofSent(false);

    if (!found) {
      showToast(`No order found matching "${cleanId}"`, 'error');
    }
  };

  const handleUpdateProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchedOrder || !proofRef.trim()) return;

    const ok = submitPaymentProof(searchedOrder.id, proofRef, proofNotes);
    if (ok) {
      setProofSent(true);
      // update local view
      const updated = orders.find((o) => o.id === searchedOrder.id);
      if (updated) setSearchedOrder(updated);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered & Activated</span>
          </span>
        );
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Payment Verified (Processing)</span>
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review (Verifying Bank Transfer)</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Payment Rejected / Invalid Ref</span>
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refunded</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting Payment</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto mb-2">
          <PackageSearch className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Track Order Status
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Enter your Digital Logs Order Reference (e.g. DL-84920) to check real-time verification and fulfillment progress.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-lg mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            placeholder="Enter Order Reference (e.g. DL-84920)"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm sm:text-xs text-white placeholder:text-slate-500 uppercase tracking-wider font-mono-numbers focus:outline-none focus:border-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 min-h-[44px] bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer whitespace-nowrap flex items-center justify-center"
        >
          Check Status
        </button>
      </form>

      {/* Search Result View */}
      {hasSearched && (
        <div>
          {searchedOrder ? (
            <div className="p-4 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 sm:space-y-6 animate-in fade-in">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                    Order Reference
                  </span>
                  <h2 className="text-xl font-mono-numbers font-extrabold text-white">
                    {searchedOrder.id}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Created: {new Date(searchedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>{getStatusBadge(searchedOrder.status)}</div>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Ordered Services & Subscriptions
                </h3>
                <div className="space-y-2">
                  {searchedOrder.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <h4 className="font-bold text-white">{item.productTitle}</h4>
                        <span className="text-[11px] text-slate-400">
                          {item.packageName ? `Package: ${item.packageName} · ` : ''}Quantity: {item.quantity}
                        </span>
                      </div>
                      <span className="font-bold text-cyan-400 font-mono-numbers">
                        {formatPrice(item.priceNGN * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status details & Admin notes */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <h4 className="font-bold text-slate-200">Fulfillment & Verification Update:</h4>
                <p className="text-slate-300">
                  {searchedOrder.adminNotes || 'Order received. Awaiting bank transfer confirmation.'}
                </p>
                {searchedOrder.paymentReference && (
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                    Payment Reference on file: <strong className="text-slate-200 font-mono-numbers">{searchedOrder.paymentReference}</strong>
                  </p>
                )}
              </div>

              {/* Submit / Update Proof if pending */}
              {searchedOrder.status === 'pending' && (
                <div className="p-5 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                    <span>Have you completed your Payrep MFB transfer?</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Submit your bank transaction reference ID or sender name to notify our verification desk immediately:
                  </p>

                  {proofSent ? (
                    <div className="text-xs text-emerald-300 font-medium bg-emerald-950/60 p-2.5 rounded border border-emerald-800/40">
                      Payment reference updated! Status changed to Under Review.
                    </div>
                  ) : (
                    <form onSubmit={handleUpdateProof} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        required
                        value={proofRef}
                        onChange={(e) => setProofRef(e.target.value)}
                        placeholder="Transaction session ID / Ref"
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-cyan-300 cursor-pointer"
                      >
                        Submit Reference
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Contact Support regarding this order */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  Questions regarding order {searchedOrder.id}?
                </span>
                <a
                  href={`https://wa.me/${siteSettings.whatsappFormatted}?text=${encodeURIComponent(
                    `Hello Digital Logs, I am inquiring about Order ${searchedOrder.id} (${searchedOrder.customerName}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-white">Order Reference Not Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No active record was found for "{inputOrderId}". Please check your order confirmation email or contact our WhatsApp support desk.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${siteSettings.whatsappFormatted}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contact WhatsApp Support</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
