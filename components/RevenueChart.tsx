import React from 'react';

export const RevenueChart: React.FC = () => {
  return (
    <div className="w-full h-56 relative mt-4 overflow-hidden group select-none">
      <svg viewBox="0 0 400 150" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid lines - subtle slate */}
        <line x1="0" y1="112.5" x2="400" y2="112.5" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="75" x2="400" y2="75" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="0" y1="37.5" x2="400" y2="37.5" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        
        {/* Area fill */}
        <path 
          d="M0,120 C40,110 80,130 120,90 C160,50 200,80 240,60 C280,40 320,50 360,20 L400,10 V150 H0 Z" 
          fill="url(#gradient)" 
          className="opacity-70 transition-opacity duration-700 group-hover:opacity-90"
        />

        {/* The Chart Line - Violet */}
        <path 
          d="M0,120 C40,110 80,130 120,90 C160,50 200,80 240,60 C280,40 320,50 360,20 L400,10" 
          fill="none" 
          stroke="#7c3aed" 
          strokeWidth="3" 
          strokeLinecap="round"
          filter="url(#glow)"
          className="drop-shadow-sm"
        />
        
        {/* Interactive Data Points */}
        <circle cx="120" cy="90" r="4" fill="#fff" stroke="#8b5cf6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all duration-300 shadow-md" />
        <circle cx="240" cy="60" r="4" fill="#fff" stroke="#8b5cf6" strokeWidth="2.5" className="cursor-pointer hover:r-6 transition-all duration-300 shadow-md" />
        <circle cx="360" cy="20" r="6" fill="#7c3aed" stroke="#fff" strokeWidth="3" className="animate-pulse shadow-lg" />
      </svg>
      
      {/* Dynamic Tooltip */}
      <div className="absolute top-2 right-12 flex flex-col items-end">
        <span className="text-xs text-slate-400 font-bold tracking-wider uppercase">Projected Oct</span>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">$14.2k</span>
      </div>
    </div>
  );
};