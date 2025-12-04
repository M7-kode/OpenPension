
import React, { useState } from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Info, Wallet, UserCheck, CheckCircle2, TrendingUp, Search, Loader2, UploadCloud, FileSpreadsheet, Play, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { AdminTransaction, BulkBatch } from '../types';

// Mock Data
const DASHBOARD_DATA = [
  { time: '08:00', volume: 120000 },
  { time: '09:00', volume: 450000 },
  { time: '10:00', volume: 980000 },
  { time: '11:00', volume: 1500000 },
  { time: '12:00', volume: 2100000 },
  { time: '13:00', volume: 1800000 },
  { time: '14:00', volume: 2400000 },
];

const RECENT_TRANSACTIONS: AdminTransaction[] = [
  { id: 'TXN-883920', beneficiary: 'Koffi A.', phone: '229 97 20 XX XX', amount: 25000, status: 'COMPLETED', date: '10:42', operator: 'MTN' },
  { id: 'TXN-883921', beneficiary: 'Awa D.', phone: '229 95 45 XX XX', amount: 45000, status: 'COMPLETED', date: '10:45', operator: 'MOOV' },
  { id: 'TXN-883922', beneficiary: 'Jean P.', phone: '229 66 12 XX XX', amount: 25000, status: 'PENDING', date: '10:48', operator: 'CELTIS' },
  { id: 'TXN-883923', beneficiary: 'Marie S.', phone: '229 97 11 XX XX', amount: 25000, status: 'FAILED', date: '10:50', operator: 'MTN' },
  { id: 'TXN-883924', beneficiary: 'Paul K.', phone: '229 90 90 XX XX', amount: 15000, status: 'COMPLETED', date: '10:52', operator: 'UBA' },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bulk'>('overview');
  const [batches, setBatches] = useState<BulkBatch[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Simulation Upload CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      
      // Simuler le parsing et l'upload
      setTimeout(() => {
        const newBatch: BulkBatch = {
          id: `BATCH-${Math.floor(Math.random() * 1000)}`,
          fileName: file.name,
          totalRecords: Math.floor(Math.random() * 500) + 50,
          totalAmount: Math.floor(Math.random() * 10000000) + 1000000,
          status: 'UPLOADED',
          progress: 0
        };
        setBatches(prev => [newBatch, ...prev]);
        setIsUploading(false);
      }, 1500);
    }
  };

  const processBatch = (batchId: string) => {
    setBatches(prev => prev.map(b => b.id === batchId ? { ...b, status: 'PROCESSING', progress: 10 } : b));
    
    // Simulate processing steps
    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      setBatches(prev => prev.map(b => b.id === batchId ? { ...b, progress: Math.min(progress, 100) } : b));
      
      if (progress >= 100) {
        clearInterval(interval);
        setBatches(prev => prev.map(b => b.id === batchId ? { ...b, status: 'COMPLETED' } : b));
      }
    }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px]">
      
      {/* Sidebar Menu */}
      <div className="w-full lg:w-64 bg-slate-800 rounded-2xl border border-slate-700 p-4 flex flex-col h-fit shrink-0">
        <div className="flex items-center gap-3 mb-6 px-2 pb-6 border-b border-slate-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-slate-900">TP</div>
          <div>
            <div className="text-sm font-bold text-white">Trésor Public</div>
            <div className="text-xs text-slate-400">Admin - Bénin</div>
          </div>
        </div>

        <div className="space-y-1 mb-auto">
          <SidebarBtn icon={<LayoutDashboard size={18} />} label="Vue d'ensemble" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarBtn icon={<FileSpreadsheet size={18} />} label="Paiement de Masse" active={activeTab === 'bulk'} onClick={() => setActiveTab('bulk')} />
          <SidebarBtn icon={<Users size={18} />} label="Bénéficiaires" active={false} onClick={() => {}} />
          <SidebarBtn icon={<FileText size={18} />} label="Audit & Rapports" active={false} onClick={() => {}} />
          <SidebarBtn icon={<Settings size={18} />} label="Configuration" active={false} onClick={() => {}} />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <button onClick={onLogout} className="w-full text-left px-4 py-2 rounded-lg text-red-400 hover:bg-red-900/20 font-medium text-xs flex items-center gap-3 transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 animate-fade-in overflow-hidden flex flex-col">
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Guide Box */}
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 shrink-0"><Info size={20} /></div>
              <div>
                <h4 className="font-bold text-white text-sm mb-1">Espace de Supervision</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Suivi de la liquidité Mojaloop et audit des transactions G2P en temps réel.
                </p>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <KPICard title="Total Décaissé" value="2.4 Md FCFA" sub="+12% ce mois" icon={<Wallet size={24} />} color="text-emerald-400" />
              <KPICard title="Bénéficiaires" value="84,200" sub="Actifs aujourd'hui" icon={<UserCheck size={24} />} color="text-blue-400" />
              <KPICard title="Succès Tx" value="99.8%" sub="Temps moyen 2.4s" icon={<CheckCircle2 size={24} />} color="text-cyan-400" />
              <KPICard title="Échecs" value="0.2%" sub="Timeouts" icon={<TrendingUp size={24} />} color="text-red-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Main Chart */}
               <div className="lg:col-span-2 bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                    <LayoutDashboard size={20} className="text-indigo-400" /> Volume des Transactions
                  </h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={DASHBOARD_DATA}>
                        <defs>
                          <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} itemStyle={{ color: '#fff' }} />
                        <Area type="monotone" dataKey="volume" stroke="#6366f1" fillOpacity={1} fill="url(#colorVol)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Operator Share */}
               <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                  <h3 className="font-bold text-white mb-6">Opérateurs</h3>
                  <div className="space-y-4">
                    <OperatorStat name="MTN Mobile Money" percent={45} color="bg-yellow-500" />
                    <OperatorStat name="Moov Money" percent={35} color="bg-blue-600" />
                    <OperatorStat name="Celtis Cash" percent={15} color="bg-purple-500" />
                    <OperatorStat name="Banques / UBA" percent={5} color="bg-red-500" />
                  </div>
               </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-white">Derniers Paiements</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                    <input type="text" placeholder="Rechercher ID..." className="bg-slate-900 border border-slate-600 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white focus:ring-1 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900 text-slate-400 uppercase font-mono text-xs">
                      <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Bénéficiaire</th>
                        <th className="px-6 py-3">Opérateur</th>
                        <th className="px-6 py-3">Montant</th>
                        <th className="px-6 py-3">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {RECENT_TRANSACTIONS.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-700/50">
                          <td className="px-6 py-4 font-mono text-slate-300">{tx.id}</td>
                          <td className="px-6 py-4 font-bold text-white">{tx.beneficiary} <span className="text-xs text-slate-500 font-normal block">{tx.phone}</span></td>
                          <td className="px-6 py-4"><span className="px-2 py-1 rounded text-xs font-bold bg-slate-700 text-slate-300">{tx.operator}</span></td>
                          <td className="px-6 py-4 font-bold text-white">{tx.amount.toLocaleString()} XOF</td>
                          <td className="px-6 py-4">
                             {tx.status === 'COMPLETED' ? <span className="text-emerald-400 text-xs font-bold">SUCCÈS</span> : <span className="text-red-400 text-xs font-bold">{tx.status}</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'bulk' && (
          <div className="space-y-6">
             <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
                <div className="w-16 h-16 bg-indigo-900/50 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
                   <UploadCloud size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Paiements de Masse (Bulk)</h3>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                   Téléversez un fichier CSV contenant la liste des pensionnés. Le système traitera les paiements via Mojaloop Batch API.
                </p>
                
                <div className="max-w-md mx-auto relative group">
                   <input 
                     type="file" 
                     accept=".csv"
                     onChange={handleFileUpload}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                     disabled={isUploading}
                   />
                   <div className="border-2 border-dashed border-slate-600 group-hover:border-indigo-500 rounded-xl p-8 transition-colors bg-slate-900/50">
                      {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                           <Loader2 className="animate-spin text-indigo-400" />
                           <span className="text-sm text-slate-400">Analyse du fichier...</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-sm font-bold text-indigo-400 block mb-1">Cliquez pour upload</span>
                          <span className="text-xs text-slate-500">Format: CSV (MSISDN, Montant, Nom)</span>
                        </>
                      )}
                   </div>
                </div>
                
                <div className="mt-8 flex justify-center gap-4 text-xs text-slate-500 font-mono">
                   <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Validation Schema</span>
                   <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Check Liquidité</span>
                   <span className="flex items-center gap-1"><CheckCircle2 size={12}/> Prévention Fraude</span>
                </div>
             </div>

             {/* Batch List */}
             {batches.length > 0 && (
                <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                   <div className="p-4 border-b border-slate-700 font-bold text-white">Historique des Lots</div>
                   <div className="divide-y divide-slate-700">
                      {batches.map(batch => (
                        <div key={batch.id} className="p-4 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-slate-700 rounded-lg text-slate-300">
                                 <FileSpreadsheet size={20} />
                              </div>
                              <div>
                                 <div className="font-bold text-white text-sm">{batch.fileName}</div>
                                 <div className="text-xs text-slate-500 font-mono">{batch.id} • {batch.totalRecords} Enreg. • {(batch.totalAmount).toLocaleString()} XOF</div>
                              </div>
                           </div>
                           
                           <div className="flex items-center gap-6">
                              <div className="w-32">
                                 <div className="flex justify-between text-xs mb-1">
                                    <span className="text-slate-400">{batch.status}</span>
                                    <span className="text-white">{batch.progress}%</span>
                                 </div>
                                 <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full transition-all duration-500 ${batch.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                      style={{ width: `${batch.progress}%` }}
                                    ></div>
                                 </div>
                              </div>
                              
                              {batch.status === 'UPLOADED' && (
                                 <button 
                                   onClick={() => processBatch(batch.id)}
                                   className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                                   title="Lancer le traitement"
                                 >
                                    <Play size={16} fill="currentColor" />
                                 </button>
                              )}
                              {batch.status === 'COMPLETED' && (
                                 <button className="p-2 bg-slate-700 hover:bg-slate-600 text-emerald-400 rounded-lg transition-colors">
                                    <Download size={16} />
                                 </button>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             )}
          </div>
        )}

      </div>
    </div>
  );
};

// Subcomponents
const SidebarBtn = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm flex items-center gap-3 transition-colors ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'
    }`}
  >
    {icon} {label}
  </button>
);

const KPICard = ({ title, value, sub, icon, color }: any) => (
  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
     <div className="flex justify-between items-start mb-4">
        <div>
           <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">{title}</p>
           <h4 className="text-2xl font-bold text-white mt-1">{value}</h4>
        </div>
        <div className={`p-3 rounded-lg bg-slate-900 ${color}`}>{icon}</div>
     </div>
     <p className="text-xs text-slate-500">{sub}</p>
  </div>
);

const OperatorStat = ({ name, percent, color }: any) => (
  <div>
     <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{name}</span>
        <span className="font-bold text-white">{percent}%</span>
     </div>
     <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
     </div>
  </div>
);

export default AdminDashboard;
