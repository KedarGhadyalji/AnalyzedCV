import React from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const radius = 40;
  const stroke = 7; // Thinned slightly for a more precise, professional look
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = score / 100;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="relative w-[100px] h-[100px] group">
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        <defs>
          {/* Quartz Signature Gradient: Indigo to Violet */}
          <linearGradient
            id="quartz-circle-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Background track: Clean Slate-100 */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="#f1f5f9"
          strokeWidth={stroke}
          fill="transparent"
        />

        {/* Progress bar: High-contrast Indigo-Violet */}
        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="url(#quartz-circle-grad)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      {/* Center Display: High-Contrast Slate-900 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-slate-900 tracking-tighter leading-none">
          {score}
        </span>
        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
          Pts
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
