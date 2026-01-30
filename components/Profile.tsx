import React from 'react';
import { UserStats, TabView } from '../types';
import { Settings, PenLine, Flame, Target, Lock, Footprints } from 'lucide-react';

interface ProfileProps {
  user: UserStats;
  onNavigate: (view: TabView) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onNavigate }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-8 relative overflow-y-auto no-scrollbar pb-24">
       
      {/* Header with Hex Avatar */}
      <div className="flex flex-col items-center mb-8 relative">
           {/* Top Right Notification */}
           <div className="absolute top-0 right-6">
               <button className="w-10 h-10 rounded-xl bg-[#2a2a2a] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
                    <div className="w-1.5 h-1.5 bg-[#00AEEF] rounded-full absolute top-2 right-3"></div>
                    <Settings size={18} />
               </button>
           </div>
           
           {/* Hex Avatar Container */}
           <div className="w-32 h-36 relative mb-4">
               {/* Outer Blue Glow Border */}
               <div className="absolute inset-0 hex-clip bg-gradient-to-b from-[#0055FF] to-[#00AEEF] p-[4px] shadow-[0_0_30px_rgba(0,174,239,0.4)]">
                    <div className="w-full h-full bg-[#1e1e1e] hex-clip relative">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
               </div>
               
               {/* Level Badge */}
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border border-[#00AEEF] rounded-full px-4 py-1 flex items-center gap-1 z-10 shadow-lg">
                   <span className="text-yellow-400 text-xs">⚡</span>
                   <div className="flex flex-col leading-none">
                       <span className="text-[8px] text-gray-400 font-bold uppercase">Level</span>
                       <span className="text-xs font-black text-white">{user.level}</span>
                   </div>
               </div>
           </div>

           <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
           <p className="text-[#00AEEF] text-xs font-bold tracking-widest uppercase mb-4">{user.role}</p>

           <button 
             onClick={() => onNavigate('edit-profile')}
             className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] border border-white/10 px-4 py-2 rounded-lg transition-colors group"
           >
               <PenLine size={14} className="text-gray-400 group-hover:text-white" />
               <span className="text-xs font-bold text-gray-300 group-hover:text-white uppercase tracking-wider">Edit Profil</span>
           </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 px-6 mb-8">
          <div className="bg-[#232323] p-3 py-4 rounded-2xl border border-white/5 flex flex-col items-center chamfer-clip-sm">
              <span className="text-[9px] text-gray-500 font-bold uppercase text-center mb-1">Total Langkah</span>
              <span className="text-lg font-black text-white">1.2M</span>
          </div>
          <div className="bg-[#232323] p-3 py-4 rounded-2xl border border-white/5 flex flex-col items-center chamfer-clip-sm">
              <span className="text-[9px] text-gray-500 font-bold uppercase text-center mb-1">Streak</span>
              <span className="text-lg font-black text-white flex items-baseline gap-1">
                  {user.streak} <span className="text-[10px] text-gray-500 font-normal">Hari</span>
              </span>
          </div>
          <div className="bg-[#232323] p-3 py-4 rounded-2xl border border-white/5 flex flex-col items-center chamfer-clip-sm">
              <span className="text-[9px] text-gray-500 font-bold uppercase text-center mb-1">Rata-rata</span>
              <span className="text-lg font-black text-white">6.5K</span>
          </div>
      </div>

      {/* Achievements */}
      <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-[#00AEEF]">
                   <div className="w-0.5 h-4 bg-[#00AEEF]"></div>
                   <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pencapaian</h3>
               </div>
               <button className="text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:text-white">Lihat Semua</button>
          </div>

          <div className="grid grid-cols-4 gap-3">
              <div className="aspect-square hex-clip bg-[#232323] border border-yellow-500/20 flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Flame size={20} className="text-yellow-400" />
              </div>
              <div className="aspect-square hex-clip bg-[#232323] border border-cyan-500/20 flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Footprints size={20} className="text-cyan-400" />
              </div>
              <div className="aspect-square hex-clip bg-[#232323] border border-purple-500/20 flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Target size={20} className="text-purple-400" />
              </div>
              <div className="aspect-square hex-clip bg-[#1a1a1a] border border-white/5 flex items-center justify-center">
                  <Lock size={18} className="text-gray-600" />
              </div>
          </div>
      </div>

      {/* Daily Target Item */}
      <div className="px-6">
          <div 
            onClick={() => onNavigate('daily-target')}
            className="bg-[#232323] p-4 rounded-xl border border-white/5 flex items-center justify-between chamfer-clip-sm group cursor-pointer hover:bg-[#2a2a2a] transition-colors"
          >
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1e3a4a] flex items-center justify-center text-[#00AEEF]">
                      <Target size={20} />
                  </div>
                  <div>
                      <h4 className="font-bold text-white text-sm">Target Harian</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Belum Tercapai</p>
                  </div>
              </div>
              <div className="text-gray-500 group-hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>
          </div>
      </div>

    </div>
  );
};

export default Profile;
