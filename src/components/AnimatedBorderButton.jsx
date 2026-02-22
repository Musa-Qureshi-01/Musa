import { Download } from "lucide-react";

export const AnimatedBorderButton = ({ children, href, className, hoverImageUrl, ...props }) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      className={`relative inline-flex items-center justify-center bg-transparent border border-border 
        text-foreground hover:border-primary/50 transition-all 
        duration-1000 focus:outline-none focus-visible:ring-2 
        focus-visible:ring-primary focus-visible:ring-offset-2 
        disabled:opacity-50 disabled:cursor-not-allowed group 
        px-8 py-4 text-lg font-medium rounded-full overflow-hidden 
        animated-border ${className || ""}`}
      {...props}
    >
      {/* Optional Hover Image Background */}
      {hoverImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
          style={{ backgroundImage: `url('${hoverImageUrl}')` }}
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}
      {/* Animated SVG Border */}
      <svg
        className="absolute left-0 top-0 w-full h-full pointer-events-none download-cv-border"
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <path
          d="M 30,1 A 29,29 0 0 0 1,30 L 1,30 A 29,29 0 0 0 30,59 L 170,59 A 29,29 0 0 0 199,30 L 199,30 A 29,29 0 0 0 170,1 Z"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="400 550"
          strokeDashoffset="400"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animated-border-path"
        />
      </svg>
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
};
