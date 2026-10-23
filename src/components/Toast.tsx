import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md ${
        toast.type === 'success'
          ? 'bg-slate-900/95 border-emerald-500/30 text-emerald-200'
          : toast.type === 'error'
          ? 'bg-slate-900/95 border-rose-500/30 text-rose-200'
          : 'bg-slate-900/95 border-cyan-500/30 text-cyan-200'
      }`}>
        <div className="shrink-0 mt-0.5">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400" />}
        </div>
        <div className="flex-1 text-sm font-medium text-slate-200">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
