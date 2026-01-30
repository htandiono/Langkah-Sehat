import React, { useState } from 'react';
import { UserStats, TimeRange } from '../types';
import { Download, Clock, Flame, Calendar, ChevronRight } from 'lucide-react';

interface StatisticsProps {
  user: UserStats;
}

// Mock Data Configuration for different time ranges
const DATA_CONFIG = {
  harian: {
    avgLabel: "Total Langkah",
    avgValue: "5.420",
    avgTrend: "+5%",
    distLabel: "Jarak",
    distValue: "4,2",
    // 24 hours (simulated hourly data points)
    points: [0, 0, 0, 0, 0, 10, 30, 60, 85, 70, 50, 30, 40, 45, 20, 10, 30, 50, 40, 20, 10, 5, 0, 0],
    labels: ["00", "04", "08", "12", "16", "20", "24"],
    activePoint: { xPercent: 33, yPercent: 15, val: "1.204" }, // Approx 08:00
    metrics: { duration: "5j 24m", calories: "324" },
    bestPerf: { label: "Jam Tersibuk", val: "07:00 - 08:00", metric: "1.204" }
  },
  mingguan: {
    avgLabel: "Rata-rata",
    avgValue: "6.842",
    avgTrend: "+12%",
    distLabel: "Total Jarak",
    distValue: "42,5",
    // 7 days
    points: [45, 55, 35, 75, 60, 85, 70],
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    activePoint: { xPercent: 83, yPercent: 15, val: "8.240" }, // Saturday
    metrics: { duration: "38j 10m", calories: "2.840" },
    bestPerf: { label: "Hari Terbaik", val: "Jumat, 14 Okt", metric: "8.240" }
  },
  bulanan: {
    avgLabel: "Rata-rata",
    avgValue: "6.100",
    avgTrend: "-2%",
    distLabel: "Total Jarak",
    distValue: "158,4",
    // ~30 days (simulated points)
    points: [50, 60, 55, 45, 70, 80, 65, 55, 60, 75, 90, 80, 60, 50, 45],
    labels: ["1", "5", "10", "15", "20", "25", "30"],
    activePoint: { xPercent: 66, yPercent: 10, val: "9.150" }, // ~Day 21
    metrics: { duration: "142j 15m", calories: "12.450" },
    bestPerf: { label: "Minggu Terbaik", val: "Minggu Ke-3", metric: "54.200" }
  }
};

