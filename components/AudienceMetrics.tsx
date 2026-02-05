
import React, { useMemo } from 'react';
import { UnifiedAnalysis } from '../types';
import { Activity, Users, PieChart, BarChart3, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudienceMetricsProps {
  results: UnifiedAnalysis[];
}

const AudienceMetrics: React.FC<AudienceMetricsProps> = ({ results }) => {
  if (results.length === 0) return null;

  const totalReach = useMemo(() => results.reduce((acc, r) => acc + r.metrics.reach, 0), [results]);
  const totalMentions = useMemo(() => results.reduce((acc, r) => acc + r.metrics.mentions, 0), [results]);
  const signalVolume = results.length;

  // Aggregate Age Groups
  const ageDistribution = useMemo(() => {
    const counts = { '18-24': 0, '25-34': 0, '35-44': 0, '45-54': 0, '55+': 0 };
    results.forEach(r => {
      r.metrics.age_groups.forEach(ag => {
        if (counts.hasOwnProperty(ag.label)) {
          // @ts-ignore
          counts[ag.label] += ag.value;
        }
      });
    });
    const total = results.length || 1;
    return Object.entries(counts).map(([label, value]) => ({ label, value: value / total }));
  }, [results]);

  // Aggregate Traffic Sources (Manual, X, TikTok, Facebook, Instagram)
  const trafficSources = useMemo(() => {
    const sources = { 'Direct': 0, 'X': 0, 'TikTok': 0, 'Facebook': 0, 'Instagram': 0 };
    results.forEach(r => {
      if (r.source === 'Manual') sources['Direct']++;
      else if (sources.hasOwnProperty(r.source)) {
        // @ts-ignore
        sources[r.source]++;
      }
    });
    return Object.entries(sources).map(([label, value]) => ({ label, value }));
  }, [results]);

  return (
    <div className="space-y-10 w-full">
      {/* Top Large Card: Integrated Reach Intelligence */}
      <section className="bg-white/40 backdrop-blur-3xl rounded-[4rem] p-12 shadow-xl border border-white/60 overflow-hidden relative group">
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Integrated Reach Intelligence</h3>
              <div className="flex gap-4 mt-1">
                 <span className="text-[9px] font-bold text-slate-500 bg-white/40 px-3 py-1 rounded-full border border-white/60">Reach: {totalReach.toLocaleString()}</span>
                 <span className="text-[9px] font-bold text-slate-500 bg-white/40 px-3 py-1 rounded-full border border-white/60">Mentions: {totalMentions}</span>
                 <span className="text-[9px] font-bold text-slate-500 bg-white/40 px-3 py-1 rounded-full border border-white/60">Velocity: 4.2s</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black text-slate-800 tracking-tighter">{signalVolume}</span>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest ml-3">Total Signals</span>
          </div>
        </div>

        {/* Large Area Chart */}
        <div className="relative h-[250px] w-full mt-10">
           <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
             <defs>
               <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
               </linearGradient>
             </defs>
             {/* Area Fill */}
             <path 
                d="M0,100 C100,90 200,110 300,95 C400,80 500,120 600,100 C700,80 800,90 900,110 L1000,100 V200 H0 Z" 
                fill="url(#areaGradient)"
             />
             {/* Line */}
             <path 
                d="M0,100 C100,90 200,110 300,95 C400,80 500,120 600,100 C700,80 800,90 900,110 L1000,100" 
                fill="none" 
                stroke="#8B5CF6" 
                strokeWidth="4" 
                strokeLinecap="round"
             />
           </svg>
           <div className="absolute bottom-0 left-0 w-full flex justify-between px-4">
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Historical Baseline</span>
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Signal Flux</span>
              <span className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">Live Insight</span>
           </div>
        </div>
      </section>

      {/* Bottom Grid: Age and Traffic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Author Age Distribution */}
        <section className="bg-white/40 backdrop-blur-3xl rounded-[4rem] p-12 shadow-xl border border-white/60">
           <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-emerald-500" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Author Age Distribution</h3>
           </div>
           
           <div className="flex items-end justify-between h-40 gap-4 px-4">
              {ageDistribution.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center flex-1">
                   <motion.div 
                     initial={{ height: 0 }}
                     animate={{ height: `${item.value * 2}%` }}
                     className="w-full bg-[#0DACF1] rounded-t-xl min-h-[4px]"
                   />
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-4">{item.label}</span>
                </div>
              ))}
           </div>
        </section>

        {/* Traffic Sources Distribution */}
        <section className="bg-white/40 backdrop-blur-3xl rounded-[4rem] p-12 shadow-xl border border-white/60">
           <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                <PieChart className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Traffic Sources Distribution</h3>
           </div>

           <div className="flex items-center justify-center gap-10">
              <div className="relative w-40 h-40">
                 <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                    <circle 
                      cx="50" cy="50" r="40" fill="transparent" 
                      stroke="#0DACF1" strokeWidth="12" 
                      strokeDasharray="251.2" 
                      strokeDashoffset={251.2 * 0.25} // Simulating a breakdown
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                       <span className="text-xl font-black text-slate-800">100%</span>
                    </div>
                 </div>
              </div>
              <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0DACF1]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Web / App</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-200" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referral</span>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default AudienceMetrics;
