
import React from 'react';
import { ArrowRight, ShieldCheck, Globe2, Users, ChevronDown, CheckCircle2, Mail, ExternalLink, PlayCircle } from 'lucide-react';
import { ViewState } from '../types';

interface HeroSectionProps {
  onNavigate: (page: ViewState) => void;
  onOpenPilot: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenPilot }) => {
  return (
    <div className="w-full h-full overflow-y-auto bg-slate-900 pb-20 scroll-smooth">
      {/* Hero Banner */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        
        {/* Background Effects */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="z-10 max-w-5xl mx-auto space-y-8 animate-fade-in pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-900/20 text-green-400 text-sm font-mono tracking-wide mb-4">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             CONÇU POUR LE BÉNIN & L'UEMOA
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Digitalisation des Pensions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-500 to-indigo-500">
              pour un Service Public Moderne.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Une plateforme Open Source connectée aux opérateurs locaux (MTN, Moov, Celtis) pour simplifier la vie des retraités béninois. Sécurité, Rapidité, Transparence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button 
              onClick={() => onNavigate('demo')}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_30px_rgba(8,145,178,0.5)]"
            >
              <PlayCircle size={20} />
              Simuler un Paiement
            </button>
            <button 
              onClick={onOpenPilot}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-green-500/50 font-bold rounded-lg transition-all flex items-center gap-2"
            >
              Démarrer un Projet Pilote
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Value Proposition Grid */}
      <section className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">L'Open Source au service du Citoyen</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Notre solution crée un pont numérique souverain entre le Trésor Public et l'écosystème financier local.
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <FeatureCard 
                icon={<Globe2 size={32} />}
                title="Interopérabilité Locale"
                desc="Intégration native avec les API de MTN Mobile Money, Moov Money et le système bancaire béninois."
                color="text-indigo-400"
                bg="bg-indigo-900/20"
              />
              <FeatureCard 
                icon={<ShieldCheck size={32} />}
                title="Conformité & Audit"
                desc="Traçabilité complète via les endpoints /transactions. Lutte contre la fraude et les doublons."
                color="text-emerald-400"
                bg="bg-emerald-900/20"
              />
              <FeatureCard 
                icon={<Users size={32} />}
                title="Inclusion Sociale"
                desc="Suppression des files d'attente. Les pensions arrivent directement dans les villages reculés."
                color="text-cyan-400"
                bg="bg-cyan-900/20"
              />
           </div>

           {/* Ecosystem Logos */}
           <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
              <div className="text-left">
                 <h3 className="text-xl font-bold text-white mb-2">Connecté à l'écosystème</h3>
                 <p className="text-slate-400 text-sm">Compatible avec les acteurs majeurs de la sous-région.</p>
              </div>
              <div className="flex gap-8 items-center flex-wrap justify-center opacity-80 hover:opacity-100 transition-all duration-500">
                 <span className="text-xl font-black text-yellow-500 font-sans tracking-tight">MTN</span>
                 <span className="text-xl font-black text-blue-600 font-sans">moov</span>
                 <span className="text-xl font-bold text-purple-500 font-sans">Celtis</span>
                 <span className="text-xl font-bold text-red-500 font-sans">UBA</span>
                 <div className="h-6 w-px bg-slate-600 mx-2"></div>
                 <span className="text-lg font-mono text-slate-300">mojaloop</span>
              </div>
           </div>

           {/* CTA Section */}
           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-10 md:p-16 text-center border border-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none"></div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Une solution clé en main pour l'État</h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg relative z-10">
                Vous représentez une institution publique ou financière ? Lancez un projet pilote dès aujourd'hui et testez l'intégration en conditions réelles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                 <button onClick={onOpenPilot} className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg">
                    <Mail size={20} />
                    Configurer un Projet Pilote
                 </button>
                 <a href="https://mojaloop.io/documentation/" target="_blank" rel="noreferrer" className="bg-transparent border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                    <ExternalLink size={20} />
                    Documentation Technique
                 </a>
              </div>
           </div>

        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, color, bg }: { icon: React.ReactNode, title: string, desc: string, color: string, bg: string }) => (
  <div className="p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all hover:translate-y-[-4px]">
    <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center mb-6 ${color}`}>
       {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">
       {desc}
    </p>
    <ul className="mt-6 space-y-2">
      <li className="flex items-center gap-2 text-xs text-slate-500">
        <CheckCircle2 size={14} className={color} /> Conforme BCEAO
      </li>
      <li className="flex items-center gap-2 text-xs text-slate-500">
        <CheckCircle2 size={14} className={color} /> Sécurité ISO 27001
      </li>
    </ul>
  </div>
);

export default HeroSection;
