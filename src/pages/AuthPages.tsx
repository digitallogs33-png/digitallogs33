import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, User, Mail, Lock, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthPages: React.FC<{ initialMode?: 'login' | 'register' }> = ({ initialMode = 'login' }) => {
  const { login, register, navigateTo } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (login(email)) {
        navigateTo('dashboard');
      }
    } else {
      if (register(name, email, phone)) {
        navigateTo('dashboard');
      }
    }
  };

  const handleDemoCustomerLogin = () => {
    login('divine.michael@example.com');
    navigateTo('dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-8 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          {mode === 'login' ? 'Customer Account Login' : 'Create Customer Account'}
        </h1>
        <p className="text-xs text-slate-400">
          Track orders, access purchased subscription vouchers, and manage invoices.
        </p>
      </div>

      {/* Mode Switch Tabs */}
      <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-semibold">
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
            mode === 'login'
              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('register')}
          className={`flex-1 py-2 rounded-lg transition-colors cursor-pointer ${
            mode === 'register'
              ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Register
        </button>
      </div>

      {/* Auth Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Divine Michael"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-slate-400 mb-1 font-medium">WhatsApp / Phone Number</label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md shadow-cyan-500/10 cursor-pointer mt-2"
          >
            {mode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account'}
          </button>
        </form>

        {/* Quick Demo Login Shortcut */}
        <div className="pt-4 border-t border-slate-800/80 text-center space-y-2">
          <span className="text-[11px] text-slate-500 block">Fast Prototyping Option:</span>
          <button
            onClick={handleDemoCustomerLogin}
            className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs rounded-lg transition-colors cursor-pointer"
          >
            Quick 1-Click Demo Login
          </button>
        </div>
      </div>
    </div>
  );
};
