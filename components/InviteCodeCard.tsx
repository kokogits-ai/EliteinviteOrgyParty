
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

        <h2 className="text-3xl font-bold text-white mb-4 uppercase tracking-tight">Your Invitation Code</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Screening successfully recorded. Present this code to the event manager for final venue access and deposit handling.
        </p>

        <div className="relative group mb-10">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative flex items-center justify-between bg-slate-950 border border-slate-800 rounded-2xl px-6 py-6">
            <span className="text-4xl font-mono font-black tracking-[0.2em] text-white selection:bg-pink-500">{code}</span>
            <button
              onClick={copyToClipboard}
              className={`p-4 rounded-xl transition-all ${
                copied ? 'bg-green-500/20 text-green-500' : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700'
              }`}
            >
              {copied ? <Check size={24} /> : <Copy size={24} />}
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 mb-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[12px] tracking-widest bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
            <MessageSquare size={16} />
            MANDATORY FINAL STEP
          </div>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            Send your code <span className="text-white font-bold bg-slate-950 px-2 rounded border border-slate-800">{code}</span> to our manager <span className="text-pink-500 font-black uppercase italic tracking-tighter text-lg">sugarwhips</span> to arrange your security deposit and get the secret address.
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-full py-5 bg-white text-slate-950 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5"
        >
          Proceed to Summary
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-600 uppercase tracking-[0.2em] font-bold">
        <ShieldCheck size={16} />
        <span>Strict Privacy protocols in effect</span>
      </div>
    </div>
  );
};

export default InviteCodeCard;