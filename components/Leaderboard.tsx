import React, { useState } from 'react';
import { LeaderboardEntry, TeamLeaderboardEntry, LeaderboardType } from '../types';
import { Trophy, SlidersHorizontal, Users, User } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  teamEntries: TeamLeaderboardEntry[];
  currentUserEntry: LeaderboardEntry;
}

// Unified View Model for rendering logic
interface LeaderboardViewModel {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    primaryValue: string; // The big number (Steps or Avg)
    valueLabel: string; // "Langkah" or "Rata-rata"
    subtitle: string; // "Role" or "Member Count"
    isTeam: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries, teamEntries, currentUserEntry }) => {
  const [activeTab, setActiveTab] = useState<LeaderboardType>('individu');

  // Transform Data based on active tab
  const data: LeaderboardViewModel[] = activeTab === 'individu' 
    ? entries.map(e => ({
        id: e.id,
        rank: e.rank,
        name: e.name,
        avatar: e.avatar,
        primaryValue: e.steps.toLocaleString(),
        valueLabel: 'Langkah',
        subtitle: e.role,
        isTeam: false
    }))
    : teamEntries.map(e => ({
        id: e.id,
        rank: e.rank,
        name: e.name,
        avatar: e.avatar,
        primaryValue: e.averageSteps.toLocaleString(),
        valueLabel: 'Rata-rata',
        subtitle: `${e.memberCount} Anggota`,
        isTeam: true
    }));

  const topThree = data.slice(0, 3);
  const restList = data.slice(3);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-8 relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 mb-6">
        <div className="flex items-center gap-3">
            <Trophy className="text-[#00AEEF]" size={28} strokeWidth={2.5} />
            <h1 className="text-2xl font-black text-white tracking-wide uppercase">KLASEMEN</h1>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400 border border-white/10">
            <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-8">
        <div className="flex bg-[#121212] p-1 rounded-lg border border-white/5 relative">
          <button 
            onClick={() => setActiveTab('individu')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest rounded chamfer-clip-sm transition-all z-10 ${activeTab === 'individu' ? 'bg-[#0055FF] text-white shadow-lg shadow-blue-900/50' : 'text-gray-500 hover:text-white'}`}
          >
            <User size={12} /> Individu
          </button>
          <button 
            onClick={() => setActiveTab('tim')}
            className={`flex-1 py-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest rounded chamfer-clip-sm transition-all z-10 ${activeTab === 'tim' ? 'bg-[#0055FF] text-white shadow-lg shadow-blue-900/50' : 'text-gray-500 hover:text-white'}`}
          >
            <Users size={12} /> Tim Divisi
          </button>
        </div>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end px-4 mb-8 gap-3 relative z-10">
         {/* Rank 2 */}
         {topThree[1] && (
         <div className="flex flex-col items-center relative -bottom-4 w-1/3">
             <div className="relative mb-3">
                 <div className="w-[84px] h-[94px] hex-clip bg-gradient-to-b from-gray-300 to-gray-500 p-[2px] shadow-lg shadow-gray-500/20">
                    <div className={`w-full h-full ${activeTab === 'tim' ? 'bg-white p-2' : 'bg-[#1e1e1e]'} hex-clip relative flex items-center justify-center`}>
                        <img src={topThree[1].avatar} alt="" className={`w-full h-full object-cover ${activeTab === 'individu' ? 'opacity-90' : 'object-contain'}`} />
                    </div>
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-200 text-gray-800 border-4 border-[#1e1e1e] flex items-center justify-center font-black text-sm z-20">
                     2
                 </div>
             </div>
             <h3 className="text-white font-bold text-xs uppercase text-center line-clamp-1 w-full">{topThree[1].name}</h3>
             <span className="text-gray-400 text-[9px] font-bold uppercase mb-0.5">{topThree[1].valueLabel}</span>
             <span className="text-white font-black text-lg leading-none">{topThree[1].primaryValue}</span>
             
             {/* Podium Base */}
             <div className="w-full h-24 mt-2 bg-gradient-to-b from-[#2a2a2a] to-transparent chamfer-clip-sm opacity-80 border-t border-gray-600/30"></div>
         </div>
         )}

         {/* Rank 1 */}
         {topThree[0] && (
         <div className="flex flex-col items-center relative z-20 -mb-2 w-1/3">
             <div className="relative mb-3">
                 <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <img src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" className="w-10 h-10 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]" alt="crown" />
                 </div>
                 <div className="w-[100px] h-[115px] hex-clip bg-gradient-to-b from-yellow-300 to-yellow-600 p-[3px] shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                    <div className={`w-full h-full ${activeTab === 'tim' ? 'bg-white p-2' : 'bg-[#1e1e1e]'} hex-clip relative flex items-center justify-center`}>
                        <img src={topThree[0].avatar} alt="" className={`w-full h-full object-cover ${activeTab === 'individu' ? '' : 'object-contain'}`} />
                    </div>
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-yellow-400 text-yellow-900 border-4 border-[#1e1e1e] flex items-center justify-center font-black text-base z-20">
                     1
                 </div>
             </div>
             <h3 className="text-yellow-400 font-bold text-sm uppercase text-center line-clamp-1 w-full">{topThree[0].name}</h3>
             <span className="text-gray-400 text-[9px] font-bold uppercase mb-0.5">{topThree[0].valueLabel}</span>
             <span className="text-white font-black text-xl leading-none">{topThree[0].primaryValue}</span>

             {/* Podium Base */}
             <div className="w-full h-32 mt-2 bg-gradient-to-b from-[#3a3a3a] to-transparent chamfer-clip-sm opacity-90 border-t border-yellow-500/30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
         </div>
         )}

         {/* Rank 3 */}
         {topThree[2] && (
         <div className="flex flex-col items-center relative -bottom-8 w-1/3">
             <div className="relative mb-3">
                 <div className="w-[84px] h-[94px] hex-clip bg-gradient-to-b from-orange-400 to-orange-700 p-[2px] shadow-lg shadow-orange-700/20">
                    <div className={`w-full h-full ${activeTab === 'tim' ? 'bg-white p-2' : 'bg-[#1e1e1e]'} hex-clip relative flex items-center justify-center`}>
                        <img src={topThree[2].avatar} alt="" className={`w-full h-full object-cover ${activeTab === 'individu' ? 'opacity-90' : 'object-contain'}`} />
                    </div>
                 </div>
                 <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-orange-400 text-orange-900 border-4 border-[#1e1e1e] flex items-center justify-center font-black text-sm z-20">
                     3
                 </div>
             </div>
             <h3 className="text-gray-300 font-bold text-xs uppercase text-center line-clamp-1 w-full">{topThree[2].name}</h3>
             <span className="text-gray-400 text-[9px] font-bold uppercase mb-0.5">{topThree[2].valueLabel}</span>
             <span className="text-white font-black text-lg leading-none">{topThree[2].primaryValue}</span>
             
             {/* Podium Base */}
             <div className="w-full h-20 mt-2 bg-gradient-to-b from-[#2a2a2a] to-transparent chamfer-clip-sm opacity-80 border-t border-orange-700/30"></div>
         </div>
         )}
      </div>

      <div className="flex justify-between px-6 text-[10px] font-bold text-gray-500 tracking-widest uppercase mb-2">
          <span>{activeTab === 'individu' ? 'Top Runners' : 'Top Teams'}</span>
          <span className="text-[#00AEEF]">Weekly</span>
      </div>

      {/* List */}
      <div className="flex-1 bg-[#1a1a1a]/50 backdrop-blur-md rounded-t-3xl border-t border-white/5 overflow-hidden">
         <div className="h-full overflow-y-auto pb-24 pt-2 no-scrollbar px-4">
             {restList.map((entry) => (
                 <div key={entry.id} className="flex items-center gap-4 py-4 border-b border-white/5 group">
                     <span className="text-sm font-bold text-gray-500 w-8 pl-2">
                         {entry.rank < 10 ? `0${entry.rank}` : entry.rank}
                     </span>
                     <div className={`w-10 h-10 hex-clip ${activeTab === 'tim' ? 'bg-white p-1' : 'bg-gray-700'}`}>
                        <img src={entry.avatar} alt={entry.name} className={`w-full h-full ${activeTab === 'tim' ? 'object-contain' : 'object-cover'}`} />
                     </div>
                     <div className="flex-1">
                         <p className="text-sm font-bold text-white group-hover:text-[#00AEEF] transition-colors line-clamp-1">{entry.name}</p>
                         <p className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase">{entry.subtitle}</p>
                     </div>
                     <div className="text-right">
                        <span className="text-base font-black text-white block group-hover:text-[#00AEEF] transition-colors">{entry.primaryValue}</span>
                        <span className="text-[9px] text-gray-500 font-bold uppercase">{entry.valueLabel}</span>
                     </div>
                 </div>
             ))}
         </div>
      </div>

    </div>
  );
};

export default Leaderboard;
