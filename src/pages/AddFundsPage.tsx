import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wallet,
  ArrowRight,
  Check,
  Copy,
  Building2,
  ShieldCheck,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Info,
  Sparkles,
  Lock,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  History
} from 'lucide-react';
import { DepositRequest } from '../types';

export const AddFundsPage: React.FC = () => {
  const {
    currentUser,
    currentUserWallet,
    siteSettings,
    deposits,
    walletTransactions,
    createDepositRequest,
    submitDepositProof,
    cancelDepositRequest,
    navigateTo,
    formatPrice,
    showToast
  } = useApp();

  const [amountInput, setAmountInput] = useState<string>('10000');
  const [customRefInput, setCustomRefInput] = useState<string>('');
  const [paymentNotes, setPaymentNotes] = useState<string>('');
  const [activeDeposit, setActiveDeposit] = useState<DepositRequest | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [historyTab, setHistoryTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedDepositForModal, setSelectedDepositForModal] = useState<DepositRequest | null>(null);

  // Quick preset deposit amounts (in NGN)
  const PRESET_AMOUNTS = [2000, 5000, 10000, 25000, 50000, 100000];

  const minDeposit = siteSettings.minDepositNGN || 2000;
  const maxDeposit = siteSettings.maxDepositNGN || 2000000;

  const parsedAmount = parseFloat(amountInput) || 0;
  const isAmountValid = parsedAmount >= minDeposit && parsedAmount <= maxDeposit;

  // Filter current user's deposits & transactions
  const userDeposits = currentUser
    ? deposits.filter((d) => d.userEmail.toLowerCase() === currentUser.email.toLowerCase())
    : [];

  const userTransactions = currentUser
    ? walletTransactions.filter((t) => t.userEmail.toLowerCase() === currentUser.email.toLowerCase())
    : [];

  // Count pending deposits
  const pendingDeposits = userDeposits.filter((d) => d.status === 'pending' || d.status === 'under_review');
  const pendingTotalNGN = pendingDeposits.reduce((acc, d) => acc + d.amountNGN, 0);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(siteSettings.bankAccountNumber);
    setCopiedAccount(true);
    showToast('Payrep MFB account number (2091223616) copied to clipboard.', 'info');
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    showToast(`Deposit narration code "${ref}" copied!`, 'info');
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleInitializeDeposit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      showToast('Please sign in or register to initiate a wallet deposit.', 'error');
      navigateTo('login');
      return;
    }

    if (!isAmountValid) {
      if (parsedAmount < minDeposit) {
        showToast(`Minimum deposit is ₦${minDeposit.toLocaleString('en-NG')}.`, 'error');
      } else if (parsedAmount > maxDeposit) {
        showToast(`Maximum deposit limit is ₦${maxDeposit.toLocaleString('en-NG')}.`, 'error');
      } else {
        showToast('Please enter a valid numeric deposit amount.', 'error');
      }
      return;
    }

    const result = createDepositRequest(parsedAmount);
    if (result.success && result.deposit) {
      setActiveDeposit(result.deposit);
      setCustomRefInput('');
      setPaymentNotes('');
    }
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDeposit) return;

    if (!customRefInput.trim()) {
      showToast('Please enter the bank transaction reference from your bank app receipt.', 'error');
      return;
    }

    const success = submitDepositProof(activeDeposit.id, customRefInput.trim(), paymentNotes.trim());
    if (success) {
      setActiveDeposit(null);
      setCustomRefInput('');
      setPaymentNotes('');
    }
  };

  const filteredHistory = userDeposits.filter((d) => {
    if (historyTab === 'all') return true;
    if (historyTab === 'pending') return d.status === 'pending' || d.status === 'under_review';
    return d.status === historyTab;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Breadcrumb & Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <button
            onClick={() => navigateTo('home')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('dashboard')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <span>/</span>
          <span className="text-white font-medium">Add Funds & Deposit</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Nigerian Naira Wallet Funding</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>Add Funds to Wallet</span>
              <span className="text-cyan-400 font-mono-numbers">₦</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Fund your Digital Logs account balance securely via verified Payrep MFB bank transfer.
              Use your wallet to instantly purchase VPN vouchers, AI subscriptions, and marketing services.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('dashboard')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Auth Guard Banner if not signed in */}
      {!currentUser && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-cyan-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>Customer Account Required</span>
            </div>
            <p className="text-xs text-slate-300">
              Wallet balances are uniquely attached to your verified customer email and protected by immutable transaction logs.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => navigateTo('login')}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Sign In to Fund Wallet
            </button>
            <button
              onClick={() => navigateTo('register')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </div>
      )}

      {/* Top Wallet Overview Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Available Balance */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 shadow-[0_0_25px_rgba(0,210,255,0.06)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" />
              Available Wallet Balance
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono-numbers tracking-tight mt-1">
            ₦ {(currentUserWallet?.balanceNGN || 0).toLocaleString('en-NG')}
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
            <span>Customer:</span>
            <span className="text-slate-200 font-medium truncate max-w-[180px]">
              {currentUser?.email || 'Guest Mode'}
            </span>
          </p>
        </div>

        {/* Card 2: Pending In-Flight Deposits */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Pending Bank Verification
            </span>
            {pendingDeposits.length > 0 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {pendingDeposits.length} Pending
              </span>
            )}
          </div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono-numbers tracking-tight mt-1">
            ₦ {pendingTotalNGN.toLocaleString('en-NG')}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {pendingDeposits.length === 0
              ? 'No pending verification requests'
              : `${pendingDeposits.length} deposit(s) awaiting bank statement match`}
          </p>
        </div>

        {/* Card 3: Total Cumulative Deposits */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Total Cumulative Funded
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Verified
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-200 font-mono-numbers tracking-tight mt-1">
            ₦ {(currentUserWallet?.totalDepositedNGN || 0).toLocaleString('en-NG')}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Spent: ₦ {(currentUserWallet?.totalSpentNGN || 0).toLocaleString('en-NG')} on digital services
          </p>
        </div>
      </div>

      {/* Main Deposit Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deposit Form & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-black flex items-center justify-center">
                  1
                </span>
                <span>Select Deposit Amount</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Choose a quick preset or type any custom amount within administrator limits.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Quick Preset Amounts
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {PRESET_AMOUNTS.map((amt) => {
                  const isSelected = parsedAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAmountInput(amt.toString())}
                      className={`px-3 py-2 rounded-xl text-xs font-bold font-mono-numbers transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20 scale-[1.02]'
                          : 'bg-slate-950 hover:bg-slate-800/80 text-slate-300 border-slate-800'
                      }`}
                    >
                      ₦{amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Amount Input */}
            <form onSubmit={handleInitializeDeposit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Amount in Nigerian Naira (NGN) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 font-bold text-base pointer-events-none font-mono-numbers">
                    ₦
                  </div>
                  <input
                    type="number"
                    min={minDeposit}
                    max={maxDeposit}
                    step="500"
                    required
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="Enter deposit amount (e.g. 10000)"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 rounded-xl pl-9 pr-4 py-3 text-base font-extrabold text-white font-mono-numbers transition-all"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-500">
                    NGN
                  </div>
                </div>

                {/* Limits indicator */}
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className={`${parsedAmount < minDeposit ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    Min Deposit: ₦{minDeposit.toLocaleString('en-NG')}
                  </span>
                  <span className={`${parsedAmount > maxDeposit ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    Max Deposit: ₦{maxDeposit.toLocaleString('en-NG')}
                  </span>
                </div>
              </div>

              {/* Payment Method Selector (Locked to Payrep MFB Bank Transfer) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Payment Method
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Payrep MFB Bank Transfer</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Direct
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Zero fees · Verified manual settlement · 5-15 min turnaround
                      </p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-cyan-400/20 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>
                </div>
              </div>

              {/* Submit / Generate button */}
              <button
                type="submit"
                disabled={!isAmountValid}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isAmountValid
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 active:scale-[0.99]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
                }`}
              >
                <span>Generate Deposit Request (₦{parsedAmount ? parsedAmount.toLocaleString('en-NG') : '0'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Active Deposit Request Settlement Card (Appears once generated) */}
          {activeDeposit && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/10 space-y-6 animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 block mb-1">
                    Step 2: Complete Transfer & Submit Reference
                  </span>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>Deposit Request</span>
                    <span className="font-mono-numbers text-cyan-400">#{activeDeposit.id}</span>
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Amount to Transfer</span>
                  <span className="text-lg font-extrabold text-cyan-300 font-mono-numbers">
                    ₦ {activeDeposit.amountNGN.toLocaleString('en-NG')}
                  </span>
                </div>
              </div>

              {/* Bank Transfer Instructions Callout */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Destination Bank:</span>
                  <span className="text-white font-bold">{siteSettings.bankName}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Account Name:</span>
                  <span className="text-white font-bold tracking-wide">{siteSettings.bankAccountName}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-numbers font-extrabold text-white text-sm tracking-wider">
                      {siteSettings.bankAccountNumber}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors cursor-pointer"
                      title="Copy Account Number"
                    >
                      {copiedAccount ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Reference / Narration requirement */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="text-amber-300 font-semibold block">Mandatory Transfer Narration / Remark:</span>
                    <span className="text-[11px] text-slate-400">Include this code in your bank app narration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-numbers font-black text-cyan-300 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-500/30">
                      {activeDeposit.depositReference}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyReference(activeDeposit.depositReference)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors cursor-pointer"
                      title="Copy Narration Reference"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form to submit proof of payment */}
              <form onSubmit={handleSubmitProof} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Bank Transfer Transaction Reference / Session ID <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customRefInput}
                    onChange={(e) => setCustomRefInput(e.target.value)}
                    placeholder="e.g. 09026726010049281900 or GTB-NIP-94819"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono-numbers focus:border-cyan-400 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Enter the Reference Number, Narration ID, or Session ID from your debit alert or receipt.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sender Bank & Name (Optional Notes)
                  </label>
                  <textarea
                    rows={2}
                    value={paymentNotes}
                    onChange={(e) => setPaymentNotes(e.target.value)}
                    placeholder="e.g. Sent from Zenith Bank / John Doe. Narration: DL-DEP-..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Payment Reference for Verification</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      cancelDepositRequest(activeDeposit.id);
                      setActiveDeposit(null);
                    }}
                    className="px-4 py-3 bg-slate-950 hover:bg-slate-800 text-rose-400 text-xs font-semibold rounded-xl border border-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Bank Details & Verification Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official Bank Account Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Authorized Settlement Account</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                Nigeria NGN
              </span>
            </div>

            <div className="space-y-3.5">
              <div>
                <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-semibold">
                  Financial Institution
                </span>
                <span className="text-sm font-extrabold text-white">
                  {siteSettings.bankName}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-semibold">
                  Account Name
                </span>
                <span className="text-sm font-extrabold text-white tracking-wide">
                  {siteSettings.bankAccountName}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 block uppercase tracking-wider font-semibold">
                  Account Number
                </span>
                <div className="flex items-center justify-between mt-1 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-base font-extrabold text-cyan-400 font-mono-numbers tracking-widest">
                    {siteSettings.bankAccountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/30 transition-all cursor-pointer"
                  >
                    {copiedAccount ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Verification Notice */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-400 space-y-1.5">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verification & Crediting Protocol</span>
              </div>
              <p>
                1. Transfer the exact amount shown on your deposit request.
              </p>
              <p>
                2. Do not claim that a transfer has succeeded until payment has been verified. Wallet balances are credited strictly upon authorized bank settlement confirmation.
              </p>
              <p>
                3. Never share your online banking login credentials, PIN, or OTPs. Digital Logs will never ask for private banking credentials.
              </p>
            </div>
          </div>

          {/* Quick Support Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Need Immediate Verification Support?</span>
            </h4>
            <p className="text-xs text-slate-400">
              For bulk transfers above ₦500,000 or urgent weekend credits, our finance desk is reachable 24/7 on WhatsApp & Telegram.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href={`https://wa.me/${siteSettings.whatsappFormatted}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-colors"
              >
                WhatsApp Desk
              </a>
              <a
                href={siteSettings.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold transition-colors"
              >
                Telegram Channel
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Deposit History & Ledger Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-cyan-400" />
              <span>Your Deposit Requests & History</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Track the exact status, reference codes, timestamps, and ledger credits of all wallet deposits.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-slate-800 text-xs">
            {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setHistoryTab(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                  historyTab === tab
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* History Table / Cards */}
        {filteredHistory.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-xs font-bold text-slate-300">No deposit records found in this view</h4>
            <p className="text-[11px] text-slate-500">
              {currentUser
                ? 'Generate a new deposit request above to top up your balance.'
                : 'Sign in to review your personal wallet history.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((dep) => (
              <div
                key={dep.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono-numbers font-extrabold text-white text-sm">
                      {dep.id}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 font-mono-numbers text-[11px]">
                      {new Date(dep.createdAt).toLocaleString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
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
                  </div>

                  <p className="text-slate-300 text-xs">
                    Narration Code: <code className="text-cyan-400 font-mono-numbers">{dep.depositReference}</code>
                    {dep.paymentReference && (
                      <span className="ml-2 text-slate-400">
                        · Bank Ref: <span className="text-slate-200 font-mono-numbers">{dep.paymentReference}</span>
                      </span>
                    )}
                  </p>

                  {dep.adminNotes && (
                    <p className="text-[11px] text-slate-400 mt-1 italic">
                      Note: {dep.adminNotes}
                    </p>
                  )}

                  {dep.rejectionReason && (
                    <p className="text-[11px] text-rose-400 mt-1 font-semibold">
                      Reason: {dep.rejectionReason}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-2 md:pt-0 border-t md:border-0 border-slate-800">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-cyan-400 font-mono-numbers block">
                      ₦ {dep.amountNGN.toLocaleString('en-NG')}
                    </span>
                    <span className="text-[10px] text-slate-500">Payrep MFB</span>
                  </div>

                  {dep.status === 'pending' && (
                    <button
                      onClick={() => setActiveDeposit(dep)}
                      className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold rounded-lg border border-cyan-500/30 transition-colors cursor-pointer text-xs"
                    >
                      Submit Ref
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedDepositForModal(dep)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-colors cursor-pointer text-xs"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Wallet Ledger Transactions View (Append-Only Audit Trail) */}
      {userTransactions.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Wallet Ledger & Audit Trail</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              {userTransactions.length} recorded entries
            </span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {userTransactions.map((tx) => (
              <div key={tx.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === 'deposit_credit'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {tx.type === 'deposit_credit' ? (
                      <ArrowDownLeft className="w-4 h-4" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{tx.description}</p>
                    <p className="text-[11px] text-slate-500 font-mono-numbers">
                      {new Date(tx.createdAt).toLocaleString()} · ID: {tx.id}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`font-mono-numbers font-bold text-sm block ${
                      tx.type === 'deposit_credit' ? 'text-emerald-400' : 'text-slate-300'
                    }`}
                  >
                    {tx.type === 'deposit_credit' ? '+' : '-'} ₦ {tx.amountNGN.toLocaleString('en-NG')}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono-numbers">
                    Bal: ₦ {tx.balanceAfterNGN.toLocaleString('en-NG')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deposit Details Modal */}
      {selectedDepositForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
                  Deposit Record Detail
                </span>
                <h3 className="text-base font-extrabold text-white font-mono-numbers">
                  {selectedDepositForModal.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDepositForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Status</span>
                <span className="font-bold text-cyan-400 uppercase">
                  {selectedDepositForModal.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Amount</span>
                <span className="font-extrabold text-white font-mono-numbers text-sm">
                  ₦ {selectedDepositForModal.amountNGN.toLocaleString('en-NG')}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Narration Code</span>
                <span className="font-mono-numbers font-bold text-cyan-300">
                  {selectedDepositForModal.depositReference}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Customer Bank Reference</span>
                <span className="font-mono-numbers text-slate-200">
                  {selectedDepositForModal.paymentReference || 'None submitted yet'}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Target Bank</span>
                <span className="text-slate-200">
                  {selectedDepositForModal.bankName} · {selectedDepositForModal.accountNumber}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                <span className="text-slate-400">Submission Date</span>
                <span className="font-mono-numbers text-slate-200">
                  {new Date(selectedDepositForModal.createdAt).toLocaleString()}
                </span>
              </div>
              {selectedDepositForModal.reviewedAt && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Reviewed At</span>
                  <span className="font-mono-numbers text-slate-200">
                    {new Date(selectedDepositForModal.reviewedAt).toLocaleString()}
                  </span>
                </div>
              )}
              {selectedDepositForModal.ledgerTransactionId && (
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Ledger Tx ID</span>
                  <span className="font-mono-numbers text-emerald-400">
                    {selectedDepositForModal.ledgerTransactionId}
                  </span>
                </div>
              )}
              {selectedDepositForModal.adminNotes && (
                <div className="py-1.5">
                  <span className="text-slate-400 block mb-0.5">Admin Note</span>
                  <p className="text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px]">
                    {selectedDepositForModal.adminNotes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedDepositForModal(null)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
