
import React, { useState, useRef, useMemo } from 'react';
import { CheckCircle, User, SlidersHorizontal, ArrowRight, ArrowLeft, Loader2, Camera, X, Image as ImageIcon, Shield, Coffee, Calendar, Heart } from 'lucide-react';
import { FormData } from '../types';

interface ScreeningFormProps {
  onFinish: () => void;
  onCancel: () => void;
}

const ScreeningForm: React.FC<ScreeningFormProps> = ({ onFinish, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadIndex, setActiveUploadIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<FormData>({
    ageVerified: false,
    agreedToConduct: false,
    name: '',
    email: '',
    phone: '',
    role: '',
    interestType: '',
    profilePictures: ['', '', '', ''],
    selectedDate: '',
  });

  // Calculate available Feb dates (Wed, Fri, Sat)
  const availableDates = useMemo(() => {
    const dates = [];
    // February 2025
    for (let day = 1; day <= 28; day++) {
      const date = new Date(2025, 1, day);
      const dayOfWeek = date.getDay(); // 0 Sun, 3 Wed, 5 Fri, 6 Sat
      if ([3, 5, 6].includes(dayOfWeek)) {
        dates.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
      }
    }
    return dates;
  }, []);

  const updateForm = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Secure background submission
    setTimeout(() => {
      setIsSubmitting(false);
      onFinish();
    }, 3000);
  };

  const handleImageClick = (index: number) => {
    setActiveUploadIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeUploadIndex !== null) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPictures = [...formData.profilePictures];
        newPictures[activeUploadIndex] = reader.result as string;
        updateForm({ profilePictures: newPictures });
        setActiveUploadIndex(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newPictures = [...formData.profilePictures];
    newPictures[index] = '';
    updateForm({ profilePictures: newPictures });
  };

  const isImagesStepComplete = formData.profilePictures.every(pic => pic !== '');

  const renderProgress = () => (
    <div className="flex items-center justify-between mb-10 px-4">
      {[1, 2, 3, 4, 5].map(i => (
        <React.Fragment key={i}>
          <div className={`flex flex-col items-center gap-2 relative z-10`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              step >= i ? 'bg-pink-600 border-pink-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}>
              {step > i ? <CheckCircle size={18} /> : i}
            </div>
          </div>
          {i < 5 && (
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
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

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
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Alias</label>
                <input type="text" value={formData.name} onChange={(e) => updateForm({ name: e.target.value })} placeholder="How should the host address you?" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => updateForm({ email: e.target.value })} placeholder="contact@example.com" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Secure Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => updateForm({ phone: e.target.value })} placeholder="+1 (555) 000-0000" className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-pink-500/10 rounded-xl">
                <Camera className="text-pink-500" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Visual Verification</h3>
                <p className="text-slate-400 text-sm">Upload 4 recent photos for host review.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {formData.profilePictures.map((pic, index) => (
                <div key={index} onClick={() => handleImageClick(index)} className={`aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative group ${pic ? 'border-pink-500/50 bg-slate-900' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900'}`}>
                  {pic ? (
                    <>
                      <img src={pic} className="w-full h-full object-cover" />
                      <button onClick={(e) => removeImage(index, e)} className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="text-slate-700 mb-2" size={28} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Photo {index + 1}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Calendar className="text-purple-500" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Event Preferences</h3>
                <p className="text-slate-400 text-sm">Select your February night & dynamic.</p>
              </div>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">February Sessions (Wed, Fri, Sat)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableDates.map(date => (
                    <button key={date} onClick={() => updateForm({ selectedDate: date })} className={`px-2 py-3 rounded-lg border text-[10px] font-bold transition-all ${formData.selectedDate === date ? 'bg-purple-600 border-purple-600 text-white' : 'bg-slate-950/50 border-slate-800 text-slate-500 hover:border-slate-700'}`}>
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10 space-y-3">
                <div className="flex items-center gap-3">
                  <Coffee className="text-pink-400" size={18} />
                  <span className="text-white font-bold text-xs uppercase tracking-wider">Premium Refreshments</span>
                </div>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  Hot towels, gourmet snacks, and chilled soda are provided. Complimentary condoms are available at all stations. 
                  <span className="text-pink-400 block mt-1 font-bold italic">BYOT: Personal toys are permitted and encouraged.</span>
                </p>
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

        {step === 5 && (
          <div className="animate-in slide-in-from-right-4 duration-300 py-4 text-center">
            <div className="w-16 h-16 bg-pink-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="text-pink-400" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Secure Review</h3>
            <p className="text-slate-400 text-sm mb-8">Review your Alias and preferences before secure transmission.</p>
            <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800 text-left space-y-3">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Alias</span>
                <span className="text-slate-200 text-sm font-bold">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Selected Date</span>
                <span className="text-purple-400 text-sm font-bold">{formData.selectedDate || 'Not Selected'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Dynamics</span>
                <span className="text-pink-400 text-sm font-bold">{formData.role} / {formData.interestType}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-2">
                {formData.profilePictures.map((pic, i) => (
                   pic ? <img key={i} src={pic} className="w-full aspect-square object-cover rounded-lg border border-slate-800 grayscale" alt="Verification" /> : <div key={i} className="w-full aspect-square bg-slate-900 rounded-lg border border-slate-800"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-800">
        <button onClick={step === 1 ? onCancel : () => setStep(step - 1)} disabled={isSubmitting} className="w-full sm:w-auto px-6 py-3 text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 font-bold text-sm">
          {step === 1 ? 'Discard' : <><ArrowLeft size={16} /> Back</>}
        </button>
        <button onClick={handleNext} disabled={isSubmitting || (step === 1 && (!formData.ageVerified || !formData.agreedToConduct)) || (step === 2 && (!formData.name || !formData.email)) || (step === 3 && !isImagesStepComplete) || (step === 4 && (!formData.role || !formData.interestType || !formData.selectedDate))} className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${step === 5 ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-xl shadow-pink-600/30' : 'bg-white text-slate-950 hover:bg-slate-200'}`}>
          {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Transmitting to Secure Host...</> : (step === 5 ? 'Send for Approval' : <>Continue <ArrowRight size={18} /></>)}
        </button>
      </div>
    </div>
  );
};

export default ScreeningForm;
