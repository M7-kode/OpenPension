
import React from 'react';
import { Network, Server, Lock, ArrowRight, Database, FileJson, Activity } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-slate-900 text-white pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="inline-flex items-center gap-2 text-cyan-400 mb-4 font-mono text-sm">
              <Network size={16} />
              ARCHITECTURE MOJALOOP V2.0
           </div>
           <h1 className="text-3xl md:text-5xl font-bold mb-6">Le Moteur de l'Interopérabilité</h1>
           <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
             Une orchestration précise basée sur 4 endpoints majeurs pour garantir la sécurité des fonds publics du <span className="text-white">Trésor Béninois</span> vers les citoyens.
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        
        {/* API Endpoints Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
           
           <div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                 <Server className="text-cyan-400" />
                 Workflow des Endpoints
              </h2>
              
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-slate-800">
                 
                 {/* Endpoint 1 */}
                 <div className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-blue-500 flex items-center justify-center text-blue-500 font-bold text-xs z-10">1</div>
                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 group-hover:border-blue-500/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-white">Identification</h4>
                           <code className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded font-mono">GET /participants</code>
                        </div>
                        <p className="text-sm text-slate-400">Le Switch interroge le registre central pour localiser le DFSP (MTN, Moov, Banque) détenant le compte du retraité via son numéro (+229...).</p>
                    </div>
                 </div>

                 {/* Endpoint 2 */}
                 <div className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-yellow-500 flex items-center justify-center text-yellow-500 font-bold text-xs z-10">2</div>
                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 group-hover:border-yellow-500/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-white">Devis & Accord</h4>
                           <code className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded font-mono">POST /quotes</code>
                        </div>
                        <p className="text-sm text-slate-400">Calcul des frais (souvent 0 pour G2P) et validation cryptographique des conditions avant tout transfert.</p>
                    </div>
                 </div>

                 {/* Endpoint 3 */}
                 <div className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold text-xs z-10">3</div>
                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 group-hover:border-emerald-500/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-white">Transfert</h4>
                           <code className="text-xs bg-emerald-900/30 text-emerald-300 px-2 py-1 rounded font-mono">POST /transfers</code>
                        </div>
                        <p className="text-sm text-slate-400">Exécution en deux phases (Prepare/Fulfill) via ILP. Garantit que les fonds ne sont jamais perdus, même en cas de coupure réseau.</p>
                    </div>
                 </div>

                 {/* Endpoint 4 */}
                 <div className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center text-purple-500 font-bold text-xs z-10">4</div>
                    <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 group-hover:border-purple-500/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                           <h4 className="font-bold text-white">Audit & Reporting</h4>
                           <code className="text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded font-mono">GET /transactions</code>
                        </div>
                        <p className="text-sm text-slate-400">Récupération des détails de la transaction pour le tableau de bord administratif et la réconciliation financière.</p>
                    </div>
                 </div>

              </div>
           </div>

           {/* Interactive Visual (Stylized) */}
           <div className="sticky top-24">
              <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]"></div>
                  
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                     <Lock className="text-emerald-400" /> Sécurité & Standards
                  </h3>

                  <div className="space-y-6 relative z-10">
                     <div className="flex gap-4 items-start">
                        <div className="p-2 bg-slate-800 rounded-lg text-cyan-400"><FileJson size={20} /></div>
                        <div>
                           <h5 className="font-bold text-sm">Signature JWS</h5>
                           <p className="text-xs text-slate-400 mt-1">Non-répudiation des échanges JSON.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <div className="p-2 bg-slate-800 rounded-lg text-cyan-400"><Network size={20} /></div>
                        <div>
                           <h5 className="font-bold text-sm">ISO 20022</h5>
                           <p className="text-xs text-slate-400 mt-1">Dictionnaire de données standardisé pour la finance.</p>
                        </div>
                     </div>
                     <div className="flex gap-4 items-start">
                        <div className="p-2 bg-slate-800 rounded-lg text-cyan-400"><Activity size={20} /></div>
                        <div>
                           <h5 className="font-bold text-sm">Haute Disponibilité</h5>
                           <p className="text-xs text-slate-400 mt-1">Architecture Kubernetes scalable horizontalement.</p>
                        </div>
                     </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-700/50">
                      <div className="text-xs font-mono text-slate-500 mb-2">PARTENAIRES INTÉGRABLES</div>
                      <div className="flex gap-3 grayscale opacity-60">
                          <span className="bg-slate-800 px-2 py-1 rounded text-xs font-bold">MTN</span>
                          <span className="bg-slate-800 px-2 py-1 rounded text-xs font-bold">MOOV</span>
                          <span className="bg-slate-800 px-2 py-1 rounded text-xs font-bold">CELTIS</span>
                          <span className="bg-slate-800 px-2 py-1 rounded text-xs font-bold">UBA</span>
                      </div>
                  </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
