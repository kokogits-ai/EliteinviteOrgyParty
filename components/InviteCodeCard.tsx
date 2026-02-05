
import React, { useState } from 'react';
import { Key, Copy, Check, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

interface InviteCodeCardProps {
  code: string;
  onNext: () => void;
}

const InviteCodeCard: React.FC<InviteCodeCardProps> = ({ code, onNext }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full"></div>

        <div className="w-16 h-16 bg-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Key className="text-pink-400" size={32} />
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Application Approved</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Your profile has passed initial screening. Below is your unique registration code.
        </p>

        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative flex items-center justify-between bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5">
            <span className="text-3xl font-mono font-bold tracking-widest text-white">{code}</span>
            <button
              onClick={copyToClipboard}
              className={`p-3 rounded-xl transition-all ${
                copied ? 'bg-green-500/20 text-green-500' : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold uppercase text-[10px] tracking-widest">
            <MessageSquare size={14} />
            Final Step Required
          </div>
          <p className="text-slate-400 text-sm leading-relaxed italic">
            Secure your spot with a refundable deposit (covering damages, refreshments, and venue security). Send this code to <span className="text-white font-bold not-italic">sugarwhips</span> to finalize.
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 bg-white text-slate-950 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
        >
          Finish Registration
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-600 uppercase tracking-widest font-bold">
        <ShieldCheck size={16} />
        <span>Strict Privacy protocols in effect</span>
      </div>
    </div>
  );
};

export default InviteCodeCard;
