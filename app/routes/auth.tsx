import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "AnalyzedCV | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-quartz-hero min-h-screen flex items-center justify-center p-6">
      {/* The "Quartz" Login Card */}
      <div className="w-full max-w-[680px] bg-white/80 backdrop-blur-2xl rounded-[40px] border border-white p-12 shadow-2xl shadow-indigo-500/5">
        <section className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Logo: Quartz Two-tone branding */}
            <div className="flex items-center group">
              <span className="text-4xl brand-first transition-colors group-hover:text-indigo-600">
                Analyzed
              </span>
              <span className="text-4xl brand-second">CV</span>
            </div>

            {/* Theme Update: Slate-900 and font-bold weight */}
            <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">
              Welcome Back
            </h1>

            <h2 className="text-lg font-bold text-slate-400 tracking-tight">
              Log in to track your career progress
            </h2>
          </div>

          <div className="flex justify-center">
            {isLoading ? (
              <button className="auth-button animate-pulse opacity-70 cursor-not-allowed">
                <span className="font-bold uppercase tracking-tight">
                  Signing you in...
                </span>
              </button>
            ) : (
              <button
                className="auth-button group relative overflow-hidden transition-all"
                onClick={auth.isAuthenticated ? auth.signOut : auth.signIn}
              >
                <span className="font-bold uppercase tracking-tight">
                  {auth.isAuthenticated ? "Log Out" : "Log In to AnalyzedCV"}
                </span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
