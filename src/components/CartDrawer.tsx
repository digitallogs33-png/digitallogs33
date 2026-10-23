import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotalNGN,
    formatPrice,
    navigateTo
  } = useApp();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-3 sm:pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-100 animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-3.5 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-600 mb-3 stroke-1" />
                <h3 className="text-sm font-semibold text-slate-200 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mb-6 max-w-xs">
                  Explore our authorized VPN passes, AI subscriptions, and social marketing packages.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('products');
                  }}
                  className="px-5 py-2.5 min-h-[42px] text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors cursor-pointer"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={`${item.productId}-${item.packageId || 'def'}-${idx}`}
                  className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-start gap-3"
                >
                  <img
                    src={item.productImage}
                    alt={item.productTitle}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover bg-slate-800 shrink-0 border border-slate-800"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.productTitle}
                    </h4>
                    {item.packageName && (
                      <p className="text-[11px] text-cyan-400 font-medium">
                        Tier: {item.packageName}
                      </p>
                    )}
                    <div className="text-xs font-bold text-white font-mono-numbers mt-1">
                      {formatPrice(item.priceNGN)}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-800 rounded bg-slate-900">
                        <button
                          onClick={() => updateQuantity(idx, item.quantity - 1)}
                          className="p-1.5 sm:p-1 text-slate-400 hover:text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-mono-numbers font-semibold text-slate-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, item.quantity + 1)}
                          className="p-1.5 sm:p-1 text-slate-400 hover:text-white transition-colors cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors ml-auto cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/80 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono-numbers font-semibold text-white">
                    {formatPrice(cartTotalNGN)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Payment Gateway / Delivery</span>
                  <span className="text-emerald-400">Manual Transfer (0% Fee)</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-slate-800 text-white">
                  <span>Total Amount</span>
                  <span className="text-cyan-400 font-mono-numbers text-base">
                    {formatPrice(cartTotalNGN)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Payrep MFB verification & fast delivery via Email/WhatsApp</span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full min-h-[46px] flex items-center justify-center gap-2 py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer py-1"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
