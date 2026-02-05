
import React from 'react';
import { Shield, Lock, Info } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-indigo-500" size={24} />
              <span className="text-xl font-bold text-white tracking-tight italic uppercase tracking-tighter">Private Elite</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              An exclusive platform dedicated to safe, vetted, and high-end orgy experiences. We prioritize privacy and mutual respect above all else.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Lock size={16} className="text-indigo-400" />
              Security
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Screening Protocols</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Data Retention</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Info size={16} className="text-indigo-400" />
              Resources
            </h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Event Rules</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Help & Support</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact Host</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Private Elite Orgy Screening. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <span className="px-3 py-1 bg-slate-900 text-slate-500 rounded text-[10px] font-bold uppercase tracking-widest border border-slate-800">
              Strictly 25+ Only
             </span>
             <span className="px-3 py-1 bg-slate-900 text-slate-500 rounded text-[10px] font-bold uppercase tracking-widest border border-slate-800">
              End-to-End Encrypted
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
