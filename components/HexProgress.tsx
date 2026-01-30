import React from 'react';

interface HexProgressProps {
  percentage: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
}

const HexProgress: React.FC<HexProgressProps> = ({ 
  percentage, 
  size = 280, 
  strokeWidth = 14,
  children
}) => {
  // Pointy-topped hexagon points in 100x100 viewbox
  // Top (50, 2), TopRight (93, 26), BtmRight (93, 74), Btm (50, 98), BtmLeft (7, 74), TopLeft (7, 26)
  const points = "50,2 93.3,27 93.3,73 50,98 6.7,73 6.7,27";
  
  // Approximate perimeter
  const perimeter = 290; 
  
  // Calculate dash offset
  const dashOffset = perimeter - (perimeter * percentage) / 100;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full transform scale-75" />

      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        className="rotate-180 transform drop-shadow-[0_0_10px_rgba(0,85,255,0.5)]" 
        style={{ overflow: 'visible' }}
      >
        {/* Track (Background) */}
        <polygon
          points={points}
          fill="rgba(0,0,0,0.2)"
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        
        {/* Progress Fill */}
        <path
          d="M50,98 L6.7,73 L6.7,27 L50,2 L93.3,27 L93.3,73 Z" 
          fill="none"
          stroke="url(#blueGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={perimeter}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
          style={{ 
             transformOrigin: '50% 50%',
             transform: 'rotate(180deg)'
          }}
        />

        {/* Inner thin decoration line */}
         <polygon
          points={points}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="1"
          transform="scale(0.85) translate(8.5, 8.5)"
        />

        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00AEEF" />
            <stop offset="100%" stopColor="#0055FF" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
        {children}
      </div>
    </div>
  );
};

export default HexProgress;
