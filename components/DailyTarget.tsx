import React, { useState } from 'react';
import { ChevronLeft, Target, Flame, Check } from 'lucide-react';
import HexProgress from './HexProgress';

interface DailyTargetProps {
  currentTarget: number;
  onBack: () => void;
}

const DailyTarget: React.FC<DailyTargetProps> = ({ currentTarget, onBack }) => {
  const [stepTarget, setStepTarget] = useState(currentTarget); // Default 8000
  const [calorieTarget, setCalorieTarget] = useState(400);

  const presets = [6000, 8000, 10000, 12000];

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-8 relative overflow-y-auto no-scrollbar pb-24 bg-[#1e1e1e]">
      
      {/* Header */}
      <div className="flex items-center px-6 mb-6">
        <button 
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-[#2a2a2a] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#333] transition-colors mr-4"
        >
            <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-white uppercase tracking-wide">Target Harian</h1>
      </div>

      {/* Visual Indicator */}
      <div className="flex justify-center mb-8 scale-90">
         <HexProgress percentage={100} size={240} strokeWidth={8}>
            <div className="flex flex-col items-center">
                <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">Target Baru</span>
                <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-xl">
                    {stepTarget.toLocaleString('id-ID')}
                </h1>
                <span className="text-[#00AEEF] text-xs font-bold tracking-widest uppercase mt-2">Langkah / Hari</span>
            </div>
         </HexProgress>
      </div>

      {/* Step Target Control */}
      <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
                  <Target size={16} className="text-[#00AEEF]" /> Target Langkah
              </label>
              <span className="text-[#00AEEF] font-mono font-bold bg-[#00AEEF]/10 px-2 py-1 rounded text-xs">
                  {stepTarget.toLocaleString()}
              </span>
          </div>

          <input 
            type="range" 
            min="2000" 
            max="20000" 
            step="500"
            value={stepTarget}
            onChange={(e) => setStepTarget(parseInt(e.target.value))}
            className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#00AEEF] mb-6 hover:accent-[#0055FF] transition-all"
          />

          <div className="grid grid-cols-4 gap-2">
              {presets.map(preset => (
                  <button
                    key={preset}
                    onClick={() => setStepTarget(preset)}
                    className={`py-2 px-1 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                        stepTarget === preset 
                        ? 'bg-[#00AEEF] border-[#00AEEF] text-white shadow-lg shadow-blue-500/30' 
                        : 'bg-[#232323] border-white/10 text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
                    }`}
                  >
                      {preset / 1000}K
                  </button>
              ))}
          </div>
      </div>

      {/* Calorie Target Control (Secondary) */}
      <div className="px-6 mb-8">
          <div className="bg-[#232323] border border-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase tracking-wider">
                    <Flame size={14} className="text-orange-500" /> Target Kalori (Est.)
                </label>
                <span className="text-orange-500 font-mono font-bold text-xs">
                    {calorieTarget} kcal
                </span>
            </div>
            
            <input 
                type="range" 
                min="100" 
                max="1000" 
                step="50"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
      </div>

      {/* Action Button */}
      <div className="px-6 mt-auto">
          <button 
            onClick={onBack}
            className="w-full bg-[#1e1e1e] border border-[#00AEEF] text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group chamfer-clip-sm"
          >
              <Check size={18} />
              <span className="group-hover:translate-x-1 transition-transform">SIMPAN TARGET</span>
          </button>
      </div>

    </div>
  );
};

export default DailyTarget;
