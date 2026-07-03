import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Button = ({
  className = "",
  size = "default",
  variant = "primary",
  as = "button",
  children,
  ...props
}) => {
  // Select active component tag (supports button, external anchor, or React Router Link)
  let Component;
  if (as === "button") {
    Component = motion.button;
  } else if (as === "a") {
    Component = motion.a;
  } else if (as === Link) {
    Component = motion(Link);
  } else {
    Component = motion(as);
  }

  // Spring animations configuration
  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 18,
  };

  const baseClasses =
    "relative overflow-hidden font-semibold tracking-wider transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none flex items-center justify-center gap-2 group cursor-pointer rounded-full outline-none btn-animated glitch-active";

  const sizeClasses = {
    sm: "px-4 py-1.5 text-xs h-9",
    default: "px-6 py-2.5 text-xs h-11",
    lg: "px-7 py-3 text-xs h-11 lg:h-12",
  };

  // Light Theme and Dark Theme responsive color mappings
  const variantClasses = {
    primary:
      "bg-foreground text-background border border-transparent shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:opacity-90 active:scale-[0.98]",
    outline:
      "bg-transparent text-foreground border border-border/80 hover:border-foreground/80 hover:bg-foreground hover:text-background active:scale-[0.98]",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <Component
      className={classes}
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={springTransition}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
        {children}
      </span>
      {/* Glitch hover layers */}
      <div className="btn-glitch-layer flex items-center justify-center gap-1.5" aria-hidden="true">
        {children}
      </div>
      {/* Premium subtle gloss highlight sheen overlay */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0 pointer-events-none" />
    </Component>
  );
};
