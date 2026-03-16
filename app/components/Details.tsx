import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

// 1. Clean, High-Contrast Score Badge
const ScoreBadge = ({ score }: { score: number }) => {
  const isHigh = score > 69;
  const isMid = score > 39;

  return (
    <div
      className={cn(
        "flex flex-row gap-2 items-center px-3 py-1 rounded-full border",
        isHigh
          ? "bg-emerald-50 border-emerald-100 text-emerald-700"
          : isMid
            ? "bg-amber-50 border-amber-100 text-amber-700"
            : "bg-rose-50 border-rose-100 text-rose-700",
      )}
    >
      <img
        src={isHigh ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score status"
        className="size-3.5"
      />
      <p className="text-xs font-black tracking-tight">{score}/100</p>
    </div>
  );
};

// 2. Bold Slate-900 Category Header
const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full pr-4">
      <p className="text-xl font-bold text-slate-700 tracking-tighter">
        {title}
      </p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// 3. Refined Feedback Cards
const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 w-full mt-2">
      {/* Overview Grid: Clean Slate-50 background */}
      <div className="bg-slate-50 border border-slate-100 w-full rounded-2xl px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-3 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="status icon"
              className="size-4"
            />
            <p className="text-sm font-bold text-slate-600 truncate">
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Deep Dive: Professional Tinted Cards */}
      <div className="flex flex-col gap-4 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-3 rounded-3xl p-6 border transition-colors",
              tip.type === "good"
                ? "bg-emerald-50/40 border-emerald-100 text-emerald-900"
                : "bg-amber-50/40 border-amber-100 text-amber-900",
            )}
          >
            <div className="flex flex-row gap-3 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="status icon"
                className="size-6"
              />
              <p className="text-lg font-black tracking-tight">{tip.tip}</p>
            </div>
            <p className="text-sm font-medium leading-relaxed text-slate-700/80">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: any }) => {
  // Mapping the data for cleaner iteration
  const categories = [
    { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { id: "content", title: "Content Analysis", data: feedback.content },
    { id: "structure", title: "Structure & Layout", data: feedback.structure },
    { id: "skills", title: "Skill Alignment", data: feedback.skills },
  ];

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in duration-700">
      <Accordion allowMultiple>
        {categories.map((cat) => (
          <AccordionItem id={cat.id} key={cat.id}>
            <AccordionHeader itemId={cat.id}>
              <CategoryHeader
                title={cat.title}
                categoryScore={cat.data.score}
              />
            </AccordionHeader>
            <AccordionContent itemId={cat.id}>
              <CategoryContent tips={cat.data.tips} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Details;
