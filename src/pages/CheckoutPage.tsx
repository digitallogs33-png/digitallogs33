import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Copy,
  Check,
  ShieldCheck,
  MessageCircle,
  Send,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartTotalNGN,
    formatPrice,
    currency,
    siteSettings,
    createOrder,
    navigateTo,
    currentUser,
    showToast
  } = useApp();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [targetAccountUrl, setTargetAccountUrl] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'whatsapp_direct' | 'telegram_direct'>('bank_transfer');
  const [userConfirmedTransferNotice, setUserConfirmedTransferNotice] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add services to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('products')}
          className="px-6 py-2.5 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(siteSettings.bankAccountNumber);
    setCopiedBank(true);
    showToast('Payrep MFB account number copied to clipboard', 'info');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      showToast('Please fill out your name, email, and WhatsApp / phone number.', 'error');
      return;
    }

    if (paymentMethod === 'bank_transfer' && !userConfirmedTransferNotice) {
      showToast('Please acknowledge the Payrep MFB payment instructions checkbox.', 'error');
      return;
    }

    setIsSubmitting(true);

    const newOrder = createOrder({
      customerName,
      customerEmail,
      customerPhone,
      items: cart,
      totalNGN: cartTotalNGN,
      paymentMethod,
      targetAccountUrl: targetAccountUrl.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined
    });

    setIsSubmitting(false);

    // If WhatsApp Direct, open chat prefilled
    if (paymentMethod === 'whatsapp_direct') {
      const itemsSummary = cart.map((c) => `${c.productTitle} (x${c.quantity})`).join(', ');
      const text = encodeURIComponent(
        `Hello Digital Logs,\nI have placed an order:\n\nOrder Ref: ${newOrder.id}\nItems: ${itemsSummary}\nTotal: ${formatPrice(cartTotalNGN)}\nCustomer Name: ${customerName}\nPhone: ${customerPhone}\n\nPlease confirm payment and delivery instructions.`
      );
      window.open(`https://wa.me/${siteSettings.whatsappFormatted}?text=${text}`, '_blank');
    } else if (paymentMethod === 'telegram_direct') {
      window.open(siteSettings.telegramUrl, '_blank');
    }

    navigateTo('order-confirmation', { orderId: newOrder.id });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => navigateTo('cart')}
          className="inline-flex items-center gap-1 hover:text-cyan-400 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
        <span>/</span>
        <span className="text-white font-medium">Checkout & Payment</span>
      </div>

      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Review your items, provide delivery details, and follow the Payrep MFB settlement instructions.
        </p>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Form & Payment Method */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer Details */}
          {/* Section 1: Customer Details */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              01. Delivery & Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Divine Michael"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="For voucher credentials & receipt"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  WhatsApp / Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+234 or local phone format"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Target Account / Page URL (Optional)
                </label>
                <input
                  type="text"
                  value={targetAccountUrl}
                  onChange={(e) => setTargetAccountUrl(e.target.value)}
                  placeholder="For marketing services (No passwords)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Special Order Notes / Target Demographics
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Specific devices for VPN, target niches, preferred contact hours..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              02. Payment & Settlement Option
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3.5 sm:p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-xs'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Building2 className="w-5 h-5 text-cyan-400 mb-2" />
                <div className="text-xs font-bold text-white">Bank Transfer</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Payrep MFB (Nigeria)</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp_direct')}
                className={`p-3.5 sm:p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'whatsapp_direct'
                    ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-xs'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="text-xs font-bold text-white">WhatsApp Desk</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Instant live chat order</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('telegram_direct')}
                className={`p-3.5 sm:p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'telegram_direct'
                    ? 'bg-sky-500/15 border-sky-400 text-white shadow-xs'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Send className="w-5 h-5 text-sky-400 mb-2" />
                <div className="text-xs font-bold text-white">Telegram Channel</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Official channel order</div>
              </button>
            </div>

            {/* Official Payrep MFB Bank Box */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Settlement Bank:</span>
                <span className="font-bold text-white">{siteSettings.bankName}</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-slate-800 pb-2 gap-1">
                <span className="text-slate-400">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono-numbers font-bold text-cyan-300 text-sm">
                    {siteSettings.bankAccountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="p-1 text-slate-400 hover:text-cyan-300 cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                    title="Copy Account Number"
                  >
                    {copiedBank ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Account Name:</span>
                <span className="font-bold text-slate-200">{siteSettings.bankAccountName}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Payment Reference:</span>
                <span className="font-mono-numbers text-slate-300">{siteSettings.paymentReferenceId} (or your Order ID)</span>
              </div>
            </div>

            {/* Acknowledgment checkbox for bank transfer */}
            {paymentMethod === 'bank_transfer' && (
              <label className="flex items-start gap-2.5 pt-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  required
                  checked={userConfirmedTransferNotice}
                  onChange={(e) => setUserConfirmedTransferNotice(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <span>
                  I understand that I will transfer exactly <strong className="text-white font-mono-numbers">{formatPrice(cartTotalNGN)}</strong> to Payrep MFB ({siteSettings.bankAccountNumber}) and provide payment confirmation after generating my Order ID.
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order Button */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3">
              Items to be Ordered ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-white line-clamp-1">{item.productTitle}</h4>
                    <span className="text-[11px] text-slate-400">
                      Qty: {item.quantity} {item.packageName ? `· ${item.packageName}` : ''}
                    </span>
                  </div>
                  <span className="font-bold text-cyan-400 font-mono-numbers shrink-0">
                    {formatPrice(item.priceNGN * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-slate-400">
                <span>Subtotal ({currency})</span>
                <span className="font-mono-numbers text-white font-semibold">{formatPrice(cartTotalNGN)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Settlement Fee</span>
                <span className="text-emerald-400 font-semibold">₦ 0.00</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base font-bold text-white">
                <span>Amount Due</span>
                <span className="text-cyan-400 font-mono-numbers text-lg">{formatPrice(cartTotalNGN)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Processing Order...' : 'Place Order & View Payment Instructions'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Zero Risk Guarantee</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                If an authorized subscription voucher fails to activate, you receive an immediate replacement or full refund.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
