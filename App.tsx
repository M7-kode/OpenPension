
import React, { useState } from 'react';
import HeroSection from './components/LandingPage';
import DemoSimulation from './components/MindMapCanvas';
import ImpactView from './components/NewsPage';
import ArchitectureView from './components/WelcomeModal';
import AIChatPanel from './components/InfoPanel';
import PilotModal from './components/PilotModal';
import { Layout, Activity, Cpu, BarChart3, MessageSquare, Landmark } from 'lucide-react';
import { ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPilotOpen, setIsPilotOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HeroSection onNavigate={setCurrentView} onOpenPilot={() => setIsPilotOpen(true)} />;
      case 'demo':
        return <DemoSimulation />;
      case 'architecture':
        return <ArchitectureView />;
      case 'impact':
        return <ImpactView />;
      default:
        return <HeroSection onNavigate={setCurrentView} onOpenPilot={() => setIsPilotOpen(true)} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-20 lg:w-64 md:border-r border-slate-800 bg-slate-900/95 backdrop-blur-md flex md:flex-col justify-between z-40 shrink-0">
        <div className="p-4 md:p-6 flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
             <Landmark size={24} />
          </div>
          <span className="hidden lg:block font-bold tracking-tight text-lg">Open<span className="text-cyan-400">Pension</span></span>
        </div>

        <div className="flex md:flex-col gap-1 px-2 md:px-4 py-2 overflow-x-auto md:overflow-visible">
          <NavItem 
             icon={<Layout size={20} />} 
             label="Solution" 
             isActive={currentView === 'home'} 
             onClick={() => setCurrentView('home')} 
          />
          <NavItem 
             icon={<Cpu size={20} />} 
             label="Architecture" 
             isActive={currentView === 'architecture'} 
             onClick={() => setCurrentView('architecture')} 
          />
          <NavItem 
             icon={<Activity size={20} />} 
             label="Démonstration" 
             isActive={currentView === 'demo'} 
             onClick={() => setCurrentView('demo')} 
          />
          <NavItem 
             icon={<BarChart3 size={20} />} 
             label="Impact & Cas" 
             isActive={currentView === 'impact'} 
             onClick={() => setCurrentView('impact')} 
          />
        </div>

        <div className="hidden md:block p-6">
           <button 
             onClick={() => setIsChatOpen(true)}
             className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 p-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:text-white hover:border-indigo-500"
           >
              <MessageSquare size={18} />
              <span className="hidden lg:inline text-sm">Assistant OpenPension</span>
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-slate-900">
         {renderContent()}
      </main>

      {/* Mobile Chat Trigger */}
      <div className="fixed bottom-20 right-4 md:hidden z-50">
        <button 
           onClick={() => setIsChatOpen(!isChatOpen)}
           className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30"
        >
           <MessageSquare size={20} />
        </button>
      </div>

      {/* Modals */}
      <AIChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <PilotModal isOpen={isPilotOpen} onClose={() => setIsPilotOpen(false)} />
    </div>
  );
}

// Subcomponent for Navigation Item
const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group w-full ${
      isActive 
        ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100 border border-transparent'
    }`}
  >
    <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
       {icon}
    </div>
    <span className="font-medium text-sm hidden lg:block">{label}</span>
  </button>
);
