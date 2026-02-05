
import React from 'react';
import { motion } from 'framer-motion';
import { BatchStats } from '../types';

interface AbstractFluidProps {
  summary: BatchStats;
}

const AbstractFluid: React.FC<AbstractFluidProps> = ({ summary }) => {
  const { positiveCount, negativeCount, neutralCount, total } = summary;

  // Calculate normalized heights for the three vertical layers
  const getPercent = (count: number) => (total === 0 ? 33.3 : (count / total) * 100);

  const posHeight = getPercent(positiveCount);
  const negHeight = getPercent(negativeCount);
  const neuHeight = getPercent(neutralCount);

  return (
    <div className="flex items-center gap-12 h-full w-full p-8">
      {/* Dynamic Fluid Blob Container */}
      <div className="relative w-64 h-64 rounded-full overflow-hidden bg-white/20 shadow-inner flex flex-col">
        {/* Positive Fluid Layer (Top) */}
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ height: `${posHeight}%`, backgroundColor: '#10B981' }}
          className="w-full opacity-60"
        />
        {/* Neutral Fluid Layer (Middle) */}
        <motion.div
          animate={{ y: [0, 8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ height: `${neuHeight}%`, backgroundColor: '#94A3B8' }}
          className="w-full opacity-60"
        />
        {/* Negative Fluid Layer (Bottom) */}
        <motion.div
          animate={{ y: [0, -5, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ height: `${negHeight}%`, backgroundColor: '#EF4444' }}
          className="w-full opacity-60"
        />
      </div>

      {/* Upright Vertical Metrics */}
      <div className="flex flex-col justify-center gap-10 text-left">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="text-sm font-black text-slate-800 tracking-widest">{posHeight.toFixed(0)}%</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-6">Positive</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#94A3B8]" />
            <span className="text-sm font-black text-slate-800 tracking-widest">{neuHeight.toFixed(0)}%</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-6">Neutral</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
            <span className="text-sm font-black text-slate-800 tracking-widest">{negHeight.toFixed(0)}%</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-6">Negative</span>
        </div>
      </div>
    </div>
  );
};

export default AbstractFluid;
