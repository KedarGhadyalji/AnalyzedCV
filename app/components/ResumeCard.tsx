import React from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback },
}: {
  resume: any;
}) => {
  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card group animate-in fade-in duration-700"
    >
      {/* Header: High Contrast Slate 900 for Name and Indigo 600 for Role */}
      <div className="resume-card-header mb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-900 font-black text-2xl tracking-tighter leading-tight">
            {companyName}
          </h2>
          <h3 className="text-lg font-bold tracking-tight text-indigo-600">
            {jobTitle}
          </h3>
        </div>
        <div className="shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
          <ScoreCircle score={feedback?.overallScore || 0} />
        </div>
      </div>

      {/* Enhanced Quartz Blueprint View */}
      <div className="gradient-border h-full overflow-hidden relative">
        <div className="w-full h-full rounded-[20px] bg-white flex flex-col p-8 relative overflow-hidden border border-slate-100">
          {/* 1. Technical Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]" />

          {/* 2. Metadata Coordinates (Subtle for balance) */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest flex gap-4">
            <span>REF: {id.slice(0, 8)}</span>
          </div>
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-300 uppercase">
            ENGINE: ANALYZEDCV
          </div>

          {/* 3. High-Intensity Scan Line */}
          <div className="absolute inset-0 w-full h-0.5 bg-linear-to-r from-transparent via-indigo-500/40 to-transparent animate-[scan_4s_infinite] z-20" />

          {/* 4. Abstract Resume Skeleton */}
          <div className="flex flex-col gap-8 mt-6 relative z-10">
            {/* Profile Section */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl primary-gradient opacity-20 shadow-inner" />
              <div className="flex flex-col gap-2">
                <div className="w-32 h-3 bg-slate-200 rounded-full" />
                <div className="w-20 h-2 bg-slate-100 rounded-full" />
              </div>
            </div>

            {/* Experience Blocks */}
            <div className="flex flex-col gap-6">
              {/* Block 1 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                  <div className="w-24 h-2 bg-emerald-400/20 rounded-full" />
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full" />
                <div className="w-[90%] h-2 bg-slate-100 rounded-full" />
              </div>

              {/* Block 2 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                  <div className="w-20 h-2 bg-indigo-400/20 rounded-full" />
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full" />
                <div className="w-[85%] h-2 bg-slate-100 rounded-full" />
              </div>
            </div>

            {/* Bottom Insight Row */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <div className="w-4 h-1 bg-indigo-200 rounded-full" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                  <div className="w-4 h-1 bg-slate-200 rounded-full" />
                </div>
              </div>
              <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md uppercase tracking-tight">
                ATS VERIFIED
              </span>
            </div>
          </div>

          {/* Premium Hover Overlay (Glassmorphism) */}
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-all duration-500 z-30">
            <div className="bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-2xl font-black tracking-tight scale-90 group-hover:scale-100 transition-all duration-500">
              OPEN FULL REPORT
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
