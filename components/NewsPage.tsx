
import React from 'react';
import { TrendingDown, Clock, Shield, BarChart3, Users, Smartphone, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';

const dataCost = [
  { name: 'Logistique Cash', cost: 100, label: '100%' },
  { name: 'OpenPension', cost: 15, label: '15%' },
];

// Projected cumulative savings over 5 years (in Millions USD or local currency equivalent units)
const dataSavings = [
  { year: 'Année 1', savings: 120 },
  { year: 'Année 2', savings: 280 },
  { year: 'Année 3', savings: 490 },
  { year: 'Année 4', savings: 750 },
  { year: 'Année 5', savings: 1100 },
];

const ImpactView: React.FC = () => {
  return (
    <div className="w-full h-full overflow-y-auto bg-slate-900 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-24">
        
        {/* Header */}
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 text-indigo-400 text-xs font-bold mb-3 border border-indigo-500/20">
               <BarChart3 size={14} /> ANALYSE D'IMPACT
            </div>
           <h2 className="text-3xl font-bold text-white mb-4">La Preuve par les Données</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">
             Comparatif direct entre le circuit traditionnel de distribution d'espèces et l'architecture numérique OpenPension.
           </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
           <StatCard 
              value="-85%" 
              label="Coûts Opérationnels" 
              desc="Économie réalisée sur le transport de fonds et la sécurisation physique."
              color="text-emerald-400"
              borderColor="border-emerald-500/20"
              icon={<TrendingDown />}
           />
           <StatCard 
              value="~3 sec" 
              label="Temps de Traitement" 
              desc="Contre une moyenne de 30 jours pour les tournées de paiement manuel."
              color="text-cyan-400"
              borderColor="border-cyan-500/20"
              icon={<Clock />}
           />
           <StatCard 
              value="100%" 
              label="Traçabilité" 
              desc="Audit en temps réel de chaque franc CFA décaissé par le Trésor."
              color="text-indigo-400"
              borderColor="border-indigo-500/20"
              icon={<Shield />}
           />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
           
           {/* Chart 1: Coûts */}
           <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Réduction des Coûts de Gestion</h3>
              <p className="text-sm text-slate-400 mb-6">Comparaison du coût par transaction (Base 100)</p>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataCost} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={100} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{fill: '#1e293b'}}
                    />
                    <Bar dataKey="cost" radius={[0, 4, 4, 0]} barSize={40}>
                      {dataCost.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#ef4444' : '#10b981'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-xs text-slate-500 text-center">
                 Le modèle Open Source élimine les frais de licence et réduit l'infrastructure physique.
              </div>
           </div>

           {/* Chart 2: Savings Projection */}
           <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">Économies Cumulées</h3>
              <p className="text-sm text-slate-400 mb-6">Projection sur 5 ans (en Millions)</p>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataSavings} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
                      activeDot={{ r: 6 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-xs text-slate-500 text-center">
                 ROI positif dès la première année grâce à l'automatisation.
              </div>
           </div>

        </div>

        {/* Use Cases */}
        <div className="mb-12">
           <h3 className="text-2xl font-bold text-white mb-8">Cas d'Usage Concrets</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <UseCaseCard 
                 title="Pensions de Retraite en Zone Rurale"
                 desc="Permettre aux retraités vivants dans des zones sans agences bancaires de recevoir leur pension directement sur leur téléphone, évitant des trajets coûteux vers la ville."
                 tag="G2P"
                 icon={<MapPin size={24} />}
                 color="bg-orange-500"
              />
              <UseCaseCard 
                 title="Bourses Universitaires"
                 desc="Paiement instantané des allocations aux étudiants via Mobile Money. Suppression des intermédiaires et réduction de la fraude liée aux bénéficiaires fantômes."
                 tag="Éducation"
                 icon={<Users size={24} />}
                 color="bg-blue-500"
              />
              <UseCaseCard 
                 title="Aides d'Urgence (Catastrophes)"
                 desc="Déploiement rapide de fonds vers les populations sinistrées. Identification via carte biométrique ou SIM, crédit immédiat."
                 tag="Humanitaire"
                 icon={<Shield size={24} />}
                 color="bg-red-500"
              />
              <UseCaseCard 
                 title="Salaires des Fonctionnaires"
                 desc="Interopérabilité totale permettant aux fonctionnaires de choisir leur point de réception (Banque UBA, MTN MoMo, Carte prépayée)."
                 tag="Salaire"
                 icon={<Smartphone size={24} />}
                 color="bg-purple-500"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ value, label, desc, color, borderColor, icon }: any) => (
    <div className={`bg-slate-800 rounded-2xl p-6 border ${borderColor} hover:border-opacity-50 transition-colors`}>
        <div className={`mb-4 w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
        <div className="text-white font-bold mb-2">{label}</div>
        <div className="text-slate-400 text-sm">{desc}</div>
    </div>
);

const UseCaseCard = ({ title, desc, tag, icon, color }: any) => (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex gap-4 hover:bg-slate-750 transition-colors">
        <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-white shadow-lg ${color}`}>
            {icon}
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 border border-slate-600 px-2 py-0.5 rounded">{tag}</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default ImpactView;
