import React from "react";
import { cn } from "~/lib/utils";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Quartz Logic: Professional contrast and status mapping
  const isHigh = score > 69;
  const isMid = score > 49;

  const scoreColor = isHigh
    ? "text-emerald-600"
    : isMid
      ? "text-amber-600"
      : "text-rose-600";

  const subtitle = isHigh
    ? "Great Job!"
    : isMid
      ? "Good Start"
      : "Needs Improvement";

  return (
    <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Top section: High-contrast header */}
      <div className="p-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
            ATS Score{" "}
            <span className={cn("ml-1", scoreColor)}>{score}/100</span>
          </h2>
          <h3 className="text-xl font-bold text-slate-700 tracking-tight">
            {subtitle}
          </h3>
        </div>

        {/* Simple Progress visualization */}
        <div className="w-full md:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-1000 ease-out",
              isHigh
                ? "bg-emerald-500"
                : isMid
                  ? "bg-amber-500"
                  : "bg-rose-500",
            )}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="p-8 pt-0">
        {/* Description Section */}
        <div className="mb-8">
          <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
            This score represents how well your resume is likely to perform in
            Applicant Tracking Systems used by employers.
          </p>
        </div>

        {/* Suggestions list: Professional Card Layout */}
        <div className="grid grid-cols-1 gap-3">
          {suggestions.map((suggestion, index) => {
            const isGood = suggestion.type === "good";
            return (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4 p-5 rounded-2xl border transition-colors",
                  isGood
                    ? "bg-emerald-50/40 border-emerald-100/50"
                    : "bg-amber-50/40 border-amber-100/50",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                    isGood
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-500 text-white",
                  )}
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isGood ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    )}
                  </svg>
                </div>
                <p
                  className={cn(
                    "font-bold text-sm leading-snug",
                    isGood ? "text-emerald-900" : "text-amber-900",
                  )}
                >
                  {suggestion.tip}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing encouragement */}
        <div className="mt-8 pt-6 border-t border-slate-50">
          <p className="text-slate-400 font-medium italic text-sm">
            Keep refining your resume to improve your chances of getting past
            ATS filters and into the hands of recruiters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATS;
