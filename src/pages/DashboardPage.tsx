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
  ExternalLink,
  Wallet,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  History
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    currentUser,
    currentUserWallet,
    orders,
    deposits,
    walletTransactions,
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

  const userDeposits = deposits.filter(
    (d) => d.userEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

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

      {/* Featured Wallet Balance Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,210,255,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Wallet className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Digital Logs Account Balance
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
            ₦ {(currentUserWallet?.balanceNGN || 0).toLocaleString('en-NG')}
          </div>
          <p className="text-[11px] text-slate-400">
            Funded via Payrep MFB · Instant checkout on any VPN, AI tool, or marketing package.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('add-funds')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-cyan-500/20 active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Funds (₦)</span>
          </button>
          <button
            onClick={() => navigateTo('products')}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            Order Services
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
          <span className="text-xs text-slate-400 block mb-1">Pending Orders</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono-numbers">
            {displayOrders.filter((o) => o.status === 'pending' || o.status === 'under_review').length}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Deposit Requests</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono-numbers">
            {userDeposits.length}
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

      {/* Recent Deposits Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-bold text-white">Wallet Deposits & History</h2>
          </div>
          <button
            onClick={() => navigateTo('add-funds')}
            className="text-xs text-cyan-400 hover:underline cursor-pointer flex items-center gap-1 font-semibold"
          >
            <span>+ Add Funds (₦)</span>
          </button>
        </div>

        {userDeposits.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            No deposit requests initiated yet. Click "Add Funds" to fund your wallet via Payrep MFB.
          </div>
        ) : (
          <div className="space-y-3">
            {userDeposits.slice(0, 5).map((dep) => (
              <div
                key={dep.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-numbers font-bold text-white">
                      {dep.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[11px] text-slate-500 font-mono-numbers">
                      {new Date(dep.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        dep.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : dep.status === 'under_review'
                          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                          : dep.status === 'rejected'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {dep.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="text-slate-300">
                    Narration Code: <code className="text-cyan-400 font-mono-numbers">{dep.depositReference}</code>
                    {dep.paymentReference ? ` · Ref: ${dep.paymentReference}` : ''}
                  </p>
                  {dep.adminNotes && (
                    <p className="text-[11px] text-slate-500 mt-0.5">{dep.adminNotes}</p>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-cyan-400 font-mono-numbers block">
                      ₦ {dep.amountNGN.toLocaleString('en-NG')}
                    </span>
                    <span className="text-[10px] text-slate-500">Payrep MFB</span>
                  </div>
                  <button
                    onClick={() => navigateTo('add-funds')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Manage
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

