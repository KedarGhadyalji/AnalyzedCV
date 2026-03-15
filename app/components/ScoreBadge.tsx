import React from "react";
import { cn } from "~/lib/utils";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const isStrong = score > 70;
  const isGood = score > 49;

  // Quartz Logic: Clean mapping of status to professional colors
  const status = isStrong
    ? {
        label: "Strong",
        colors: "bg-emerald-50 text-emerald-700 border-emerald-100",
      }
    : isGood
      ? {
          label: "Good Start",
          colors: "bg-amber-50 text-amber-700 border-amber-100",
        }
      : {
          label: "Needs Work",
          colors: "bg-rose-50 text-rose-700 border-rose-100",
        };

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-tight transition-all",
        status.colors,
      )}
    >
      {status.label}
    </div>
  );
};

export default ScoreBadge;
