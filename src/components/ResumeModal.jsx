import { useEffect } from "react";
import { X, Download, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const RESUME_PATH = "/assets/Musa_Qureshi_Resume.pdf";

export const ResumeModal = ({ isOpen, onClose }) => {
  // Lock body scroll + close on Esc + close on scroll
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    const handleScroll = () => onClose();

    document.addEventListener("keydown", handleKey);
    window.addEventListener("wheel", handleScroll, { passive: true });
    window.addEventListener("touchmove", handleScroll, { passive: true });

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Outer wrapper — matches ProjectModal pattern exactly */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">

        {/* Dimmer Backdrop — same as ProjectModal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden pointer-events-auto flex flex-col"
          style={{ height: "82vh" }}
        >
          {/* Close button — top right, same as ProjectModal */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10 hover:border-white/30"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={RESUME_PATH}
              download="Musa_Qureshi_Resume.pdf"
              title="Download PDF"
              className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-primary hover:text-white transition-colors border border-primary/30 hover:border-primary/60"
            >
              <Download className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-zinc-400 hover:text-white transition-colors border border-white/10 hover:border-white/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* PDF Viewer fills the entire panel */}
          <div className="flex-1 overflow-hidden bg-zinc-900">
            <iframe
              src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
              className="w-full h-full border-0"
              title="Musa Qureshi Resume"
            />
          </div>

          {/* Footer bar */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-white/10 bg-zinc-950 shrink-0">
            <span className="text-xs text-zinc-600 font-body">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-500">Esc</kbd> or scroll to close
            </span>
            <a
              href={RESUME_PATH}
              download="Musa_Qureshi_Resume.pdf"
              className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
