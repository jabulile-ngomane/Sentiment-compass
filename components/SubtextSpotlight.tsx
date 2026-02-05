
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UnifiedAnalysis } from '../types';
// Fixed: Added missing 'Zap' import from lucide-react
import { Sparkles, Target, MessageSquare, HelpCircle, Zap } from 'lucide-react';

interface SubtextSpotlightProps {
  analysis: UnifiedAnalysis;
}

const SubtextSpotlight: React.FC<SubtextSpotlightProps> = ({ analysis }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to check if a word is part of an emotive phrase
  const isEmotive = (word: string) => {
    return analysis.key_emotive_phrases.some(phrase => 
      phrase.toLowerCase().includes(word.toLowerCase())
    );
  };

  const words = analysis.text.split(' ');

  return (
    <div className="bg-[#1E1B4B] rounded-[4rem] p-16 shadow-2xl relative overflow-hidden group border border-white/5">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles className="w-48 h-48 text-white" />
      </div>

      <div className="relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="px-6 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
              {analysis.sentiment} Signal • {(analysis.confidence_score * 100).toFixed(0)}% Confidence
            </span>
          </div>
          {analysis.code_switched && (
            <div className="px-6 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-3">
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                Code-Switched
              </span>
            </div>
          )}
        </div>

        {/* Main Text Display */}
        <div 
          className="mb-20 text-center leading-tight cursor-default max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-white/40 text-6xl font-heading font-light italic leading-none">"</span>
          {words.map((word, idx) => {
            const emotive = isEmotive(word);
            return (
              <span 
                key={idx}
                className={`text-4xl lg:text-6xl font-heading font-medium italic inline-block mx-1 transition-all duration-500 ${
                  isHovered && emotive 
                    ? analysis.sentiment === 'Positive' ? 'text-[#10B981] drop-shadow-[0_0_15px_rgba(16,185,129,0.8)]' :
                      analysis.sentiment === 'Negative' ? 'text-[#EF4444] drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]' :
                      'text-[#8B5CF6] drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]'
                    : isHovered ? 'text-white/30' : 'text-white/90'
                }`}
              >
                {word}
              </span>
            );
          })}
          <span className="text-white/40 text-6xl font-heading font-light italic leading-none">"</span>
        </div>

        {/* Triple Column Detail View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Why This Classification */}
          <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full border border-rose-400/50 flex items-center justify-center p-2">
                <div className="w-1 h-1 bg-rose-400 rounded-full" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-300">Why This Classification?</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {analysis.explanation}
            </p>
          </div>

          {/* Column 2: Sentiment Drivers */}
          <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-300">Sentiment Drivers</h4>
            </div>
            <div className="flex flex-col gap-3">
              {analysis.key_emotive_phrases.map((phrase, i) => (
                <div key={i} className="px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{phrase}</span>
                </div>
              ))}
              {analysis.key_emotive_phrases.length === 0 && (
                <span className="text-slate-500 text-xs italic">No specific drivers isolated.</span>
              )}
            </div>
          </div>

          {/* Column 3: Brand Impact */}
          <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C8A2C8]">Brand Impact</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              {analysis.business_insight}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubtextSpotlight;
