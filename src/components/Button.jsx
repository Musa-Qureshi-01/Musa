export const Button = ({
  className = "",
  size = "default",
  children,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 btn-animated glitch-active group";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  return (
    <button className={classes} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2 transition-transform duration-300 group-hover:scale-105">
        {children}
      </span>
      <div className="btn-glitch-layer flex items-center justify-center gap-2" aria-hidden="true">
        {children}
      </div>
    </button>
  );
};
