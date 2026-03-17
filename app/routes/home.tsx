import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AnalyzedCV | Home" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-quartz-hero min-h-screen relative overflow-hidden">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          {/* Theme Update: Slate-900 and font-bold weight */}
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter leading-tight">
            Track Your Applications & Resume Ratings
          </h1>

          {!loadingResumes && resumes?.length === 0 ? (
            <h2 className="text-xl font-bold text-slate-400 tracking-tight">
              No resumes found. Upload your first resume to AnalyzedCV to get
              feedback.
            </h2>
          ) : (
            <h2 className="text-xl font-bold text-slate-400 tracking-tight">
              Review your submissions and check AI-powered feedback.
            </h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center animate-pulse">
            <img src="/images/resume-scan-2.gif" className="w-[200px]" />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-10 gap-4">
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-bold uppercase tracking-tight"
            >
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
