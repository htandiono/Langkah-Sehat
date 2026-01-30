import React, { useEffect, useState } from 'react';
import { Flame, MapPin, Trophy, Bell, Activity } from 'lucide-react';
import HexProgress from './HexProgress';
import { UserStats } from '../types';

interface DashboardProps {
  user: UserStats;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [animatedSteps, setAnimatedSteps] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = user.steps;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedSteps(end);
        clearInterval(timer);
      } else {
        setAnimatedSteps(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [user.steps]);

  const stepPercentage = Math.min((user.steps / 8000) * 100, 100);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto relative overflow-y-auto no-scrollbar pb-24">
        
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg chamfer-clip flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Activity className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
                <h1 className="text-xl font-bold tracking-tight leading-none">
                    <span className="text-white">LANGKAH</span>
                    <span className="text-[#00AEEF]">SEHAT</span>
                </h1>
                <span className="text-[9px] text-gray-400 tracking-widest uppercase">Corp. Fitness Tracker</span>
            </div>
        </div>
        
        <button className="w-10 h-10 rounded-xl bg-[#2a2a2a] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
            <Bell size={18} />
            <div className="absolute top-2 right-3 w-1.5 h-1.5 bg-blue-500 rounded-full border border-[#2a2a2a]"></div>
        </button>
      </div>

      {/* Connection Status */}
      <div className="flex justify-center my-4">
          <div className="bg-[#1a1a1a] border border-white/5 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-inner">
             <div className="w-2 h-2 rounded-full bg-[#00AEEF] shadow-[0_0_8px_#00AEEF]"></div>
             <span className="text-[10px] font-bold text-[#00AEEF] tracking-wide">TERHUBUNG • GPS AKTIF</span>
          </div>
      </div>

      {/* Main Hex Progress */}
      <div className="flex flex-col items-center justify-center mt-2 relative z-10">
        <HexProgress percentage={stepPercentage} size={300}>
            <div className="flex flex-col items-center pt-4">
                <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">Hari Ini</span>
                <h1 className="text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                    {animatedSteps.toLocaleString('id-ID').replace('.', '.')}
                </h1>
                <span className="text-[#00AEEF] text-sm font-bold tracking-widest uppercase mt-2">Langkah</span>
            </div>
        </HexProgress>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
            <span>Target: <strong className="text-white">8.000</strong></span>
            <span className="text-gray-600">|</span>
            <span className="text-[#00AEEF]">{Math.round(stepPercentage)}% Selesai</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mt-10 grid grid-cols-3 gap-4">
            {/* Calories */}
            <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 shadow-lg group relative overflow-hidden chamfer-clip-sm">
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-orange-900/30 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-1">
                    <Flame size={18} fill="currentColor" fillOpacity={0.6} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white">{user.calories}</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kalori</p>
                </div>
            </div>

            {/* Distance */}
            <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 shadow-lg group relative overflow-hidden chamfer-clip-sm">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-1">
                    <MapPin size={18} fill="currentColor" fillOpacity={0.6} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white">{user.distance.toString().replace('.', ',')}</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">KM</p>
                </div>
            </div>

            {/* Rank */}
            <div className="bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-3 shadow-lg group relative overflow-hidden chamfer-clip-sm">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-10 h-10 rounded-xl bg-yellow-900/30 border border-yellow-500/20 flex items-center justify-center text-yellow-500 mb-1">
                    <Trophy size={18} fill="currentColor" fillOpacity={0.6} />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white">#{user.rank}</h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Rank</p>
                </div>
            </div>
      </div>
      
      {/* Bottom Glow Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>

    </div>
  );
};

export default Dashboard;
