import React from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShoppingBag,
  Clock,
  CheckCircle2,
  PackageSearch,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    orders,
    formatPrice,
    logout,
    navigateTo,
    setCurrentOrder
  } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Please sign in</h2>
        <p className="text-xs text-slate-400">You must be logged in to access your customer dashboard.</p>
        <button
          onClick={() => navigateTo('login')}
          className="px-6 py-2.5 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Filter orders relevant to this user or show all orders for prototype review
  const userOrders = orders.filter(
    (o) => o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
  );
  const displayOrders = userOrders.length > 0 ? userOrders : orders;

  const handleViewOrder = (order: any) => {
    setCurrentOrder(order);
    navigateTo('order-confirmation', { orderId: order.id });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Welcome Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-xl">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Customer Portal
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Email: {currentUser.email} {currentUser.phone ? `· Phone: ${currentUser.phone}` : ''}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-rose-300 text-xs font-semibold rounded-lg border border-slate-800 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Orders</span>
          <div className="text-2xl font-extrabold text-white font-mono-numbers">
            {displayOrders.length}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Completed / Delivered</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono-numbers">
            {displayOrders.filter((o) => o.status === 'delivered').length}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Pending Bank Verification</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono-numbers">
            {displayOrders.filter((o) => o.status === 'pending' || o.status === 'under_review').length}
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white">Your Orders & Licenses</h2>
          <button
            onClick={() => navigateTo('products')}
            className="text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Order New Service
          </button>
        </div>

        {displayOrders.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="space-y-3">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-numbers font-bold text-white text-sm">
                      {order.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[11px] text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      order.status === 'delivered'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : order.status === 'under_review'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-slate-300 font-medium">
                    {order.items.map((i) => i.productTitle).join(', ')}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {order.adminNotes || 'Payment verification in progress'}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-sm font-bold text-cyan-400 font-mono-numbers block">
                      {formatPrice(order.totalNGN)}
                    </span>
                    <span className="text-[10px] text-slate-500">Payrep MFB</span>
                  </div>

                  <button
                    onClick={() => handleViewOrder(order)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
