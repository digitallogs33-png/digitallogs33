import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, ProductPackageOption } from '../types';
import {
  X,
  Zap,
  Building2,
  Copy,
  Check,
  MessageCircle,
  Send,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

export const QuickOrderModal: React.FC = () => {
  const {
    quickOrderProduct,
    setQuickOrderProduct,
    formatPrice,
    currency,
    siteSettings,
    createOrder,
    navigateTo,
    currentUser,
    showToast
  } = useApp();

  const product = quickOrderProduct;

  const [selectedPackage, setSelectedPackage] = useState<ProductPackageOption | null>(() => {
    return product?.packages && product.packages.length > 0 ? product.packages[0] : null;
  });

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [targetAccountUrl, setTargetAccountUrl] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'whatsapp_direct' | 'telegram_direct'>('bank_transfer');
  const [copiedBank, setCopiedBank] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return null;

  // Active price
  const activePriceNGN = selectedPackage ? selectedPackage.priceNGN : product.priceNGN;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(siteSettings.bankAccountNumber);
    setCopiedBank(true);
    showToast('Payrep MFB account number copied to clipboard', 'info');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      showToast('Please provide your name, email, and phone / WhatsApp number', 'error');
      return;
    }

    setIsSubmitting(true);

    const orderItem = {
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      packageId: selectedPackage?.id,
      packageName: selectedPackage?.name,
      priceNGN: activePriceNGN,
      quantity: 1,
      category: product.category
    };

    const newOrder = createOrder({
      customerName,
      customerEmail,
      customerPhone,
      items: [orderItem],
      totalNGN: activePriceNGN,
      paymentMethod,
      targetAccountUrl: targetAccountUrl.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined
    });

    setIsSubmitting(false);
    setQuickOrderProduct(null);

    // If WhatsApp direct was selected, open WhatsApp with prefilled message
    if (paymentMethod === 'whatsapp_direct') {
      const pkgInfo = selectedPackage ? ` - ${selectedPackage.name}` : '';
      const text = encodeURIComponent(
        `Hello Digital Logs,\nI would like to place an order:\n\nOrder Ref: ${newOrder.id}\nItem: ${product.title}${pkgInfo}\nPrice: ${formatPrice(activePriceNGN)}\nCustomer Name: ${customerName}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\n\nPlease provide payment and activation instructions.`
      );
      window.open(`https://wa.me/${siteSettings.whatsappFormatted}?text=${text}`, '_blank');
    } else if (paymentMethod === 'telegram_direct') {
      window.open(siteSettings.telegramUrl, '_blank');
    }

    // Navigate to order confirmation
    navigateTo('order-confirmation', { orderId: newOrder.id });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-8 my-auto text-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => setQuickOrderProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-800 pr-10 sm:pr-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4 fill-cyan-400 shrink-0" />
            <span>Instant Order Request</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {product.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {product.shortDescription}
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="space-y-6">
          {/* Package Tier Selection (if product has tiers) */}
          {product.packages && product.packages.length > 0 && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Select Package Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1 rounded-lg border border-slate-800/80 bg-slate-950/40">
                {product.packages.map((pkg) => {
                  const isSelected = selectedPackage?.id === pkg.id;
                  return (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-xs'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-white truncate">
                          {pkg.name}
                        </span>
                        <span className="text-xs font-bold text-cyan-400 font-mono-numbers shrink-0">
                          {formatPrice(pkg.priceNGN)}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {pkg.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pricing Summary Box */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Total Due ({currency})</span>
              <div className="text-xl font-extrabold text-cyan-400 font-mono-numbers">
                {formatPrice(activePriceNGN)}
              </div>
              <span className="text-[11px] text-slate-500">
                Delivery: {product.duration || 'Fast Digital Dispatch'}
              </span>
            </div>
            <div className="text-right text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                Authorized & Guaranteed
              </span>
              <p className="text-[10px] text-slate-500 mt-0.5">Payrep MFB Verified</p>
            </div>
          </div>

          {/* Customer Input Fields */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Customer & Delivery Details
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
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
                  placeholder="For voucher dispatch & invoice"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
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
                  placeholder="+234 or international format"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Social Page Link or Target Handle (Optional)
                </label>
                <input
                  type="text"
                  value={targetAccountUrl}
                  onChange={(e) => setTargetAccountUrl(e.target.value)}
                  placeholder="e.g. facebook.com/yourpage"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Special Delivery Notes / Requirements
              </label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Specific goals, target countries, preferred VPN device platform, etc."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 sm:py-2 text-sm sm:text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Select Payment / Order Route
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-cyan-500/10 border-cyan-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4 text-cyan-400 mb-1.5" />
                <div className="text-xs font-bold text-white">Manual Bank Transfer</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Payrep MFB (Nigeria)</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('whatsapp_direct')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'whatsapp_direct'
                    ? 'bg-emerald-500/10 border-emerald-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">WhatsApp Order</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Direct agent chat & pay</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('telegram_direct')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'telegram_direct'
                    ? 'bg-sky-500/10 border-sky-400 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Send className="w-4 h-4 text-sky-400 mb-1.5" />
                <div className="text-xs font-bold text-white">Telegram Channel</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Official desk order</div>
              </button>
            </div>
          </div>

          {/* Bank Transfer Instructions Preview if bank_transfer selected */}
          {paymentMethod === 'bank_transfer' && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Bank Name:</span>
                <span className="font-bold text-white">{siteSettings.bankName}</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center justify-between border-b border-slate-800/80 pb-2 gap-1">
                <span className="text-slate-400">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono-numbers font-bold text-cyan-300 text-sm">
                    {siteSettings.bankAccountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="p-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer min-w-[28px] min-h-[28px] flex items-center justify-center"
                    title="Copy Account Number"
                  >
                    {copiedBank ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Account Name:</span>
                <span className="font-semibold text-slate-200">{siteSettings.bankAccountName}</span>
              </div>
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>Reference Note:</span>
                <span className="font-mono-numbers text-slate-300">{siteSettings.paymentReferenceId} (or your Order ID)</span>
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setQuickOrderProduct(null)}
              className="px-4 py-2.5 min-h-[44px] sm:min-h-0 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 fill-slate-950 shrink-0" />
              <span>{isSubmitting ? 'Generating Order...' : 'Complete & Receive Order ID'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