const Statistics: React.FC<StatisticsProps> = ({ user }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('mingguan');
  const data = DATA_CONFIG[timeRange];

  // Helper to generate polyline points string for SVG
  const generatePolylinePoints = (points: number[]) => {
    const width = 300;
    const height = 100;
    const maxVal = 100; // Assuming normalized 0-100 data
    
    return points.map((val, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height - (val / maxVal) * height;
        return `${x},${y}`;
    }).join(' ');
  };
  
  // Helper to generate closed area path for gradient fill
  const generateAreaPath = (points: number[]) => {
      const linePoints = generatePolylinePoints(points).replace(/ /g, ' L');
      const firstPoint = linePoints.split(' ')[0].substring(1);
      return `M${firstPoint} L${linePoints} L300,100 L0,100 Z`;
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto pt-8 relative overflow-y-auto no-scrollbar pb-24 bg-[#1e1e1e]">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 mb-6">
        <h1 className="text-xl font-bold text-white">Statistik Aktivitas</h1>
        <button className="flex items-center gap-1 text-[#00AEEF] text-[10px] font-bold uppercase tracking-wider hover:text-white transition-colors bg-[#2a2a2a] px-2 py-1 rounded border border-white/5">
            EXPORT DATA <Download size={12} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex bg-[#121212] rounded-lg p-1 border border-white/5">
            {(['Harian', 'Mingguan', 'Bulanan'] as const).map((t) => {
                const key = t.toLowerCase() as TimeRange;
                const isActive = timeRange === key;
                return (
                    <button 
                        key={key}
                        onClick={() => setTimeRange(key)}
                        className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${isActive ? 'bg-[#00AEEF] text-white shadow-lg shadow-blue-500/30' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {t}
                    </button>
                )
            })}
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="mx-6 p-5 bg-[#232323] rounded-2xl border border-white/5 relative mb-6 chamfer-clip-sm transition-all duration-300">
          <div className="flex justify-between items-start mb-8">
              <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{data.avgLabel}</p>
                  <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-black text-white">{data.avgValue}</h2>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${data.avgTrend.includes('+') ? 'bg-[#1e3a4a] text-[#00AEEF]' : 'bg-red-900/20 text-red-400'}`}>
                        {data.avgTrend}
                      </span>
                  </div>
              </div>
              <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{data.distLabel}</p>
                  <h2 className="text-2xl font-black text-white">{data.distValue} <span className="text-sm font-semibold text-gray-500">km</span></h2>
              </div>
          </div>

          {/* Custom SVG Chart */}
          <div className="w-full h-32 relative">
               {/* Tooltip Simulation */}
               <div 
                  className="absolute top-0 -translate-x-1/2 -translate-y-full mb-2 bg-[#00AEEF] text-white text-xs font-bold px-2 py-1 rounded shadow-lg after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#00AEEF] transition-all duration-300 z-10"
                  style={{ left: `${data.activePoint.xPercent}%`, top: `${data.activePoint.yPercent}%` }}
               >
                   {data.activePoint.val}
               </div>
               
               <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                   <defs>
                       <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="0%" stopColor="#00AEEF" stopOpacity="0.5"/>
                           <stop offset="100%" stopColor="#00AEEF" stopOpacity="0"/>
                       </linearGradient>
                   </defs>
                   {/* Grid Lines */}
                   <line x1="0" y1="25" x2="300" y2="25" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                   <line x1="0" y1="50" x2="300" y2="50" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />
                   <line x1="0" y1="75" x2="300" y2="75" stroke="#333" strokeWidth="1" strokeDasharray="4 4" />

                   {/* Fill Area */}
                   <path 
                     d={generateAreaPath(data.points)}
                     fill="url(#chartGradient)"
                     className="transition-all duration-500 ease-in-out"
                   />

                   {/* Line Polyline */}
                   <polyline 
                    points={generatePolylinePoints(data.points)}
                    fill="none"
                    stroke="#00AEEF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-500 ease-in-out"
                   />
                   
                   {/* Active Point Halo */}
                   <circle 
                      cx={(data.activePoint.xPercent / 100) * 300} 
                      cy={(data.activePoint.yPercent / 100) * 100} 
                      r="6" 
                      fill="#00AEEF" 
                      opacity="0.3"
                      className="animate-pulse"
                   />
                   {/* Active Point Dot */}
                   <circle 
                      cx={(data.activePoint.xPercent / 100) * 300} 
                      cy={(data.activePoint.yPercent / 100) * 100} 
                      r="3" 
                      fill="#1e1e1e" 
                      stroke="#fff" 
                      strokeWidth="2" 
                   />
               </svg>
          </div>
          
          <div className="flex justify-between mt-4 text-[9px] text-gray-500 font-bold uppercase tracking-wider">
              {data.labels.map((label, idx) => (
                  <span key={idx} className={idx === data.labels.length - 1 ? 'text-white' : ''}>{label}</span>
              ))}
          </div>
      </div>

      <div className="px-6 mb-4 border-l-4 border-[#00AEEF] ml-6 h-4 flex items-center">
          <h3 className="text-white font-bold text-sm">Metrik Lanjutan</h3>
      </div>

      {/* Metrics Grid */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#232323] p-4 rounded-xl border border-white/5 group hover:bg-[#2a2a2a] transition-colors">
              <div className="flex items-center gap-2 mb-3 text-purple-400">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-purple-300 transition-colors">Durasi Aktif</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{data.metrics.duration}</h3>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 w-[70%]"></div>
              </div>
          </div>
          
          <div className="bg-[#232323] p-4 rounded-xl border border-white/5 group hover:bg-[#2a2a2a] transition-colors">
              <div className="flex items-center gap-2 mb-3 text-orange-400">
                  <Flame size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-orange-300 transition-colors">Kalori Bakar</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{data.metrics.calories}</h3>
              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 w-[85%]"></div>
              </div>
          </div>
      </div>

      {/* Best Performance */}
      <div className="mx-6 p-4 bg-gradient-to-r from-[#1e293b] to-[#232323] rounded-xl border border-white/5 flex justify-between items-center mb-6 chamfer-clip-sm">
          <div>
              <p className="text-[#00AEEF] text-[10px] font-bold uppercase tracking-widest mb-1">{data.bestPerf.label}</p>
              <p className="text-white font-bold text-sm">{data.bestPerf.val}</p>
          </div>
          <div className="text-right">
              <h3 className="text-xl font-black text-white">{data.bestPerf.metric}</h3>
              <p className="text-[9px] text-gray-500 font-bold uppercase">Langkah</p>
          </div>
      </div>
      
      {/* Calendar / History Link (Decoration) */}
      <div className="px-6">
        <button className="w-full py-4 rounded-xl border border-white/5 bg-[#1a1a1a] flex items-center justify-between px-4 text-gray-400 hover:text-white hover:bg-[#232323] transition-colors">
            <div className="flex items-center gap-3">
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase tracking-wide">Lihat Riwayat Lengkap</span>
            </div>
            <ChevronRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default Statistics;
