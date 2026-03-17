import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (resumeBlob) {
        const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
        setResumeUrl(URL.createObjectURL(pdfBlob));
      }

      const imageBlob = await fs.read(data.imagePath);
      if (imageBlob) {
        setImageUrl(URL.createObjectURL(imageBlob));
      }

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="pt-0!">
      <nav className="resume-nav bg-white/80 backdrop-blur-md border-b border-slate-100">
        <Link to="/" className="back-button group">
          <img src="/icons/back.svg" alt="back" className="w-2.5 h-2.5 transition-transform group-hover:-translate-x-1" />
          <span className="text-slate-800 text-sm font-bold uppercase tracking-tight">
            Back to Dashboard
          </span>
        </Link>
      </nav>

      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        {/* Left Section: Visual Preview with Custom Gradient BG */}
        <section className="feedback-section bg-quartz-hero h-screen sticky top-0 items-center justify-center border-r border-slate-100">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 max-sm:m-0 h-[85%] w-fit drop-shadow-2xl">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                <img
                  src={imageUrl}
                  className="h-full object-contain rounded-2xl border border-white/50 bg-white"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>

        {/* Right Section: Analysis Content */}
        <section className="feedback-section bg-white min-h-screen">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tighter mb-8">
            Resume Review
          </h2>
          
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-20">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-20">
              <img src="/images/resume-scan-2.gif" className="w-[300px]" />
              <p className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-xs">
                Analyzing Document...
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;