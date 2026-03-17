import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";
import { cn } from "~/lib/utils";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<any[]>([]);
  const [isWiping, setIsWiping] = useState(false);

  const loadFiles = async () => {
    const items = (await fs.readDir("./")) as any[];
    setFiles(items || []);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading, auth.isAuthenticated]);

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure? This will permanently delete all resumes and analysis data.",
      )
    )
      return;

    setIsWiping(true);
    try {
      // Use Promise.all so we actually wait for deletions to finish
      await Promise.all(files.map((file) => fs.delete(file.path)));
      await kv.flush();
      await loadFiles();
    } catch (err) {
      console.error("Wipe failed:", err);
    } finally {
      setIsWiping(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-quartz-hero flex items-center justify-center">
        <div className="text-slate-400 font-black uppercase tracking-widest animate-pulse">
          Initializing...
        </div>
      </div>
    );
  }

  return (
    <main className="bg-quartz-hero min-h-screen relative overflow-hidden">
      <Navbar />

      <section className="main-section py-16">
        <div className="max-w-2xl mx-auto bg-white/40 backdrop-blur-xl rounded-[40px] border border-white shadow-xl p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
              Data Management
            </h1>
            <p className="text-slate-500 font-bold tracking-tight">
              Authenticated as:{" "}
              <span className="text-indigo-600">{auth.user?.username}</span>
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Local Storage Files ({files.length})
              </h2>
            </div>

            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {files.length > 0 ? (
                files.map((file) => (
                  <div
                    key={file.id}
                    className="flex flex-row items-center justify-between p-4 bg-white/50 border border-slate-100 rounded-2xl"
                  >
                    <p className="text-sm font-black text-slate-900 tracking-tight truncate max-w-[80%]">
                      {file.name}
                    </p>
                    <div className="size-2 rounded-full bg-slate-200" />
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-slate-400 font-medium italic">
                  No files found in storage.
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 pt-6">
              <button
                className={cn(
                  "w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all",
                  isWiping
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-600 hover:text-white cursor-pointer shadow-lg shadow-rose-500/10",
                )}
                onClick={handleDelete}
                disabled={isWiping}
              >
                {isWiping ? "Wiping Data..." : "Wipe App Data"}
              </button>
              <p className="text-[10px] text-rose-400 font-bold uppercase tracking-widest">
                Warning: This action is irreversible
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WipeApp;
