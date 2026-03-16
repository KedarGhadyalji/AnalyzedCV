import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";
import { cn } from "~/lib/utils";

const Category = ({ title, score }: { title: string; score: number }) => {
  // Quartz Logic: Professional emerald/amber/rose variants
  const textColor =
    score > 70
      ? "text-emerald-600"
      : score > 49
        ? "text-amber-600"
        : "text-rose-600";

  return (
    <div className="resume-summary border-t border-slate-100 first:border-t-0">
      <div className="category p-4">
        <div className="flex flex-row gap-2 items-center justify-center mb-1">
          {/* Theme Update: Slate-900 and font-bold weight */}
          <p className="text-2xl font-bold text-slate-900 tracking-tighter">
            {title}
          </p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl font-bold text-slate-400 tracking-tighter text-center">
          <span className={cn(textColor)}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: any }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm w-full overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-row items-center p-4 gap-8 border-b border-slate-100">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          {/* Theme Update: Slate-900 for primary header */}
          <h2 className="text-2xl font-bold text-slate-900 tracking-tighter">
            Your Resume Score
          </h2>
          <p className="text-sm font-bold text-slate-500 tracking-tight">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      {/* Category List */}
      <div className="flex flex-col">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};

export default Summary;