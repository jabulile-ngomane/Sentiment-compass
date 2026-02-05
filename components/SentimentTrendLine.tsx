
import React from 'react';
import { UnifiedAnalysis } from '../types';

interface SentimentTrendLineProps {
  data: UnifiedAnalysis[];
}

const SentimentTrendLine: React.FC<SentimentTrendLineProps> = ({ data }) => {
  if (data.length === 0) return null;

  const points = data.slice(0, 20).reverse();
  const max = 100;
  const height = 150;
  const width = 800;

  const getX = (idx: number) => (idx / (points.length - 1)) * width;
  const getY = (val: number) => height - (val / max) * height;

  const pathD = points.map((p, i) => {
    const val = p.sentiment === 'Positive' ? 90 : p.sentiment === 'Negative' ? 10 : 50;
    return `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`;
  }).join(' ');

  return (
    <section className="bg-white/40 backdrop-blur-3xl rounded-[4rem] p-14 shadow-xl border border-white/60 overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Polaris Drift (Trend Analysis)</h3>
        <span className="px-4 py-1.5 bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-bold rounded-full">Real-time Pulse</span>
      </div>

      <div className="relative h-[150px] w-full">
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <path
            d={pathD}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-20"
          />
          <path
            d={pathD}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {points.map((p, i) => {
             const val = p.sentiment === 'Positive' ? 90 : p.sentiment === 'Negative' ? 10 : 50;
             return (
                <circle 
                  key={i} 
                  cx={getX(i)} 
                  cy={getY(val)} 
                  r="5" 
                  fill={p.sentiment === 'Positive' ? '#10B981' : p.sentiment === 'Negative' ? '#EF4444' : '#94A3B8'} 
                  className="shadow-xl"
                />
             )
          })}
        </svg>
      </div>
    </section>
  );
};

export default SentimentTrendLine;
