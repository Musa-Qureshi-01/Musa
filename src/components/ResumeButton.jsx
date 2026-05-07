import { Eye, Download } from "lucide-react";

const RESUME_PATH = "/assets/Musa_Qureshi_Resume.pdf";

/**
 * Split Resume Button
 * ─────────────────────────────────────────────────────────
 * LEFT  half → opens the in-portfolio PDF viewer modal
 * RIGHT half → triggers browser download of the PDF
 * ─────────────────────────────────────────────────────────
 */
export const ResumeButton = ({ onView }) => {
  return (
    <>
      {/* Split Button Container */}
      <div
        className="resume-split-btn group w-full flex"
        role="group"
        aria-label="Resume options"
      >
        {/* LEFT — View */}
        <button
          onClick={onView}
          className="resume-split-btn__left flex-1 min-w-0 px-2 sm:px-4"
          aria-label="View Resume"
          id="resume-view-btn"
        >
          <Eye className="w-4 h-4 shrink-0" />
          <span className="text-[11px] sm:text-sm truncate">View Resume</span>
        </button>

        {/* Divider */}
        <div className="resume-split-btn__divider" aria-hidden="true" />

        {/* RIGHT — Download */}
        <a
          href={RESUME_PATH}
          download="Musa_Qureshi_Resume.pdf"
          className="resume-split-btn__right"
          aria-label="Download Resume"
          id="resume-download-btn"
          title="Download PDF"
        >
          <Download className="w-4 h-4 shrink-0" />
        </a>
      </div>
    </>
  );
};
