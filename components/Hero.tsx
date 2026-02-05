
import React from 'react';
import { Shield, Lock, UserCheck, ChevronRight, Coffee, Heart } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onViewRules: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onViewRules }) => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Penthouse Background Overlay */}
      <div className="absolute inset-0 -z-20 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1600607687940-47a04f6e3773?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Penthouse" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-600 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-800 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-700 rounded-full px-4 py-1.5 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000 backdrop-blur-md">
          <Shield size={16} className="text-pink-400" />
          <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">Safe • Private • Secure</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
          Private Invitation <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Elite Orgy Party</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-6 leading-relaxed animate-in fade-in duration-1000 delay-200">
          Apply for exclusive access to our private, curated orgy gatherings. 
          A premium 25+ environment for discerning adults.
        </p>
        
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4 animate-in fade-in delay-300">
           <div className="flex items-center gap-2 text-pink-300 bg-pink-500/10 px-4 py-2 rounded-lg border border-pink-500/20">
             <Coffee size={18} />
             <span className="text-sm font-medium">Hot Towels & Chilled Soda</span>
           </div>
           <div className="flex items-center gap-2 text-purple-300 bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20">
             <Heart size={18} />
             <span className="text-sm font-medium">Condoms & BYOT Policy</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-10 py-5 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2 group"
          >
            Start Application
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={onViewRules}
            className="w-full sm:w-auto px-10 py-5 bg-slate-900/80 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 backdrop-blur-md"
          >
            <Lock size={18} className="text-slate-400" />
            View Event Rules
          </button>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-slate-500 animate-in fade-in duration-1000 delay-500">
          <div className="flex flex-col items-center gap-2">
            <UserCheck size={28} className="text-pink-400/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">25+ Verified Only</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={28} className="text-pink-400/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Encrypted Data</span>
          </div>
          <div className="hidden md:flex flex-col items-center gap-2">
            <Lock size={28} className="text-pink-400/60" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Full Privacy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
