
import React, { useState, useEffect, useRef } from 'react';
import { TransactionLog } from '../types';
import { Terminal, Play, CheckCircle2, Loader2, ArrowRightLeft, RefreshCw, Smartphone, Banknote, ShieldCheck, Download, Lock, Server, Wifi, WifiOff } from 'lucide-react';
import AdminDashboard from './AdminDashboard';

const DemoSimulation: React.FC = () => {
  // View Mode: 'terminal' (Simulation) or 'admin' (Dashboard)
  const [viewMode, setViewMode] = useState<'terminal' | 'admin'>('terminal');
  
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // User Inputs - Benin Default
  const [phoneNumber, setPhoneNumber] = useState('22997000000');
  const [amount, setAmount] = useState('25000');
  
  // Simulation State
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationFinished, setSimulationFinished] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [logs, setLogs] = useState<TransactionLog[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [stepDescription, setStepDescription] = useState<string>("En attente de saisie...");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Backend Connection State
  const [useRealBackend, setUseRealBackend] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Auto scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Check Backend Connection when toggled (Port 3005 for Node Middleware)
  useEffect(() => {
    if (useRealBackend) {
        setBackendStatus('connecting');
        fetch('http://localhost:3005/', { method: 'GET' })
            .then(() => setBackendStatus('connected'))
            .catch(() => {
                setBackendStatus('disconnected'); 
            });
    } else {
        setBackendStatus('disconnected');
    }
  }, [useRealBackend]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationFinished(false);
    setShowReceipt(false);
    setLogs([]);
    setActiveStep(0);
    setStepDescription("Prêt pour une nouvelle transaction.");
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
        setIsLoggingIn(false);
        setIsAdminLoggedIn(true);
    }, 1500);
  };

  const handleLogout = () => {
      setIsAdminLoggedIn(false);
      setViewMode('terminal');
  };

  const runSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSimulating) return;
    
    setIsSimulating(true);
    setSimulationFinished(false);
    setShowReceipt(false);
    setLogs([]);
    setActiveStep(0);
    setStepDescription("Initialisation du paiement...");

    if (useRealBackend) {
        // --- REAL BACKEND MODE (Via Node Middleware Port 3005) ---
        try {
            setStepDescription("Communication avec le Backend (localhost:3005)...");
            
            const response = await fetch('http://localhost:3005/transfer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    to: phoneNumber,
                    from: '22900000000',
                    amount: amount,
                    currency: 'XOF'
                })
            });
            
            if (!response.ok) throw new Error("Erreur HTTP Backend: " + response.status);

            const data = await response.json();

            setLogs(prev => [...prev, {
                id: Date.now().toString(),
                timestamp: new Date().toLocaleTimeString(),
                step: 'TRANSFER',
                status: 'PENDING',
                details: 'Requête transmise au SDK Mojaloop',
                payload: JSON.stringify(data)
            }]);

            if (data.status === 'SUCCESS') {
                 setStepDescription("Transaction acceptée par le Hub Mojaloop.");
                 setTimeout(() => {
                    setLogs(prev => [...prev, {
                        id: Date.now().toString(),
                        timestamp: new Date().toLocaleTimeString(),
                        step: 'TRANSFER',
                        status: 'SUCCESS',
                        details: 'Succès confirmé',
                        payload: '{"state": "COMPLETED"}'
                    }]);
                    setIsSimulating(false);
                    setSimulationFinished(true);
                    setActiveStep(4);
                    setStepDescription("Transaction validée et compensée.");
                    setTimeout(() => setShowReceipt(true), 1000);
                 }, 1500);
            } else {
                throw new Error(data.error || "Erreur inconnue du SDK");
            }

        } catch (error: any) {
            setStepDescription("Erreur : Echec de la transaction réelle.");
            setLogs(prev => [...prev, {
                id: Date.now().toString(),
                timestamp: new Date().toLocaleTimeString(),
                step: 'TRANSFER',
                status: 'ERROR',
                details: 'Connection Failure',
                payload: error.message || 'Vérifiez que "node server.js" tourne sur le port 3005.'
            }]);
            setIsSimulating(false);
            setBackendStatus('disconnected');
        }

    } else {
        // --- SIMULATION MODE ---
        const sequence = [
        {
            delay: 800,
            step: 1,
            desc: `PHASE 1 : IDENTIFICATION. Recherche du propriétaire du numéro ${phoneNumber} via endpoint /participants.`,
            log: {
            step: 'LOOKUP',
            status: 'PENDING',
            details: `GET /participants/MSISDN/${phoneNumber}`,
            payload: 'Header: { Accept: application/vnd.interoperability.participants+json;version=1.1 }'
            }
        },
        {
            delay: 2500,
            step: 1,
            desc: "RÉSULTAT : Le numéro est identifié sur le réseau 'MTN Benin'. Clés cryptographiques échangées.",
            log: {
            step: 'LOOKUP',
            status: 'SUCCESS',
            details: 'Response: 200 OK',
            payload: `{ "fspId": "mtn-benin", "currency": "XOF", "partyName": "Citoyen Béninois" }`
            }
        },
        {
            delay: 4500,
            step: 2,
            desc: `PHASE 2 : ACCORD. Demande de cotation (Devis) pour ${parseInt(amount).toLocaleString()} XOF.`,
            log: {
            step: 'QUOTE',
            status: 'PENDING',
            details: 'POST /quotes',
            payload: `{ "amountType": "SEND", "amount": { "currency": "XOF", "amount": "${amount}" }, "payer": "tresor-benin", "payee": "mtn-benin" }`
            }
        },
        {
            delay: 6500,
            step: 2,
            desc: "VALIDATION : MTN Benin signe les conditions (JWS). Frais de transaction: 0 XOF (Subventionnés).",
            log: {
            step: 'QUOTE',
            status: 'SUCCESS',
            details: 'Response: 200 OK (Signed JWS)',
            payload: `{ "transferAmount": "${amount}", "payeeFspFee": "0", "condition": "Z7s... (CryptoCondition)" }`
            }
        },
        {
            delay: 8500,
            step: 3,
            desc: "PHASE 3 : TRANSFERT. Verrouillage des fonds à la Banque Centrale (ILP Prepare).",
            log: {
            step: 'TRANSFER',
            status: 'PENDING',
            details: 'POST /transfers (ILP Prepare)',
            payload: `{ "transferId": "uuid-${Date.now()}", "amount": "${amount}", "expiration": "${new Date(Date.now() + 60000).toISOString()}" }`
            }
        },
        {
            delay: 11000,
            step: 4, 
            desc: "SUCCÈS : Preuve cryptographique reçue (Fulfill). Le retraité reçoit son SMS de confirmation instantanément.",
            log: {
            step: 'TRANSFER',
            status: 'SUCCESS',
            details: 'Response: 200 OK (ILP Fulfill)',
            payload: '{ "transferState": "COMMITTED", "fulfillment": "X9y... (Proof)", "completedTimestamp": "NOW" }'
            }
        }
        ];

        sequence.forEach(({ delay, log, step, desc }) => {
        setTimeout(() => {
            setLogs(prev => [...prev, { ...log, id: Math.random().toString(), timestamp: new Date().toLocaleTimeString() } as TransactionLog]);
            if(step > activeStep) {
                setActiveStep(step);
                setStepDescription(desc);
            }
            if (delay === 11000) {
                setIsSimulating(false);
                setSimulationFinished(true);
                setTimeout(() => setShowReceipt(true), 500); 
            }
        }, delay);
        });
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-slate-900 pb-20 relative">
      
      {/* RECEIPT MODAL */}
      {showReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-white text-slate-900 w-full max-w-sm rounded-2xl shadow-2xl p-8 relative transform scale-100 transition-all">
                <button onClick={() => setShowReceipt(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                  <RefreshCw className="rotate-45" size={20}/>
                </button>
                <div className="border-b-2 border-slate-100 pb-6 mb-6 text-center">
                    <div className="flex justify-center mb-4">
                       <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                          <CheckCircle2 size={32} />
                       </div>
                    </div>
                    <h3 className="font-bold text-2xl uppercase tracking-wide text-slate-900">Paiement Réussi</h3>
                    <p className="text-sm text-slate-500 uppercase mt-2 font-semibold">Trésor Public - République du Bénin</p>
                </div>
                <div className="space-y-4 mb-8 font-mono text-sm bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-2">
                        <span className="text-slate-500 text-xs uppercase">Montant Versé</span>
                        <span className="font-bold text-xl text-emerald-600">{parseInt(amount).toLocaleString()} XOF</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Bénéficiaire</span>
                        <span className="font-bold">{phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Opérateur</span>
                        <span className="font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span> MTN Benin
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowReceipt(false)} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-600 transition-colors">Fermer</button>
                    <button className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-colors"><Download size={18} /> PDF</button>
                </div>
            </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-20">
        
        {/* Header Tabs */}
        <div className="mb-8 border-b border-slate-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400 text-xs font-bold mb-3 border border-cyan-500/20">
                <ShieldCheck size={14} /> PLATEFORME OPEN PENSION
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {viewMode === 'terminal' ? 'Terminal de Paiement G2P' : 'Espace Trésor Public'}
              </h2>
              <p className="text-slate-400 max-w-xl">
                {viewMode === 'terminal' ? 'Simulez un virement de pension depuis le Trésor vers un abonné mobile.' : 'Portail sécurisé de gestion des flux financiers.'}
              </p>
            </div>
            
            <div className="flex p-1 bg-slate-800 rounded-xl border border-slate-700">
               <button onClick={() => setViewMode('terminal')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'terminal' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                 <Smartphone size={16} /> Démo Publique
               </button>
               <button onClick={() => setViewMode('admin')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${viewMode === 'admin' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}>
                 <Lock size={16} /> Espace Client
               </button>
            </div>
          </div>
        </div>

        {viewMode === 'terminal' ? (
          /* ==================== TERMINAL VIEW ==================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 relative">
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
                      <h3 className="font-bold text-white flex items-center gap-2"><Terminal size={20} className="text-cyan-400" /> Nouvelle Allocation</h3>
                      <button onClick={() => setUseRealBackend(!useRealBackend)} className={`text-[10px] uppercase font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors border ${useRealBackend ? 'bg-indigo-900/50 text-indigo-300 border-indigo-500/50' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
                         <Server size={10} /> {useRealBackend ? 'Mode Réel' : 'Mode Simu'}
                      </button>
                  </div>
                  <form onSubmit={runSimulation} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Identifiant Bénéficiaire (Tel)</label>
                        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={isSimulating} className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Montant (XOF)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} disabled={isSimulating} className="w-full bg-slate-900 border border-slate-600 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none font-mono" />
                    </div>
                    {!isSimulating && !simulationFinished ? (
                        <button type="submit" disabled={useRealBackend && backendStatus !== 'connected'} className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg transition-all ${useRealBackend && backendStatus !== 'connected' ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500'}`}>
                          <Play fill="currentColor" size={18} /> {useRealBackend ? 'Envoyer au Hub' : 'Exécuter le Paiement'}
                        </button>
                    ) : isSimulating ? (
                        <button disabled className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600"><Loader2 className="animate-spin" size={18} /> Traitement en cours...</button>
                    ) : (
                        <button type="button" onClick={resetSimulation} className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 transition-all"><RefreshCw size={18} /> Nouvelle Transaction</button>
                    )}
                  </form>
                  <div className="mt-6 pt-6 border-t border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-500 uppercase">État du Système</span>
                        <div className="flex items-center gap-2">
                            {useRealBackend && (
                                <span className={`text-[10px] flex items-center gap-1 ${backendStatus === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
                                    {backendStatus === 'connected' ? <Wifi size={10} /> : <WifiOff size={10} />}
                                    {backendStatus === 'connected' ? 'Online' : 'Offline'}
                                </span>
                            )}
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${isSimulating ? 'bg-yellow-900/50 text-yellow-500' : simulationFinished ? 'bg-emerald-900/50 text-emerald-500' : 'bg-slate-700 text-slate-400'}`}>
                                {isSimulating ? 'PROCESSING' : simulationFinished ? 'COMPLETED' : 'IDLE'}
                            </span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-cyan-400 transition-all duration-300" style={{ width: `${(activeStep / 4) * 100}%` }}></div>
                      </div>
                  </div>
              </div>
            </div>
            
            {/* Right: Visualization & Logs */}
            <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden min-h-[300px] flex flex-col justify-between shadow-2xl">
                  <div className="flex justify-between items-center relative z-10 py-6 px-4 md:px-12">
                      <ActorNode label="TRÉSOR PUBLIC" sub="Système ERP" active={true} icon="gov" />
                      <div className="flex-1 mx-6 flex flex-col items-center justify-center relative">
                          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-700 -z-10 -translate-y-4">
                              <div className={`h-full bg-cyan-500 transition-all duration-500 ease-linear ${activeStep === 0 ? 'w-0' : activeStep === 1 ? 'w-1/3' : activeStep === 2 ? 'w-2/3' : 'w-full'}`}></div>
                          </div>
                          <div className={`w-14 h-14 rounded-full border-4 border-slate-800 bg-slate-900 flex items-center justify-center z-20 transition-all duration-300 ${activeStep > 0 ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-110' : 'border-slate-600'}`}>
                              <ArrowRightLeft className={`${activeStep > 0 ? 'text-cyan-400 animate-spin-slow' : 'text-slate-600'}`} size={20} />
                          </div>
                      </div>
                      <ActorNode label="BÉNÉFICIAIRE" sub={activeStep >= 1 ? "MTN Benin" : "Recherche..."} active={activeStep >= 2} icon="user" />
                  </div>
                  <div className="mt-auto bg-slate-900/90 backdrop-blur border border-slate-600 p-4 rounded-xl flex items-center gap-4 transition-all">
                      <div className="p-3 bg-cyan-500/10 rounded-full text-cyan-400 shrink-0 border border-cyan-500/20">
                          {activeStep === 0 && <Play size={20} />}
                          {activeStep === 1 && <RefreshCw size={20} className="animate-spin" />}
                          {activeStep >= 2 && <CheckCircle2 size={20} />}
                      </div>
                      <div className="flex-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Statut Transaction</span>
                          <p className="text-slate-200 text-sm font-medium">{stepDescription}</p>
                      </div>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 flex flex-col flex-1 overflow-hidden font-mono text-xs shadow-inner min-h-[300px]">
                    <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-wider text-[10px]"><Terminal size={12} /> Live API Trace</div>
                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div></div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
                        {logs.map((log) => (
                          <div key={log.id} className="group">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${log.step === 'LOOKUP' ? 'bg-blue-900 text-blue-300' : log.step === 'QUOTE' ? 'bg-yellow-900 text-yellow-300' : log.step === 'TRANSFER' ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}`}>{log.step}</span>
                                <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                            </div>
                            <div className="text-slate-300 font-bold mb-1 pl-1 border-l-2 border-slate-700">{log.details}</div>
                            <div className="text-slate-500 break-all bg-black/40 p-2 rounded border border-transparent group-hover:border-slate-800 transition-colors font-mono text-[10px]">{log.payload}</div>
                          </div>
                        ))}
                        <div ref={logsEndRef} />
                    </div>
                </div>
            </div>
          </div>
        ) : (
          /* ==================== ADMIN VIEW ==================== */
          <div className="animate-fade-in min-h-[600px] relative">
            {!isAdminLoggedIn ? (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-indigo-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 text-indigo-400"><Lock size={32} /></div>
                            <h3 className="text-2xl font-bold text-white">Portail Institutionnel</h3>
                            <p className="text-slate-400 text-sm mt-2">Accès sécurisé pour les agents du Trésor Public.</p>
                        </div>
                        <form onSubmit={handleAdminLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Identifiant Agent</label>
                                <input readOnly value="tresor_public_admin" type="text" className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Code d'accès</label>
                                <input type="password" value="********" readOnly className="w-full bg-slate-900 border border-slate-600 rounded-lg py-3 px-4 text-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <button disabled={isLoggingIn} type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                                {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : <div className="flex items-center gap-2"><Lock size={16} /> Accéder à l'espace</div>}
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <AdminDashboard onLogout={handleLogout} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Node for Visual
const ActorNode = ({ label, sub, active, icon }: any) => (
  <div className={`flex flex-col items-center transition-all duration-500 z-20 ${active ? 'opacity-100 scale-105' : 'opacity-50 grayscale'}`}>
     <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mb-3 shadow-xl relative ${active ? 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white ring-4 ring-indigo-500/20' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>
        {icon === 'gov' ? <Banknote size={28} /> : <Smartphone size={28} />}
        {active && <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>}
     </div>
     <span className="font-bold text-white text-xs md:text-sm tracking-tight">{label}</span>
     <span className="text-[10px] md:text-xs text-slate-400 font-mono bg-slate-900/50 px-2 py-0.5 rounded mt-1">{sub}</span>
  </div>
);

export default DemoSimulation;
