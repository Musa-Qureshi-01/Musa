import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export const ProjectMediaFrame = ({ project, projectImage, isLight }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const containerRef = useRef(null);

  // Reset state when hover ends
  useEffect(() => {
    if (!isHovered) {
      setIframeLoaded(false);
    }
  }, [isHovered]);

  const hasLoomVideo = project.resources && project.resources.video && project.resources.video.includes("loom.com");
  
  // Format the Loom embed URL with query parameters
  const getEmbedUrl = (url) => {
    if (!url) return "";
    let cleanUrl = url.split('?')[0];
    if (cleanUrl.includes("/share/")) {
      cleanUrl = cleanUrl.replace("/share/", "/embed/");
    }
    return cleanUrl;
  };

  const videoUrl = hasLoomVideo 
    ? `${getEmbedUrl(project.resources.video)}?autoplay=1&muted=1&hide_share=true&hideEmbedTopBar=true&hide_title=true&hide_owner=true`
    : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-[16px] md:rounded-[22px] border transition-all duration-500 bg-[#070708] select-none
        ${isLight ? "border-zinc-850" : "border-zinc-300"}`}
      onMouseEnter={() => {
        if (hasLoomVideo) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (hasLoomVideo) setIsHovered(false);
      }}
    >
      {/* 1. Static Image View */}
      <motion.img
        src={projectImage}
        alt={project.title}
        className="w-full h-full object-cover bg-transparent select-none pointer-events-none"
        animate={{ 
          scale: isHovered ? 1.04 : 1,
          opacity: (isHovered && iframeLoaded) ? 0 : 1
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Hover Prompt/Hint Overlay */}
      {hasLoomVideo && !isHovered && (
        <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-black/75 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2 text-white text-[10px] md:text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            <span>Hover to Play Demo</span>
          </div>
        </div>
      )}

      {/* 2. Interactive Video View */}
      {hasLoomVideo && isHovered && (
        <div className="absolute inset-0 w-full h-full z-10 bg-[#070708]">
          <iframe
            src={videoUrl}
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
            allow="autoplay; fullscreen"
            onLoad={() => setIframeLoaded(true)}
            className={`w-full h-full absolute inset-0 transition-opacity duration-500 ${
              iframeLoaded ? "opacity-100 animate-fade-in" : "opacity-0"
            }`}
            style={{ width: "100%", height: "100%" }}
          />

          {/* Loading Spinner */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Initializing Loom...</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
