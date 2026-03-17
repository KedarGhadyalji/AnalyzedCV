import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "~/constants";
import { cn } from "~/lib/utils";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const extractJSON = (text: string) => {
    try {
      const match =
        text.match(/```json\s*([\s\S]*?)\s*```/) ||
        text.match(/```\s*([\s\S]*?)\s*```/);
      const cleanText = match ? match[1] : text;
      const start = cleanText.indexOf("{");
      const end = cleanText.lastIndexOf("}");
      if (start === -1 || end === -1) throw new Error("No JSON object found");
      return JSON.parse(cleanText.substring(start, end + 1));
    } catch (e) {
      console.error("Extraction failed:", e);
      return null;
    }
  };

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    try {
      setStatusText("Uploading original document...");
      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) throw new Error("Failed to upload PDF");

      setStatusText("Generating visual preview...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file) throw new Error("Failed to convert PDF to image");

      setStatusText("Finalizing preview paths...");
      const uploadedImage = await fs.upload([imageFile.file]);
      if (!uploadedImage) throw new Error("Failed to upload preview image");

      const signedImageUrl = await fs.getContentUrl(uploadedImage.path);

      setStatusText("Preparing analysis metrics...");
      const uuid = generateUUID();
      const data: any = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: signedImageUrl || uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };

      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analyzing with Quartz Intelligence...");
      const feedbackResponse = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription }),
      );

      if (!feedbackResponse) throw new Error("AI Analysis failed");

      const feedbackText =
        typeof feedbackResponse.message.content === "string"
          ? feedbackResponse.message.content
          : (feedbackResponse.message.content as any)[0].text;

      const parsedFeedback = extractJSON(feedbackText);
      if (!parsedFeedback) throw new Error("Invalid AI JSON format");

      data.feedback = parsedFeedback;
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Success! Redirecting...");
      navigate(`/resume/${uuid}`);
    } catch (err: any) {
      console.error("Quartz Analysis Error:", err);
      setStatusText(`Error: ${err.message}`);
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;
    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-quartz-hero min-h-screen relative overflow-hidden">
      <Navbar />

      <section className="main-section pb-20">
        <div className="page-heading py-16">
          <h1 className="text-5xl font-bold text-slate-900 tracking-tighter leading-tight">
            Analyze Resume against Job Description
          </h1>

          {isProcessing ? (
            <div className="flex flex-col items-center gap-6 mt-10">
              <h2 className="text-xl font-bold text-indigo-600 tracking-tight animate-pulse">
                {statusText}
              </h2>
              <div className="w-full max-w-xl rounded-4xl overflow-hidden border-4 border-white shadow-2xl">
                <img src="/images/resume-scan.gif" className="w-full" />
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-bold text-slate-400 tracking-tight">
              Submit your details to generate professional feedback and ATS
              optimization tips.
            </h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 mt-12 bg-white/40 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-div">
                  <label
                    htmlFor="company-name"
                    className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company-name"
                    placeholder="e.g. Google"
                    id="company-name"
                    className="w-full bg-white border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="form-div">
                  <label
                    htmlFor="job-title"
                    className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="job-title"
                    placeholder="e.g. Software Engineer"
                    id="job-title"
                    className="w-full bg-white border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div className="form-div">
                <label
                  htmlFor="job-description"
                  className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1"
                >
                  Job Description
                </label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Paste the requirements here..."
                  id="job-description"
                  className="w-full bg-white border-slate-100 rounded-2xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div className="form-div">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1 mb-2 block">
                  Upload Resume
                </label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              {/* Centered Button Container */}
              <div className="w-full flex justify-center mt-2">
                <button
                  className="primary-button py-4 px-12 text-lg font-black uppercase tracking-widest"
                  type="submit"
                >
                  Analyze Resume
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
