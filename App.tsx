
import React, { useState } from 'react';
import { AppState, FormData } from './types';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import VenuePreview from './components/VenuePreview';
import ScreeningForm from './components/ScreeningForm';
import InviteCodeCard from './components/InviteCodeCard';
import FinalConfirmation from './components/FinalConfirmation';
import Footer from './components/Footer';
import RulesModal from './components/RulesModal';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  
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

  const generateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'WHIP-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInviteCode(code);
    setAppState(AppState.RESULT);
  };

  const handleStartApplication = () => {
    setAppState(AppState.SCREENING);
  };

  const handleApplyFinish = () => {
    generateCode();
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-pink-500/30 bg-[#020617]">
      <main className="flex-grow">
        {appState === AppState.LANDING && (
          <div className="animate-in fade-in duration-700">
            <Hero 
              onStart={handleStartApplication} 
              onViewRules={() => setIsRulesOpen(true)} 
            />
            <HowItWorks />
            <VenuePreview />
          </div>
        )}

        {appState === AppState.SCREENING && (
          <div className="py-12 px-4 animate-in slide-in-from-bottom-4 duration-500">
            <ScreeningForm 
              onFinish={handleApplyFinish} 
              onCancel={() => setAppState(AppState.LANDING)}
            />
          </div>
        )}

        {appState === AppState.RESULT && (
          <div className="py-20 px-4 animate-in zoom-in-95 duration-500">
            <InviteCodeCard 
              code={inviteCode} 
              onNext={() => setAppState(AppState.FINAL)} 
            />
          </div>
        )}

        {appState === AppState.FINAL && (
          <div className="py-20 px-4 animate-in zoom-in-105 duration-700">
            <FinalConfirmation inviteCode={inviteCode} />
          </div>
        )}
      </main>

      <Footer />

      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
};

export default App;
