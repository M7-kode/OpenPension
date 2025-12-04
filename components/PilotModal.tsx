
import React, { useState } from 'react';
import { X, Building2, User, Mail, Send, CheckCircle, ArrowRight } from 'lucide-react';

interface PilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PilotModal: React.FC<PilotModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Dans une vraie app, on enverrait les données au backend ici
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl relative overflow-hidden transition-all duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center animate-fade-in">
            <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/20 relative z-10">
                   <CheckCircle size={40} className="drop-shadow-lg" />
                </div>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Demande Reçue !</h3>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-sm mx-auto">
              Nos experts techniques vont analyser votre demande. Vous recevrez le kit de démarrage POC sous <span className="text-emerald-400 font-bold">24h</span>.
            </p>
            
            <button 
              onClick={onClose}
              className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl text-white font-bold transition-all border border-slate-600 hover:border-slate-500"
            >
              Retour à la plateforme
            </button>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-indigo-900/50 to-slate-800">
              <div className="flex items-center gap-3 mb-1">
                 <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Building2 className="text-indigo-400" size={20} />
                 </div>
                 <h3 className="text-xl font-bold text-white">Lancer un Projet Pilote</h3>
              </div>
              <p className="text-sm text-slate-400 ml-12">
                Configurez votre environnement de test Mojaloop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Institution / Ministère</label>
                <div className="relative group">
                   <Building2 className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                   <input required type="text" placeholder="Ex: Trésor Public Bénin" className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nom du Contact</label>
                  <div className="relative group">
                     <User className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                     <input required type="text" placeholder="Nom complet" className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Pro</label>
                  <div className="relative group">
                     <Mail className="absolute left-3 top-3 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                     <input required type="email" placeholder="contact@gouv.bj" className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />
                  </div>
                </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Cas d'Usage Cible</label>
                 <div className="relative">
                    <select className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none appearance-none transition-all">
                        <option>Pensions de Retraite (G2P)</option>
                        <option>Bourses Étudiantes</option>
                        <option>Salaires Fonctionnaires</option>
                        <option>Aides Sociales d'Urgence</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <ArrowRight size={14} className="rotate-90" />
                    </div>
                 </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20 hover:scale-[1.02]">
                   <Send size={18} />
                   Soumettre la Demande
                </button>
              </div>
              
              <p className="text-xs text-center text-slate-500">
                 En soumettant ce formulaire, vous acceptez d'être contacté pour la mise en place technique.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PilotModal;
