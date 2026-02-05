
import React from 'react';
import { UserCheck, ClipboardList, KeyRound, CreditCard } from 'lucide-react';

const steps = [
  {
    title: 'Verify Eligibility',
    desc: 'Confirm you are 25+ and agree to our community standards and code of conduct.',
    icon: UserCheck,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    title: 'Screening Form',
    desc: 'Complete a brief application including basic information and your dynamics.',
    icon: ClipboardList,
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10'
  },
  {
    title: 'Receive Invite Code',
    desc: 'If approved, you will receive a unique invitation code to present for entry validation.',
    icon: KeyRound,
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    title: 'Confirm with Deposit',
    desc: 'Secure your spot with a refundable deposit that covers damages, refreshments and venue security.',
    icon: CreditCard,
    color: 'text-pink-400',
    bg: 'bg-pink-400/10'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">The Process</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Our vetted screening ensures a safe, consensual, and exclusive atmosphere for all participants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800 transition-all hover:bg-slate-900 hover:border-slate-700 hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-xl ${step.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                <step.icon className={step.color} size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 text-sm font-mono">0{idx + 1}.</span>
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
