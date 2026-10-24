import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Category, OrderStatus } from '../types';
import {
  SlidersHorizontal,
  Lock,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Building2,
  Coins,
  Shield,
  Layers,
  ShoppingBag,
  RotateCcw,
  Check,
  X,
  Search,
  Eye,
  LogOut,
  Wallet,
  ArrowDownLeft,
  CheckCircle,
  FileCheck,
  CreditCard
} from 'lucide-react';
import { DepositRequest } from '../types';

export const AdminPage: React.FC = () => {
  const {
    isAdmin,
    adminLogin,
    adminLogout,
    products,
    categories,
    orders,
    deposits,
    wallets,
    walletTransactions,
    approveDepositRequest,
    rejectDepositRequest,
    siteSettings,
    updateSiteSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    updateOrderStatus,
    formatPrice,
    paymentMethods,
    updatePaymentMethod,
    resetPaymentMethods,
    resetAllToDefault,
    showToast
  } = useApp();

  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'deposits' | 'products' | 'categories' | 'settings' | 'payments'>('overview');

  // Deposits management state
  const [depositFilter, setDepositFilter] = useState<string>('all');
  const [adminDepositSearch, setAdminDepositSearch] = useState<string>('');
  const [selectedDepositForReview, setSelectedDepositForReview] = useState<DepositRequest | null>(null);
  const [depositAdminNote, setDepositAdminNote] = useState<string>('');
  const [depositRejectionReason, setDepositRejectionReason] = useState<string>('');
  const [isRejectingModalOpen, setIsRejectingModalOpen] = useState<boolean>(false);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    title: '',
    category: 'VPN Subscriptions',
    shortDescription: '',
    description: '',
    priceNGN: 4000,
    duration: '30 Days',
    inStock: true,
    image: '/images/vpn/expressvpn.svg',
    licenseType: 'Official License Voucher',
    deliveryMethod: 'Instant Digital Key Dispatch',
    features: ['24/7 Access', 'Zero Logs', 'Cross-Platform Compatibility']
  });

  // Category modal state
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Settings form
  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });

  // Order status filter in admin
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [adminOrderSearch, setAdminOrderSearch] = useState<string>('');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<any | null>(null);

  // If not logged in as Admin, show Passcode Screen
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto py-12 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Administrator Access</h1>
          <p className="text-xs text-slate-400">
            Please enter your administrator passcode to manage inventory, verify orders, and edit settings.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            adminLogin(passcode);
          }}
          className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4"
        >
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Passcode</label>
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode (e.g. admin123)"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono-numbers"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Authenticate & Unlock
          </button>

          <p className="text-[11px] text-slate-500 text-center">
            Default test passcode: <code className="text-amber-300">admin123</code>
          </p>
        </form>
      </div>
    );
  }

  // Calculate Metrics
  const totalSalesNGN = orders
    .filter((o) => o.status === 'paid' || o.status === 'delivered')
    .reduce((acc, o) => acc + o.totalNGN, 0);

  const pendingCount = orders.filter((o) => o.status === 'pending' || o.status === 'under_review').length;

  const pendingDepositsCount = deposits.filter((d) => d.status === 'pending' || d.status === 'under_review').length;
  const totalDepositsCreditedNGN = deposits
    .filter((d) => d.status === 'approved')
    .reduce((acc, d) => acc + d.amountNGN, 0);
  const pendingDepositsVolumeNGN = deposits
    .filter((d) => d.status === 'pending' || d.status === 'under_review')
    .reduce((acc, d) => acc + d.amountNGN, 0);

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesFilter = orderFilter === 'all' || o.status === orderFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(adminOrderSearch.toLowerCase()) ||
      o.customerName.toLowerCase().includes(adminOrderSearch.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(adminOrderSearch.toLowerCase()) ||
      (o.paymentReference && o.paymentReference.toLowerCase().includes(adminOrderSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Filtered deposits
  const filteredDeposits = deposits.filter((d) => {
    const matchesFilter =
      depositFilter === 'all'
        ? true
        : depositFilter === 'pending'
        ? d.status === 'pending' || d.status === 'under_review'
        : d.status === depositFilter;
    const matchesSearch =
      d.id.toLowerCase().includes(adminDepositSearch.toLowerCase()) ||
      d.userName.toLowerCase().includes(adminDepositSearch.toLowerCase()) ||
      d.userEmail.toLowerCase().includes(adminDepositSearch.toLowerCase()) ||
      d.depositReference.toLowerCase().includes(adminDepositSearch.toLowerCase()) ||
      (d.paymentReference && d.paymentReference.toLowerCase().includes(adminDepositSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Handle open product edit modal
  const handleEditProduct = (prod: Product) => {
    setEditingProductId(prod.id);
    setProductForm({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.priceNGN) return;

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
    } else {
      addProduct({
        title: productForm.title || 'New Service',
        slug: productForm.title?.toLowerCase().replace(/\s+/g, '-') || 'new-service',
        category: productForm.category || 'VPN Subscriptions',
        shortDescription: productForm.shortDescription || '',
        description: productForm.description || '',
        priceNGN: Number(productForm.priceNGN) || 1500,
        duration: productForm.duration || '30 Days',
        inStock: productForm.inStock ?? true,
        image: productForm.image || '/images/vpn/expressvpn.svg',
        licenseType: productForm.licenseType || 'Commercial Voucher',
        deliveryMethod: productForm.deliveryMethod || 'Digital Dispatch',
        features: productForm.features || ['Instant Setup']
      });
    }

    setIsProductModalOpen(false);
    setEditingProductId(null);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    addCategory({
      name: newCatName.trim(),
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      description: newCatDesc.trim() || 'Digital service category',
      iconName: 'Shield'
    });

    setNewCatName('');
    setNewCatDesc('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Admin Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Admin Mode Active
            </span>
            <span className="text-xs text-slate-500">· Digital Logs Control Center</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetAllToDefault}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-lg text-xs font-medium cursor-pointer transition-colors"
            title="Reset store data to default seeds"
          >
            Reset Seed Data
          </button>
          <button
            onClick={adminLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Admin</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2 text-xs font-semibold overflow-x-auto no-scrollbar whitespace-nowrap">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer shrink-0 ${
            activeTab === 'overview'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Overview & KPIs
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'orders'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Orders</span>
          {pendingCount > 0 && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('deposits')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'deposits'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Wallet className="w-3.5 h-3.5 text-cyan-400" />
          <span>Deposits & Wallet</span>
          {pendingDepositsCount > 0 && (
            <span className="bg-cyan-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              {pendingDepositsCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer shrink-0 ${
            activeTab === 'products'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Catalog Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer shrink-0 ${
            activeTab === 'categories'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Categories ({categories.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer shrink-0 ${
            activeTab === 'settings'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Currency & Bank Settings
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-3.5 sm:px-4 py-2 min-h-[38px] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
            activeTab === 'payments'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
          <span>Payment Methods &amp; Footer</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Verified Revenue</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono-numbers">
                {formatPrice(totalSalesNGN, 'NGN')}
              </div>
              <span className="text-[10px] text-slate-500">Payrep MFB Settled</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Orders</span>
              <div className="text-2xl font-extrabold text-white font-mono-numbers">
                {orders.length}
              </div>
              <span className="text-[10px] text-slate-500">All customer submissions</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Pending Bank Review</span>
              <div className="text-2xl font-extrabold text-amber-400 font-mono-numbers">
                {pendingCount}
              </div>
              <span className="text-[10px] text-amber-300/80">Requires transfer verification</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Active Catalog Services</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono-numbers">
                {products.filter((p) => p.inStock).length}
              </div>
              <span className="text-[10px] text-slate-500">Out of {products.length} listed</span>
            </div>
          </div>

          {/* Bank Account Live Card */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between font-bold text-white">
              <span>Settlement Account Details:</span>
              <span className="text-cyan-400">1 USD = {siteSettings.usdExchangeRate} NGN</span>
            </div>
            <p className="text-slate-300">
              Bank: <strong>{siteSettings.bankName}</strong> | Account: <strong className="font-mono-numbers text-cyan-300">{siteSettings.bankAccountNumber}</strong> | Name: <strong>{siteSettings.bankAccountName}</strong> | Ref: <strong>{siteSettings.paymentReferenceId}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            {/* Search orders */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={adminOrderSearch}
                onChange={(e) => setAdminOrderSearch(e.target.value)}
                placeholder="Search order ID, customer, email..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Filter by status */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400 text-[11px]">Filter:</span>
              <select
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Orders ({orders.length})</option>
                <option value="pending">Pending Payment</option>
                <option value="under_review">Under Review</option>
                <option value="paid">Paid</option>
                <option value="delivered">Delivered</option>
                <option value="rejected">Rejected</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Services</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Payment Ref</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">
                      No orders found matching the filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono-numbers font-bold text-cyan-400">
                        {ord.id}
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-white">{ord.customerName}</div>
                        <div className="text-[11px] text-slate-400">{ord.customerPhone}</div>
                      </td>
                      <td className="p-3 max-w-xs">
                        <div className="truncate font-medium text-slate-200">
                          {ord.items.map((i) => i.productTitle).join(', ')}
                        </div>
                      </td>
                      <td className="p-3 font-mono-numbers font-bold text-white">
                        {formatPrice(ord.totalNGN)}
                      </td>
                      <td className="p-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className={`text-[11px] font-bold rounded px-2 py-1 border focus:outline-none cursor-pointer ${
                            ord.status === 'delivered'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                              : ord.status === 'under_review'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                              : ord.status === 'paid'
                              ? 'bg-blue-950/80 text-blue-300 border-blue-500/40'
                              : ord.status === 'rejected'
                              ? 'bg-rose-950/80 text-rose-300 border-rose-500/40'
                              : ord.status === 'refunded'
                              ? 'bg-purple-950/80 text-purple-300 border-purple-500/40'
                              : 'bg-slate-950 text-slate-300 border-slate-700'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="under_review">Under Review</option>
                          <option value="paid">Paid</option>
                          <option value="delivered">Delivered</option>
                          <option value="rejected">Rejected</option>
                          <option value="refunded">Refunded</option>
                        </select>
                      </td>
                      <td className="p-3 font-mono-numbers text-slate-300">
                        {ord.paymentReference || <span className="text-slate-600">—</span>}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedOrderForDetail(ord)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-semibold text-[11px] transition-colors cursor-pointer"
                        >
                          View Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Deposits & Wallet Funding */}
      {activeTab === 'deposits' && (
        <div className="space-y-6">
          {/* Deposits KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Approved & Credited</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono-numbers">
                ₦ {totalDepositsCreditedNGN.toLocaleString('en-NG')}
              </div>
              <span className="text-[10px] text-slate-500">Atomic ledger credits</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Awaiting Bank Verification</span>
              <div className="text-2xl font-extrabold text-amber-400 font-mono-numbers">
                {pendingDepositsCount}
              </div>
              <span className="text-[10px] text-amber-300 font-mono-numbers">
                ₦ {pendingDepositsVolumeNGN.toLocaleString('en-NG')} pending
              </span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Total Deposit Inquiries</span>
              <div className="text-2xl font-extrabold text-white font-mono-numbers">
                {deposits.length}
              </div>
              <span className="text-[10px] text-slate-500">All Payrep MFB requests</span>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Customer Wallets</span>
              <div className="text-2xl font-extrabold text-cyan-400 font-mono-numbers">
                {Object.keys(wallets).length}
              </div>
              <span className="text-[10px] text-slate-500">Registered ledger accounts</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={adminDepositSearch}
                onChange={(e) => setAdminDepositSearch(e.target.value)}
                placeholder="Search deposit ID, narration, customer..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-slate-400 text-[11px]">Status:</span>
              <select
                value={depositFilter}
                onChange={(e) => setDepositFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Deposits ({deposits.length})</option>
                <option value="pending">Pending Statement Verification</option>
                <option value="under_review">Under Review (Ref Submitted)</option>
                <option value="approved">Approved & Credited</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Deposits Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[760px]">
              <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Deposit Ref / Time</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Narration Code</th>
                  <th className="p-3">Bank Ref</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredDeposits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No deposit records match your current search/filter.
                    </td>
                  </tr>
                ) : (
                  filteredDeposits.map((dep) => (
                    <tr key={dep.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <span className="font-mono-numbers font-bold text-white block">
                          {dep.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono-numbers">
                          {new Date(dep.createdAt).toLocaleString()}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="font-semibold text-slate-200 block">{dep.userName}</span>
                        <span className="text-[11px] text-slate-400">{dep.userEmail}</span>
                      </td>

                      <td className="p-3">
                        <span className="font-mono-numbers font-extrabold text-cyan-400 text-sm">
                          ₦ {dep.amountNGN.toLocaleString('en-NG')}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className="font-mono-numbers font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                          {dep.depositReference}
                        </span>
                      </td>

                      <td className="p-3">
                        {dep.paymentReference ? (
                          <span className="font-mono-numbers text-slate-200 text-xs">
                            {dep.paymentReference}
                          </span>
                        ) : (
                          <span className="text-slate-600 text-xs italic">Awaiting submission</span>
                        )}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            dep.status === 'approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : dep.status === 'under_review'
                              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                              : dep.status === 'rejected'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                              : dep.status === 'cancelled'
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {dep.status === 'under_review' ? 'Under Review' : dep.status}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedDepositForReview(dep);
                              setDepositAdminNote(dep.adminNotes || '');
                              setDepositRejectionReason(dep.rejectionReason || '');
                            }}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            Review & Verify
                          </button>

                          {(dep.status === 'pending' || dep.status === 'under_review') && (
                            <button
                              onClick={() => {
                                approveDepositRequest(dep.id, 'Approved via Payrep MFB quick verification.');
                              }}
                              className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 rounded font-bold text-[11px] transition-colors cursor-pointer"
                              title="Instantly approve and credit customer wallet atomically"
                            >
                              Approve
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Products CRUD */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Product & Service Catalog ({products.length})
            </h2>
            <button
              onClick={() => {
                setEditingProductId(null);
                setProductForm({
                  title: '',
                  category: categories[0]?.name || 'VPN Subscriptions',
                  shortDescription: '',
                  description: '',
                  priceNGN: 4000,
                  duration: '30 Days',
                  inStock: true,
                  image: '/images/vpn/expressvpn.svg',
                  licenseType: 'Authorized License Voucher',
                  deliveryMethod: 'Instant Digital Key Dispatch',
                  features: ['Official Voucher', 'Zero-Log Protection', 'Fast Support']
                });
                setIsProductModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>{prod.category}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      prod.inStock ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
                    }`}>
                      {prod.inStock ? 'In Stock' : 'Sold Out'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-1">{prod.title}</h3>
                  <div className="text-base font-extrabold text-cyan-400 font-mono-numbers mt-1">
                    {formatPrice(prod.priceNGN)}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Toggle {prod.inStock ? 'Out of Stock' : 'In Stock'}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditProduct(prod)}
                      className="p-1.5 text-slate-400 hover:text-cyan-400 cursor-pointer rounded hover:bg-slate-800"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer rounded hover:bg-slate-800"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Categories CRUD */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Add Category Form */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Add New Category
              </h3>
              <form onSubmit={handleAddCategorySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Category Name</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Cloud Compute Servers"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Short summary of items in this category"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Create Category
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Existing Categories ({categories.length})
              </h3>
              {categories.map((cat) => {
                const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                return (
                  <div
                    key={cat.id}
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-white">{cat.name}</h4>
                      <p className="text-[11px] text-slate-400">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono-numbers text-slate-400 text-xs">
                        {count} Products
                      </span>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Currency & Bank Transfer Configuration
          </h2>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">USD Exchange Rate (1 USD = ? NGN)</label>
                <input
                  type="number"
                  required
                  value={settingsForm.usdExchangeRate}
                  onChange={(e) => setSettingsForm({ ...settingsForm, usdExchangeRate: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Bank Name</label>
                <input
                  type="text"
                  required
                  value={settingsForm.bankName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Bank Account Number</label>
                <input
                  type="text"
                  required
                  value={settingsForm.bankAccountNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bankAccountNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Account Beneficiary Name</label>
                <input
                  type="text"
                  required
                  value={settingsForm.bankAccountName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bankAccountName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">Payment Reference / Balance ID</label>
                <input
                  type="text"
                  value={settingsForm.paymentReferenceId}
                  onChange={(e) => setSettingsForm({ ...settingsForm, paymentReferenceId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">WhatsApp Support Number</label>
                <input
                  type="text"
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 mb-1">
                  Min Customer Deposit Limit (₦) <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="number"
                  min="500"
                  step="500"
                  required
                  value={settingsForm.minDepositNGN || 2000}
                  onChange={(e) => setSettingsForm({ ...settingsForm, minDepositNGN: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-slate-500">Floor amount for /add-funds</span>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">
                  Max Customer Deposit Limit (₦) <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  required
                  value={settingsForm.maxDepositNGN || 2000000}
                  onChange={(e) => setSettingsForm({ ...settingsForm, maxDepositNGN: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono-numbers focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-slate-500">Ceiling amount per transaction</span>
              </div>
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Telegram Channel URL</label>
              <input
                type="text"
                value={settingsForm.telegramUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, telegramUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-6 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Save Configuration
            </button>
          </form>
        </div>
      )}

      {/* Tab 7: Payment Methods & Footer System */}
      {activeTab === 'payments' && (
        <div className="space-y-6">
          {/* Header & Quick Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl bg-slate-900 border border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Payment Methods &amp; Footer Configuration</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage supported payment channels, display orders, and footer badges.
              </p>
            </div>
            <button
              onClick={resetPaymentMethods}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shrink-0"
            >
              Reset to Recommended Seed
            </button>
          </div>

          {/* Strict Compliance Banner */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-600/40 text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Consumer Protection &amp; Gateway Compliance Rule</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-200/90">
              Only display payment methods that are actually available and supported. Do not activate
              Visa, Mastercard, or Verve card logos unless a compliant, automated payment gateway
              (such as Paystack or Flutterwave) is integrated and verified. For manual bank deposits,
              Digital Logs presents neutral Bank Transfer and Payrep MFB settlement.
            </p>
          </div>

          {/* Live Footer Preview Box */}
          <div className="p-5 rounded-xl bg-black border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Live Public Footer Preview
              </span>
              <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
                {paymentMethods.filter((m) => m.isActive).length} Channels Active
              </span>
            </div>

            <div className="py-4 border-y border-zinc-900 flex flex-col items-center justify-center text-center">
              <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                &copy; {new Date().getFullYear()} DIGITAL LOGS. ALL RIGHTS RESERVED
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
                {paymentMethods
                  .filter((m) => m.isActive)
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((method) => (
                    <div
                      key={method.id}
                      className="h-8 px-3 py-1 bg-white rounded-md shadow-sm border border-slate-200 flex items-center justify-center"
                    >
                      <img
                        src={method.logoPath}
                        alt={method.altText}
                        className="h-5 w-auto object-contain max-w-[95px]"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Payment Methods Table / Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Configured Payment Channels ({paymentMethods.length})
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {paymentMethods
                .sort((a, b) => a.displayOrder - b.displayOrder)
                .map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-xl border transition-all ${
                      method.isActive
                        ? 'bg-slate-900/90 border-slate-700/80'
                        : 'bg-slate-950/60 border-slate-800/60 opacity-85'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left: Logo & Info */}
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className="h-10 w-28 px-2 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                          <img
                            src={method.logoPath}
                            alt={method.altText}
                            className="h-6 w-auto object-contain max-w-[100px]"
                          />
                        </div>

                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs sm:text-sm">
                              {method.displayName}
                            </span>
                            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                              {method.currency || 'NGN'}
                            </span>
                            {method.requiresGateway && (
                              <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.2 rounded font-semibold">
                                Gateway Required
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{method.description}</p>
                          {method.notes && (
                            <p className="text-[10px] text-slate-500 italic">{method.notes}</p>
                          )}
                        </div>
                      </div>

                      {/* Right: Controls (Order & Toggle) */}
                      <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span className="text-[10px]">Order:</span>
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={method.displayOrder}
                            onChange={(e) =>
                              updatePaymentMethod(method.id, {
                                displayOrder: Number(e.target.value) || 1
                              })
                            }
                            className="w-12 bg-slate-950 border border-slate-700 rounded px-1.5 py-1 text-center text-xs text-white font-mono"
                          />
                        </div>

                        <button
                          onClick={() => {
                            if (!method.isActive && method.requiresGateway) {
                              const confirmActivation = window.confirm(
                                `Notice: ${method.displayName} requires an active automated card gateway (e.g. Paystack or Flutterwave).\n\nDisplaying card logos without an operational card gateway violates consumer compliance rules.\n\nDo you want to enable this anyway for gateway testing?`
                              );
                              if (!confirmActivation) return;
                            }
                            updatePaymentMethod(method.id, { isActive: !method.isActive });
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                            method.isActive
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                          }`}
                        >
                          {method.isActive ? 'Active in Footer' : 'Inactive (Hidden)'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Product Edit / Add Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingProductId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Price (NGN)</label>
                  <input
                    type="number"
                    required
                    value={productForm.priceNGN}
                    onChange={(e) => setProductForm({ ...productForm, priceNGN: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono-numbers focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Short Description</label>
                <input
                  type="text"
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Duration / Turnaround</label>
                  <input
                    type="text"
                    value={productForm.duration}
                    onChange={(e) => setProductForm({ ...productForm, duration: e.target.value })}
                    placeholder="e.g. 30 Days"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="instock-check"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-400"
                  />
                  <label htmlFor="instock-check" className="text-slate-300 font-medium cursor-pointer">
                    In Stock / Available
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg hover:bg-cyan-300 cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Detail View Modal */}
      {selectedOrderForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white font-mono-numbers">
                  Order {selectedOrderForDetail.id}
                </h3>
                <span className="text-slate-500 text-[10px]">
                  Placed: {new Date(selectedOrderForDetail.createdAt).toLocaleString()}
                </span>
              </div>
              <button onClick={() => setSelectedOrderForDetail(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <p><strong>Customer:</strong> {selectedOrderForDetail.customerName}</p>
                <p><strong>Email:</strong> {selectedOrderForDetail.customerEmail}</p>
                <p><strong>Phone:</strong> {selectedOrderForDetail.customerPhone}</p>
                {selectedOrderForDetail.targetAccountUrl && (
                  <p><strong>Account/Page:</strong> {selectedOrderForDetail.targetAccountUrl}</p>
                )}
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <p><strong>Payment Proof / Ref:</strong> {selectedOrderForDetail.paymentReference || 'None submitted yet'}</p>
                <p><strong>Proof Notes:</strong> {selectedOrderForDetail.paymentProofNotes || 'None'}</p>
                <p><strong>Special Instructions:</strong> {selectedOrderForDetail.specialInstructions || 'None'}</p>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Update Status</label>
                <select
                  value={selectedOrderForDetail.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as OrderStatus;
                    updateOrderStatus(selectedOrderForDetail.id, nextStatus);
                    setSelectedOrderForDetail({ ...selectedOrderForDetail, status: nextStatus });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  <option value="pending">Pending Payment</option>
                  <option value="under_review">Under Review</option>
                  <option value="paid">Paid</option>
                  <option value="delivered">Delivered</option>
                  <option value="rejected">Rejected</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Review & Verification Modal */}
      {selectedDepositForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-xl text-xs space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Bank Transfer Verification Desk
                </span>
                <h3 className="text-base font-extrabold text-white font-mono-numbers">
                  Deposit Request {selectedDepositForReview.id}
                </h3>
              </div>
              <button
                onClick={() => {
                  setSelectedDepositForReview(null);
                  setIsRejectingModalOpen(false);
                }}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verification Checklist */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-white">{selectedDepositForReview.userName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Customer Email:</span>
                <span className="font-mono-numbers text-slate-200">{selectedDepositForReview.userEmail}</span>
              </div>
              {selectedDepositForReview.userPhone && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-mono-numbers text-slate-200">{selectedDepositForReview.userPhone}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-slate-400 font-semibold">Deposit Amount:</span>
                <span className="font-mono-numbers font-black text-cyan-400 text-base">
                  ₦ {selectedDepositForReview.amountNGN.toLocaleString('en-NG')}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-amber-400 font-semibold">Expected Narration Code:</span>
                <span className="font-mono-numbers font-extrabold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                  {selectedDepositForReview.depositReference}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Customer's Bank Reference:</span>
                <span className="font-mono-numbers font-bold text-white">
                  {selectedDepositForReview.paymentReference || <em className="text-slate-500">Not provided</em>}
                </span>
              </div>
              {selectedDepositForReview.paymentProofNotes && (
                <div className="pt-1 border-t border-slate-800/80">
                  <span className="text-slate-400 block mb-0.5">Customer Payment Notes:</span>
                  <p className="text-slate-300 italic bg-slate-900/60 p-2 rounded border border-slate-800">
                    "{selectedDepositForReview.paymentProofNotes}"
                  </p>
                </div>
              )}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Current Status:</span>
                <span className="font-bold uppercase text-cyan-300">
                  {selectedDepositForReview.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Target Account Reference */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-300 block">Bank Account Statement to Reconcile:</span>
              <p>
                Bank: <strong className="text-white">{siteSettings.bankName}</strong> · Account Number: <strong className="font-mono-numbers text-cyan-400">{siteSettings.bankAccountNumber}</strong> · Name: <strong className="text-white">{siteSettings.bankAccountName}</strong>
              </p>
            </div>

            {/* Admin Note input */}
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">
                Internal Verification Note (Optional audit remarks)
              </label>
              <input
                type="text"
                value={depositAdminNote}
                onChange={(e) => setDepositAdminNote(e.target.value)}
                placeholder="e.g. Verified on Payrep MFB app at 14:32. Statement Ref #8491."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* If rejecting, show mandatory reason field */}
            {isRejectingModalOpen ? (
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-3">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>Mandatory Rejection Reason</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Provide an explanation that will be recorded in the audit trail and visible to the customer.
                </p>
                <textarea
                  rows={2}
                  required
                  value={depositRejectionReason}
                  onChange={(e) => setDepositRejectionReason(e.target.value)}
                  placeholder="e.g. Reference code not found on Payrep MFB statement. Please recheck your transaction receipt or contact support."
                  className="w-full bg-slate-950 border border-rose-800/60 rounded-lg p-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-400 resize-none"
                />
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (!depositRejectionReason.trim()) {
                        showToast('Please type a mandatory rejection reason before confirming.', 'error');
                        return;
                      }
                      rejectDepositRequest(selectedDepositForReview.id, depositRejectionReason.trim());
                      setSelectedDepositForReview(null);
                      setIsRejectingModalOpen(false);
                    }}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm Rejection
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRejectingModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                {selectedDepositForReview.status !== 'approved' ? (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        approveDepositRequest(selectedDepositForReview.id, depositAdminNote.trim() || undefined);
                        setSelectedDepositForReview(null);
                      }}
                      className="w-full sm:flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve & Credit ₦{selectedDepositForReview.amountNGN.toLocaleString('en-NG')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsRejectingModalOpen(true)}
                      className="w-full sm:w-auto px-4 py-3 bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 font-bold text-xs rounded-xl border border-rose-800/50 transition-colors cursor-pointer"
                    >
                      Reject Request
                    </button>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 font-semibold text-center">
                    ✓ This deposit was verified & credited to customer wallet (Ledger Tx: {selectedDepositForReview.ledgerTransactionId || 'Recorded'})
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSelectedDepositForReview(null);
                    setIsRejectingModalOpen(false);
                  }}
                  className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer text-xs"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

