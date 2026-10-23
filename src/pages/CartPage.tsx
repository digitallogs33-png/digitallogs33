import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Building2,
  ArrowLeft
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalNGN,
    formatPrice,
    navigateTo
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8 stroke-1" />
        </div>
        <h1 className="text-2xl font-bold text-white">Your Shopping Cart is Empty</h1>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore our authorized VPN passes, AI subscriptions, and social media marketing packages to add items to your cart.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('products')}
            className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Browse Digital Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigateTo('products')}
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-400 mb-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">Shopping Cart</h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.productId}-${item.packageId || 'def'}-${idx}`}
              className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-950 border border-slate-800 shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate max-w-sm sm:max-w-md">
                    {item.productTitle}
                  </h3>
                  {item.packageName && (
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tier: <strong className="text-slate-200">{item.packageName}</strong>
                    </p>
                  )}
                  <div className="text-sm font-bold text-white font-mono-numbers mt-1 sm:hidden">
                    {formatPrice(item.priceNGN)}
                  </div>
                </div>
              </div>

              {/* Quantity and Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                <div className="flex items-center border border-slate-800 rounded-lg bg-slate-950">
                  <button
                    onClick={() => updateQuantity(idx, item.quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-mono-numbers font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(idx, item.quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right hidden sm:block min-w-24">
                  <span className="text-xs text-slate-400 block text-[10px] uppercase">Total</span>
                  <span className="text-sm font-bold text-white font-mono-numbers">
                    {formatPrice(item.priceNGN * item.quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(idx)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer rounded-lg hover:bg-slate-800"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-mono-numbers font-semibold text-white">
                  {formatPrice(cartTotalNGN)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Bank Payment Fee</span>
                <span className="text-emerald-400 font-semibold">₦ 0.00 (Free)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Estimated Delivery</span>
                <span className="text-slate-200">10-30 Mins Digital</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-base font-bold text-white">
                <span>Total Due</span>
                <span className="text-cyan-400 font-mono-numbers text-lg">
                  {formatPrice(cartTotalNGN)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 space-y-2 text-[11px] text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Authorized Subscriptions & Services</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manual Bank Transfer to Payrep MFB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
