import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductPackageOption } from '../types';
import {
  ShieldCheck,
  Zap,
  ShoppingCart,
  Clock,
  CheckCircle2,
  Building2,
  Copy,
  Check,
  ArrowLeft,
  Share2,
  Lock,
  AlertCircle,
  HelpCircle,
  MessageCircle,
  Send
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    formatPrice,
    addToCart,
    setQuickOrderProduct,
    navigateTo,
    siteSettings,
    showToast
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedPackage, setSelectedPackage] = useState<ProductPackageOption | null>(() => {
    return product?.packages && product.packages.length > 0 ? product.packages[0] : null;
  });

  const [copiedBank, setCopiedBank] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'terms' | 'support'>('details');

  if (!product) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>Product not found.</p>
        <button
          onClick={() => navigateTo('products')}
          className="mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const activePriceNGN = selectedPackage ? selectedPackage.priceNGN : product.priceNGN;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      packageId: selectedPackage?.id,
      packageName: selectedPackage?.name,
      priceNGN: activePriceNGN,
      quantity: 1,
      category: product.category
    });
  };

  const handleOrderNow = () => {
    setQuickOrderProduct(product);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(siteSettings.bankAccountNumber);
    setCopiedBank(true);
    showToast('Payrep MFB account number copied to clipboard', 'info');
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <button
          onClick={() => navigateTo('products')}
          className="inline-flex items-center gap-1 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Products</span>
        </button>
        <span>/</span>
        <span className="text-slate-500">{product.category}</span>
        <span>/</span>
        <span className="text-slate-200 font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main PDP 2-Column Contiguous Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Visual Showcase & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-cyan-300 border border-cyan-500/30">
              {product.category}
            </div>
            <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{product.inStock ? 'In Stock / Ready' : 'Backorder'}</span>
            </div>
          </div>

          {/* Quick Security & Trust Callouts below Image */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Zero Password Policy</span>
              </div>
              <p className="text-[11px] text-slate-400">
                We never request social media credentials or 2FA codes. All work is 100% compliant.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-200 font-bold mb-1">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Fast Voucher Dispatch</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct activation sent to WhatsApp or Email upon manual bank payment verification.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-2">
                <span>{product.licenseType}</span>
                <span className="text-slate-600">·</span>
                <span>{product.duration || 'Fast Digital Delivery'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {product.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Package Tier Selector (if applicable) */}
            {product.packages && product.packages.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-300">
                    Select Package Tier:
                  </span>
                  <span className="text-cyan-400 font-medium">
                    {product.packages.length} Options Available
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
                  {product.packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-xs'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-white">{pkg.name}</span>
                          <span className="text-xs font-bold text-cyan-400 font-mono-numbers">
                            {formatPrice(pkg.priceNGN)}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{pkg.description}</p>
                        {pkg.deliverables && (
                          <div className="mt-2 flex flex-wrap gap-1 text-[10px] text-slate-400">
                            {pkg.deliverables.map((d, i) => (
                              <span key={i} className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                                ✓ {d}
                              </span>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Investment</span>
                <div className="text-2xl font-extrabold text-white font-mono-numbers">
                  {formatPrice(activePriceNGN)}
                </div>
              </div>
              <div className="text-right text-xs text-slate-400">
                <span className="text-emerald-400 font-bold block">Manual Transfer (0% Fee)</span>
                <span className="text-[11px] text-slate-500">Payrep MFB Account: 2091223616</span>
              </div>
            </div>

            {/* CTAs: Order Now + Add to Cart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleOrderNow}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Instant Order Now</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all border border-slate-700 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>
            </div>

            {/* Bank Transfer Instructions Preview */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between font-semibold text-slate-300 pb-1 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  <span>Payrep MFB Transfer Details</span>
                </div>
                <button
                  onClick={handleCopyAccount}
                  className="text-cyan-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBank ? 'Copied' : 'Copy Acc'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Account: <strong className="text-white font-mono-numbers">{siteSettings.bankAccountNumber}</strong> · {siteSettings.bankAccountName}
              </p>
              <p className="text-[10px] text-slate-500">
                Payment Ref: <span className="font-mono-numbers">{siteSettings.paymentReferenceId}</span> (optional)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Full Description, Deliverables, Support & FAQs */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Service Description & Features
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Delivery & Requirements
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'support'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Support & Channels
          </button>
        </div>

        {/* Tab 1: Description & Features */}
        {activeTab === 'details' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Overview</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">Core Deliverables & Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Terms & Requirements */}
        {activeTab === 'terms' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Fulfillment Protocol
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Method: <strong className="text-cyan-400">{product.deliveryMethod}</strong>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                License Classification: <strong className="text-slate-100">{product.licenseType}</strong>
              </p>
              {product.requirementsNote && (
                <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                  <strong>Requirements Note:</strong> {product.requirementsNote}
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <h4 className="font-bold text-slate-200">Compliance & Account Safety Guarantee:</h4>
              <p>
                Digital Logs does NOT sell stolen credentials, cracked software, hacked accounts, or fake bot engagement.
                All VPN and AI vouchers are legitimate commercial allocations. All social media marketing packages
                are executed through authentic content creation, hashtag optimization, and Meta Ads manager staging.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Support */}
        {activeTab === 'support' && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="text-base font-bold text-white">Direct Assistance Desk</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Need assistance with voucher activation, configuration, or custom service requests?
              Our team is ready to assist you via WhatsApp and Telegram.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${siteSettings.whatsappFormatted}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {siteSettings.whatsappNumber}</span>
              </a>

              <a
                href={siteSettings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Telegram: {siteSettings.telegramHandle}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
