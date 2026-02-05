
import React from 'react';
import { Mail, Calendar, CheckCircle2, ShieldCheck, MessageSquare, Coffee, Heart } from 'lucide-react';

interface FinalConfirmationProps {
  inviteCode: string;
}

const FinalConfirmation: React.FC<FinalConfirmationProps> = ({ inviteCode }) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-12">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="text-green-500" size={56} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Profile Verified</h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-lg mx-auto">
          Welcome to the circle. Your application is approved. Proceed with the instructions below to secure your entry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <MessageSquare size={80} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <MessageSquare className="text-pink-400" size={20} />
            </div>
            <h3 className="font-bold text-white">Manual Confirmation</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            To finalize payment and receive the secret location, you must send your code <span className="text-white font-mono font-bold bg-slate-950 px-2 py-0.5 rounded">{inviteCode}</span> to the manager:
          </p>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 flex flex-col items-center gap-1 text-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Contact Manager</span>
            <span className="text-2xl font-black text-pink-500 tracking-tighter uppercase italic">sugarwhips</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Heart className="text-purple-400" size={20} />
            </div>
            <h3 className="font-bold text-white">Venue Amenities</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 text-xs text-slate-400 italic">
              <Coffee size={16} className="shrink-0 text-slate-600 not-italic" />
              <span>Hot towels, premium snacks & soda.</span>
            </li>
            <li className="flex gap-3 text-xs text-slate-400 italic">
              <ShieldCheck size={16} className="shrink-0 text-slate-600 not-italic" />
              <span>Complimentary condoms provided.</span>
            </li>
            <li className="flex gap-3 text-xs text-slate-400 italic">
              <Heart size={16} className="shrink-0 text-slate-600 not-italic" />
              <span>Personal toys are permitted.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => window.location.reload()}
          className="px-10 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-xl font-bold transition-all"
        >
          Return to Dashboard
        </button>
        <p className="text-xs text-slate-600 uppercase tracking-[0.2em] font-bold">
          Confidential • 25+ Only • Safe Space
        </p>
      </div>
    </div>
  );
};

export default FinalConfirmation;
