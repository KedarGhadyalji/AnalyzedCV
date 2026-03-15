import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-700">
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient id="quartzGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4F46E5" /> {/* Indigo 600 */}
              <stop offset="100%" stopColor="#7C3AED" /> {/* Violet 600 */}
            </linearGradient>
          </defs>

          {/* Background track */}
          <path
            d="M10,45 A40,40 0 0,1 90,45"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Foreground arc */}
          <path
            ref={pathRef}
            d="M10,45 A40,40 0 0,1 90,45"
            fill="none"
            stroke="url(#quartzGaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            style={{ 
              strokeDashoffset: pathLength * (1 - percentage),
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)" 
            }}
          />
        </svg>

        {/* Center Display: Focused Typography with Denominator */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                {score}
              </span>
              <span className="text-xl font-bold text-slate-300 tracking-tight">
                /100
              </span>
            </div>
            <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1">
              Resume Score
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;