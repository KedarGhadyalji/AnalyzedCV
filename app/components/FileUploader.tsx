import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize, cn } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className={cn(
          "relative p-12 text-center transition-all duration-300 cursor-pointer bg-white rounded-2xl min-h-[220px] flex items-center justify-center border-2 border-dashed",
          isDragActive
            ? "border-indigo-500 bg-indigo-50/30"
            : "border-slate-100 hover:border-slate-200",
        )}
      >
        <input {...getInputProps()} />

        <div className="w-full">
          {file ? (
            <div
              className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <div className="size-12 bg-white border border-slate-200 rounded-lg flex items-center justify-center shadow-sm shrink-0">
                  <img src="/images/pdf.png" alt="pdf" className="size-7" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-black text-slate-900 truncate max-w-[200px] md:max-w-xs tracking-tight uppercase">
                    {file.name}
                  </p>
                  <p className="text-xs font-bold text-slate-400">
                    {formatSize(file.size)} • READY
                  </p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-slate-200 rounded-full transition-colors group cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4 opacity-50 group-hover:opacity-100"
                />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div
                  className={cn(
                    "size-16 rounded-2xl flex items-center justify-center transition-colors duration-300",
                    isDragActive ? "text-indigo-600" : "text-slate-300",
                  )}
                >
                  <svg
                    className="size-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-lg text-slate-900 font-bold">
                  <span className="text-indigo-600">Click to upload</span> or
                  drag resume
                </p>
                <p className="text-sm font-bold text-slate-400">
                  PDF Documents (Max {formatSize(maxFileSize)})
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
