
import React, { useState } from 'react';
import { Wallet, CreditCard, ShieldCheck, Loader2, Lock } from 'lucide-react';

interface PaymentCardProps {
  onPaid: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ onPaid }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaid();
    }, 2500);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-8 md:p-10 border-b border-slate-800 bg-slate-900/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-pink-500/10 rounded-xl">
              <Wallet className="text-pink-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Security Deposit</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            A refundable <span className="text-white font-bold">$100.00</span> security deposit is required to confirm your attendance. This covers incidental damages, refreshments, and ensures guest commitment.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between text-slate-300">
              <span>Deposit Amount</span>
              <span className="font-mono">$100.00</span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Processing Fee</span>
              <span className="font-mono">$0.00</span>
            </div>
            <div className="h-px bg-slate-800 my-4"></div>
            <div className="flex items-center justify-between text-white text-xl font-bold">
              <span>Total Due</span>
              <span className="font-mono">$100.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 text-center cursor-pointer">
              <CreditCard className="mx-auto mb-2 text-indigo-400" size={20} />
              <span className="text-xs font-semibold text-slate-300">Card Payment</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-center cursor-not-allowed opacity-50">
              <Wallet className="mx-auto mb-2 text-slate-500" size={20} />
              <span className="text-xs font-semibold text-slate-500">Digital Wallet</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
          >
            {isProcessing ? (
              <><Loader2 className="animate-spin" size={24} /> Processing Securely...</>
            ) : (
              <><Lock size={20} /> Pay Deposit Now</>
            )}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 uppercase tracking-widest font-bold">
            <ShieldCheck size={14} />
            <span>Bank-level Encryption Secured</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 flex gap-4">
        <ShieldCheck className="text-indigo-400 shrink-0" size={20} />
        <p className="text-xs text-slate-400 leading-relaxed">
          The deposit is fully refundable within 48 hours after the event, provided there are no policy violations or property damages.
        </p>
      </div>
    </div>
  );
};

export default PaymentCard;
