import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 1. Calendar Flip Text Effect (Hero Tagline)
export const FlipText = ({ phrases, className = "" }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % phrases.length);
        }, 3000); // 3 seconds per phrase
        return () => clearInterval(interval);
    }, [phrases.length]);

    return (
        <div className={`relative inline-block overflow-hidden h-[1.2em] font-accent ${className}`}>
            {phrases.map((phrase, idx) => (
                <motion.span
                    key={idx}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{
                        y: current === idx ? "0%" : current > idx ? "-100%" : "100%",
                        opacity: current === idx ? 1 : 0
                    }}
                    transition={{
                        duration: 0.5,
                        ease: "easeOut"
                    }}
                    className={`absolute inset-0 whitespace-nowrap ${current !== idx ? 'pointer-events-none' : ''}`}
                    style={{ position: current === idx ? 'relative' : 'absolute' }}
                >
                    {phrase}
                </motion.span>
            ))}
        </div>
    );
};

// 2. Letter-by-Letter Load-in (Headings)
export const LetterReveal = ({ text, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay },
        },
    };

    const child = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <motion.h2
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            className={`inline-block ${className}`}
        >
            {text.split("").map((char, index) => (
                <motion.span key={index} variants={child} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.h2>
    );
};

// 3. Scroll-Triggered Text Reveal (Default Content)
export const ScrollReveal = ({ children, className = "", delay = 0, blur = true }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 20,
                    filter: blur ? "blur(4px)" : "blur(0px)"
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.6, ease: "easeOut", delay }
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// 4. Left-to-Right Text Wipe (Accent)
export const WipeReveal = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [isInView, controls]);

    return (
        <div className={`relative overflow-hidden ${className}`} ref={ref}>
            <motion.div
                initial={{ x: "-100%" }}
                animate={controls}
                variants={{
                    visible: { x: "100%" }
                }}
                transition={{ duration: 0.8, ease: "easeInOut", delay }}
                className="absolute inset-0 bg-primary z-10"
                style={{ mixBlendMode: "difference" }} // Cool effect if on white, otherwise just a block
            />
            {/* Simplified Wipe: Just reveal content itself with clip path */}
            <motion.div
                initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                animate={controls}
                variants={{
                    visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// 5. Glitch Text Reveal (Editorial Title)
export const GlitchText = ({ text, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const controls = useAnimation();
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
            // Add a slight delay before triggering the glitch class to let it fade in first
            setTimeout(() => {
                setIsGlitching(true);
            }, delay * 1000 + 100);

            // Optional: Remove glitch after it plays to keep it clean
            setTimeout(() => {
                setIsGlitching(false);
            }, delay * 1000 + 1600);
        }
    }, [isInView, controls, delay]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut", delay }
                },
            }}
            className={className}
        >
            <span
                className={`font-bold tracking-tight inline-block ${isGlitching ? 'glitch-text' : ''}`}
                data-text={text}
            >
                {text}
            </span>
        </motion.div>
    );
};
