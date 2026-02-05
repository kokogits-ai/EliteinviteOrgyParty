
import React from 'react';
import { X, ShieldAlert, Heart, EyeOff, UserMinus } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <ShieldAlert className="text-indigo-400" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white">Event Code of Conduct</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1"><Heart className="text-pink-500" size={20} /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Mutual Consent (Private Orgy)</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  As a private orgy gathering, every interaction must be explicitly consensual. "No" means no, and a lack of "Yes" also means no. Consent can be withdrawn at any time.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1"><EyeOff className="text-blue-500" size={20} /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Strict Privacy & No Photos</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  This is a blacked-out event. Phones will be checked or sealed at the door. No photography or recording of any kind is permitted.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1"><UserMinus className="text-red-500" size={20} /></div>
              <div>
                <h4 className="font-bold text-white mb-1">Zero Tolerance</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Harassment, discrimination, or aggressive behavior will result in immediate removal without a refund of your deposit.
                </p>
              </div>
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
            <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Age Requirement: 25+</h5>
            <p className="text-slate-400 text-sm leading-relaxed">
              Valid government-issued ID is required for entry. You must be at least 25 years old. The name must match your registration.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={onClose}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            I Understand and Agree
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
