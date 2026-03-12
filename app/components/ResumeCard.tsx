// app/components/ResumeCard.tsx
import React from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: any; // Using any for now to avoid type conflicts
}) => {
  // DIRECT HTTP GATEWAY: No SDK function calls = No crashes
  const displayPath = imagePath?.startsWith("/")
    ? `https://api.puter.com/v2/fs/read?path=${encodeURIComponent(imagePath)}`
    : imagePath;

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>

        <div className="flex-shrink-0">
          <ScoreCircle score={feedback?.overallScore || 0} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={displayPath}
            alt="resume preview"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            // Fallback if the URL is broken
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/pdf.png";
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
