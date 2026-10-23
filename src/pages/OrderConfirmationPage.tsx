import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  Building2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileText
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const {
    currentOrder,
    siteSettings,
    formatPrice,
    submitPaymentProof,
    navigateTo,
    showToast
  } = useApp();

  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedOrderId, setCopiedOrderId] = useState(false);
  const [transferRef, setTransferRef] = useState('');
  const [senderBank, setSenderBank] = useState('');
  const [proofNotes, setProofNotes] = useState('');
  const [proofSubmitted, setProofSubmitted] = useState(false);

  const order = currentOrder;

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No active order selected</h2>
        <p className="text-xs text-slate-400">
          Track an existing order or return to our digital catalog.
        </p>
        <button
          onClick={() => navigateTo('order-lookup')}
          className="px-6 py-2.5 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
        >
          Track Order by Reference
        </button>
      </div>
    );
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(siteSettings.bankAccountNumber);
    setCopiedAccount(true);
    showToast('Payrep MFB account number copied to clipboard', 'info');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopiedOrderId(true);
    showToast('Order Reference ID copied to clipboard', 'info');
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferRef.trim()) {
      showToast('Please provide your bank transfer session ID or reference.', 'error');
      return;
    }

    const note = `Bank: ${senderBank || 'Not specified'} | Ref: ${transferRef} | Note: ${proofNotes}`;
    const success = submitPaymentProof(order.id, transferRef, note);
    if (success) {
      setProofSubmitted(true);
    }
  };

  // WhatsApp prefilled message
  const whatsappText = encodeURIComponent(
    `Hello Digital Logs Support,\nI have made a transfer for my order:\n\nOrder Ref: ${order.id}\nAmount: ${formatPrice(order.totalNGN)}\nCustomer Name: ${order.customerName}\nPhone: ${order.customerPhone}\n\nPlease verify and dispatch my credentials.`
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Banner: Order Placed Success */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Order Request Received!
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Your order reference is <strong className="text-cyan-400 font-mono-numbers text-base">{order.id}</strong>.
          Please complete your transfer to Payrep MFB to trigger instant verification and dispatch.
        </p>

        <div className="pt-2 flex items-center justify-center gap-2">
          <button
            onClick={handleCopyOrderId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono-numbers text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>Copy Order ID: {order.id}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Official Bank Payment Instructions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Building2 className="w-5 h-5 text-cyan-400" />
                <span>Payrep MFB Payment Instructions</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                Awaiting Payment
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Total Amount to Transfer:</span>
                <span className="text-lg font-bold text-cyan-400 font-mono-numbers">
                  {formatPrice(order.totalNGN)}
                </span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Bank Name:</span>
                  <strong className="text-white font-semibold">{siteSettings.bankName}</strong>
                </div>

                <div className="flex flex-col xs:flex-row xs:items-center justify-between border-t border-slate-800/80 pt-2 gap-1">
                  <span className="text-slate-400">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white font-mono-numbers tracking-wider">
                      {siteSettings.bankAccountNumber}
                    </span>
                    <button
                      onClick={handleCopyAccount}
                      className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                      title="Copy Account Number"
                    >
                      {copiedAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-slate-400">
                  <span>Account Name:</span>
                  <strong className="text-slate-200">{siteSettings.bankAccountName}</strong>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px] text-slate-400">
                  <span>Payment Narration / Reference:</span>
                  <span className="font-mono-numbers text-cyan-300 font-bold">{order.id} (or {siteSettings.paymentReferenceId})</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px] space-y-1">
                <strong>Important Notice:</strong>
                <p>
                  Please include your Order ID <strong className="font-mono-numbers text-white">{order.id}</strong> in your transfer remark so our automated reconciliation system matches your payment immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Proof Submission Form */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-3">
              <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Submit Payment Proof / Transaction Reference</span>
            </div>

            {proofSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Payment Confirmation Received</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Your reference has been attached to order {order.id}. Our team is verifying your payment with our Payrep MFB portal and will dispatch your voucher shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleProofSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Bank Transfer Session ID / Transaction Reference <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={transferRef}
                    onChange={(e) => setTransferRef(e.target.value)}
                    placeholder="e.g. 000013261023789456 or reference code"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Sender Bank (Optional)
                    </label>
                    <input
                      type="text"
                      value={senderBank}
                      onChange={(e) => setSenderBank(e.target.value)}
                      placeholder="e.g. GTBank, Kuda, Zenith"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Sender Name / Account (Optional)
                    </label>
                    <input
                      type="text"
                      value={proofNotes}
                      onChange={(e) => setProofNotes(e.target.value)}
                      placeholder="Name on debit account"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 min-h-[44px] bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer border border-slate-700 mt-2 flex items-center justify-center"
                >
                  Submit Payment Details
                </button>
              </form>
            )}

            {/* Direct WhatsApp Fast Track */}
            <div className="pt-3 border-t border-slate-800">
              <p className="text-[11px] text-slate-400 mb-2">
                Prefer to send a screenshot directly? Click below to open WhatsApp with your Order ID prefilled:
              </p>
              <a
                href={`https://wa.me/${siteSettings.whatsappFormatted}?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Payment via WhatsApp ({siteSettings.whatsappNumber})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Receipt */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3">
              Order Receipt ({order.id})
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-white line-clamp-1">{item.productTitle}</h4>
                    <span className="text-[11px] text-slate-400">
                      {item.packageName ? `Tier: ${item.packageName} · ` : ''}Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-slate-200 font-mono-numbers shrink-0">
                    {formatPrice(item.priceNGN * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Customer:</span>
                <span className="text-white font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Contact Phone:</span>
                <span className="text-white font-medium">{order.customerPhone}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Voucher Email:</span>
                <span className="text-white font-medium">{order.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Status:</span>
                <span className="text-amber-400 uppercase font-bold text-[10px] bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base font-bold text-white">
                <span>Total Due:</span>
                <span className="text-cyan-400 font-mono-numbers text-lg">
                  {formatPrice(order.totalNGN)}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('order-lookup')}
                className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Track Live Order Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
