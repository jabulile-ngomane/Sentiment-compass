
import React from 'react';
import { motion } from 'framer-motion';
import { BatchStats } from '../types';

interface SentimentPieChartProps {
  data: BatchStats;
}

const SentimentPieChart: React.FC<SentimentPieChartProps> = ({ data }) => {
  const { total, positiveCount, negativeCount, neutralCount } = data;
  const radius = 70;
  const circum = 2 * Math.PI * radius;

  const getStroke = (count: number) => (total === 0 ? 0 : (count / total) * circum);

  return (
    <div className="w-full bg-white/40 backdrop-blur-3xl p-14 rounded-[4rem] border border-white/60 shadow-xl flex flex-col items-center">
      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-10">Batch Sentiment Mix</h3>
      
      <div className="relative w-64 h-64 mb-12">
        <svg viewBox="0 0 200 200" className="transform -rotate-90 w-full h-full">
          <circle cx="100" cy="100" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="24" />
          
          {/* Positive Segment */}
          <motion.circle
            cx="100" cy="100" r={radius} fill="transparent" stroke="#10B981" strokeWidth="24"
            strokeDasharray={`${getStroke(positiveCount)} ${circum}`}
            initial={{ strokeDashoffset: circum }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />

          {/* Negative Segment */}
          <motion.circle
            cx="100" cy="100" r={radius} fill="transparent" stroke="#EF4444" strokeWidth="24"
            strokeDasharray={`${getStroke(negativeCount)} ${circum}`}
            strokeDashoffset={-getStroke(positiveCount)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            strokeLinecap="round"
          />

          {/* Neutral Segment */}
          <motion.circle
            cx="100" cy="100" r={radius} fill="transparent" stroke="#94A3B8" strokeWidth="24"
            strokeDasharray={`${getStroke(neutralCount)} ${circum}`}
            strokeDashoffset={-(getStroke(positiveCount) + getStroke(negativeCount))}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            strokeLinecap="round"
          />
        </svg>

        {/* Upright Central Counter */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-slate-800 tracking-tighter">{total}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Audits</span>
        </div>
      </div>

      {/* Vertical Legend Section */}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center justify-between px-8 py-4 bg-white/20 rounded-[2rem] border border-white/40 group hover:bg-emerald-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#10B981] shadow-lg shadow-emerald-500/30" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Positive</span>
          </div>
          <span className="text-lg font-black text-slate-700">{positiveCount}</span>
        </div>

        <div className="flex items-center justify-between px-8 py-4 bg-white/20 rounded-[2rem] border border-white/40 group hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#94A3B8] shadow-lg shadow-slate-500/30" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neutral</span>
          </div>
          <span className="text-lg font-black text-slate-700">{neutralCount}</span>
        </div>

        <div className="flex items-center justify-between px-8 py-4 bg-white/20 rounded-[2rem] border border-white/40 group hover:bg-rose-50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 rounded-full bg-[#EF4444] shadow-lg shadow-rose-500/30" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Negative</span>
          </div>
          <span className="text-lg font-black text-slate-700">{negativeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default SentimentPieChart;
