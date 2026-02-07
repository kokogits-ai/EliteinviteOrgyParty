
import React, { useState } from 'react';
import { CheckCircle, User, ArrowRight, ArrowLeft, Loader2, Calendar, Shield, Coffee, Heart, PencilLine } from 'lucide-react';
import { FormData } from '../types';

interface ScreeningFormProps {
  onFinish: () => void;
  onCancel: () => void;
}

const ScreeningForm: React.FC<ScreeningFormProps> = ({ onFinish, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    ageVerified: false,
    agreedToConduct: false,
    name: '',
    email: '',
    phone: '',
    role: '',
    interestType: '',
    selectedDate: '',
    aboutMe: '',
  });

  const availableDates = ['Saturday Feb 7th', 'Sunday Feb 8th'];

  const updateForm = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulating a brief "processing" animation for effect
    setTimeout(() => {
      setIsSubmitting(false);
      onFinish(); // This triggers code generation in App.tsx
    }, 800);
  };

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-10 px-4">
      {[1, 2, 3, 4].map(i => (
        <React.Fragment key={i}>
          <div className={`flex flex-col items-center gap-2 relative z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              step >= i ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
              {step > i ? <CheckCircle size={18} /> : i}
            </div>
          </div>
          {i < 4 && (
            <div className={`flex-grow h-0.5 mx-1 md:mx-2 rounded-full transition-all duration-300 ${
              step > i ? 'bg-pink-600' : 'bg-slate-800'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-700 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl">
      {renderProgress()}

      <div className="min-h-[420px]">
        {step === 1 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <CheckCircle className="text-green-500" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Eligibility & Consent</h3>
                <p className="text-slate-400 text-sm">25+ Private Gathering Verification.</p>
              </div>
            </div>
            
            <div className="space-y-6 mt-8">
              <label className="flex items-start gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                <input type="checkbox" checked={formData.ageVerified} onChange={(e) => updateForm({ ageVerified: e.target.checked })} className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900 text-pink-600 focus:ring-pink-500" />
                <div>
                  <span className="font-semibold text-white block">I am 25 years of age or older</span>
                  <p className="text-slate-400 text-sm mt-1">Government ID (25+) will be validated at the venue.</p>
                </div>
              </label>
              <label className="flex items-start gap-4 p-5 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all">
                <input type="checkbox" checked={formData.agreedToConduct} onChange={(e) => updateForm({ agreedToConduct: e.target.checked })} className="mt-1 w-5 h-5 rounded border-slate-700 bg-slate-900 text-pink-600 focus:ring-pink-500" />
                <div>
                  <span className="font-semibold text-white block">I agree to the code of conduct</span>
                  <p className="text-slate-400 text-sm mt-1">Mutual consent and privacy are absolute requirements.</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <User className="text-blue-500" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Identification</h3>
                <p className="text-slate-400 text-sm">Discreet host verification.</p>
              </div>
            </div>

            <div className="space-y-4 mt-8">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Alias / Handle</label>
                <input type="text" value={formData.name} onChange={(e) => updateForm({ name: e.target.value })} placeholder="How should we call you?" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Secure Email</label>
                <input type="email" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} placeholder="contact@example.com" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Phone Number (Optional)</label>
                <input type="tel" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} placeholder="+1 (555) 000-0000" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <PencilLine className="text-purple-500" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Describe Your Fun</h3>
                <p className="text-slate-400 text-sm">What are you looking for? (e.g. Pegging, etc.)</p>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">About Me / Interests</label>
                <textarea 
                  value={formData.aboutMe} 
                  onChange={(e) => updateForm({ aboutMe: e.target.value })} 
                  placeholder="Describe your interests, kinks, or what makes you a great guest. Be as specific as you like (e.g. 'I love pegging', 'Strictly social', etc.)"
                  className="w-full h-24 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all resize-none text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">Arrival Options (Strict)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableDates.map(date => (
                    <button 
                      key={date} 
                      onClick={() => updateForm({ selectedDate: date })} 
                      className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${formData.selectedDate === date ? 'bg-purple-600 border-purple-600 text-white' : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Role</label>
                    <div className="grid grid-cols-1 gap-2">
                      {['Top', 'Bottom', 'Switch/Vers'].map(r => (
                        <button key={r} onClick={() => updateForm({ role: r as any })} className={`py-2 rounded-lg border text-xs font-bold transition-all ${formData.role === r ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}>{r}</button>
                      ))}
                    </div>
                 </div>
                 <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Interest</label>
                    <div className="grid grid-cols-1 gap-2">
                      {['Social', 'Explorer', 'Full'].map(i => (
                        <button key={i} onClick={() => updateForm({ interestType: i })} className={`py-2 rounded-lg border text-xs font-bold transition-all ${formData.interestType === i ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-950/50 border-slate-800 text-slate-400'}`}>{i}</button>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right-4 duration-300 py-4 text-center">
            <div className="w-16 h-16 bg-pink-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-pink-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Complete Screening</h3>
            <p className="text-slate-400 text-sm mb-8">Generate your unique invitation code locally.</p>
            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-left space-y-3">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Alias</span>
                <span className="text-slate-200 text-sm font-bold">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Night</span>
                <span className="text-purple-400 text-sm font-bold">{formData.selectedDate || 'Not Selected'}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Fun / Interests</span>
                <span className="text-slate-300 text-xs italic line-clamp-2">{formData.aboutMe || 'No details provided'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-800">
        <button onClick={step === 1 ? onCancel : () => setStep(step - 1)} disabled={isSubmitting} className="w-full sm:w-auto px-6 py-3 text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 font-bold text-sm">
          {step === 1 ? 'Cancel' : <><ArrowLeft size={16} /> Back</>}
        </button>
        <button 
          onClick={handleNext} 
          disabled={isSubmitting || (step === 1 && (!formData.ageVerified || !formData.agreedToConduct)) || (step === 2 && (!formData.name || !formData.email)) || (step === 3 && (!formData.role || !formData.interestType || !formData.selectedDate))} 
          className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${step === 4 ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-600/30' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
        >
          {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Generating...</> : (step === 4 ? 'Generate My Code' : <>Next Step <ArrowRight size={18} /></>)}
        </button>
      </div>
    </div>
  );
};

export default ScreeningForm;
