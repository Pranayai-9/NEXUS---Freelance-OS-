import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Zap, RotateCcw } from 'lucide-react';
import { Task } from '../types';

interface DeepFlowHUDProps {
  isActive: boolean;
  onClose: () => void;
  activeTask?: Task;
}

export const DeepFlowHUD: React.FC<DeepFlowHUDProps> = ({ isActive, onClose, activeTask }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft]);

  // Reset timer if HUD opens/closes
  useEffect(() => {
    if (!isActive) {
        setIsPaused(true);
    }
  }, [isActive]);

  if (!isActive) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-2xl animate-[fadeIn_0.3s_ease-out] text-slate-800">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-200/40 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-200/40 blur-[100px] rounded-full" />
      </div>

      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 text-slate-400 hover:text-slate-800 transition-colors p-2 rounded-full hover:bg-slate-100"
      >
        <X size={32} />
      </button>
      
      <div className="relative z-10 text-center space-y-10 max-w-2xl w-full px-6">
        <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-600 border border-violet-200 text-xs font-bold tracking-widest uppercase shadow-sm">
            <Zap size={14} className={!isPaused ? "animate-pulse" : ""} /> Deep Flow Active
            </div>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-slate-500 text-lg font-medium tracking-wide">Current Objective</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 leading-tight">
            {activeTask ? activeTask.title : "Unassigned Task"}
            </h1>
        </div>
        
        <div className="relative py-8">
            <div className="text-[12rem] leading-none font-mono tabular-nums tracking-tighter text-slate-900 font-bold select-none drop-shadow-sm">
            {formatTime(timeLeft)}
            </div>
            {/* Minimal Progress Bar */}
            <div className="w-64 h-1.5 bg-slate-200 mx-auto mt-8 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        <div className="flex items-center justify-center gap-8">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-violet-200"
          >
            {isPaused ? <Play size={32} className="ml-1" fill="currentColor" /> : <Pause size={32} fill="currentColor" />}
          </button>
          
          <button 
            onClick={() => { setTimeLeft(25 * 60); setIsPaused(true); }}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-md"
            title="Reset Timer"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};