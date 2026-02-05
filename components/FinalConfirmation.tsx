
import React from 'react';
import { Mail, Calendar, CheckCircle2, ShieldCheck, MessageSquare, Coffee, Heart } from 'lucide-react';

interface FinalConfirmationProps {
  inviteCode: string;
}

const FinalConfirmation: React.FC<FinalConfirmationProps> = ({ inviteCode }) => {
  return (
    <div className="max-w-2xl mx-auto text-center px-4">
      <div className="mb-12">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
          <CheckCircle2 className="text-green-500" size={56} />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Application Processed</h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-lg mx-auto">
          Your profile is in the queue. Follow the mandatory manual steps below to secure your spot.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-left relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <MessageSquare size={80} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-500/10 rounded-lg">
              <MessageSquare className="text-pink-400" size={20} />
            </div>
            <h3 className="font-bold text-white">Manual Verification</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            To finalize payment and receive the secret venue location, send your code <span className="text-white font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{inviteCode}</span> to our manager:
          </p>
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 flex flex-col items-center gap-1 text-center group-hover:border-pink-500/50 transition-colors">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Event Manager</span>
            <span className="text-2xl font-black text-pink-500 tracking-tighter uppercase italic">sugarwhips</span>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Heart className="text-purple-400" size={20} />
            </div>
            <h3 className="font-bold text-white">Amenities & BYOT</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 text-xs text-slate-400">
              <Coffee size={16} className="shrink-0 text-pink-400" />
              <span>Hot towels, snacks & chilled soda.</span>
            </li>
            <li className="flex gap-3 text-xs text-slate-400">
              <ShieldCheck size={16} className="shrink-0 text-pink-400" />
              <span>Complimentary condoms provided.</span>
            </li>
            <li className="flex gap-3 text-xs text-slate-400">
              <Heart size={16} className="shrink-0 text-pink-400" />
              <span>Bring Your Own Toys (Permitted).</span>
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
          Confidential • 25+ Only • High Discretion
        </p>
      </div>
    </div>
  );
};

export default FinalConfirmation;
