import React, { useRef, useState, useEffect } from "react";
import { Cpu, Database, Code2, Wrench } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { LetterReveal, ScrollReveal } from "@/components/TextAnimations";

// Content updates for the 4 expertise categories
const EXPERTISE_CATEGORIES = [
  {
    title: "AI & Agentic Systems",
    icon: Cpu,
    description: "Designing autonomous, stateful agent workflows, custom memory layers, and intelligent RAG systems.",
    skillsList: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "MCP (Model Context Protocol)",
      "RAG Systems",
      "AI Security",
      "AI Evals",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Hugging Face",
    ],
  },
  {
    title: "AI / Machine Learning",
    icon: Database,
    description: "Developing end-to-end learning pipelines, computer vision segmentation models, and time-series models.",
    skillsList: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Transformers",
      "Embeddings",
      "Vector Databases",
      "Fine-tuning (LoRA)",
      "Computer Vision",
      "Time Series",
      "ML Algorithms",
    ],
  },
  {
    title: "Core Software Engineering",
    icon: Code2,
    description: "Building scalable software systems, production APIs, modern web applications, and enterprise architectures.",
    skillsList: [
      "Python",
      "C++",
      "React / Next.js",
      "JavaScript / TypeScript",
      "FastAPI",
      "REST APIs",
      "SQL",
      "System Design",
      "Data Structures & Algorithms",
      "Microservices",
    ],
  },
  {
    title: "Infrastructure & Tooling",
    icon: Wrench,
    description: "Building cloud-native deployment pipelines, automation workflows, observability systems, and modern development environments.",
    skillsList: [
      "Docker",
      "Linux",
      "Git / GitHub",
      "AWS",
      "Terraform",
      "Apache Airflow",
      "Playwright",
      "Redis",
      "CI/CD",
      "n8n",
    ],
  },
];

// Single word mask reveal component for headers
const MaskWordReveal = ({ text, delay }) => {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block text-2xl sm:text-3xl md:text-4xl font-bold text-foreground font-heading mr-3"
      >
        {text}
      </motion.span>
    </span>
  );
};

// Interactive list item supporting direct hover transitions and proximity text color highlights
const SkillItem = React.forwardRef(({ name, proximityOpacity, hoveredCard }, ref) => {
  const [directHover, setDirectHover] = useState(false);

  // Muted state defaults to 0.7 when card is not hovered.
  // Otherwise, interpolate with proximity calculations. Direct hover goes to 1.
  const activeOpacity = directHover 
    ? 1.0 
    : hoveredCard 
      ? proximityOpacity 
      : 0.6;

  return (
    <motion.li
      ref={ref}
      onMouseEnter={() => setDirectHover(true)}
      onMouseLeave={() => setDirectHover(false)}
      animate={
        directHover
          ? {
              x: 4,
              letterSpacing: "0.025em",
            }
          : {
              x: 0,
              letterSpacing: "0em",
            }
      }
      style={{
        opacity: activeOpacity,
        fontWeight: directHover ? 600 : 400,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="flex items-center gap-2.5 text-[11px] text-foreground hover:text-foreground cursor-pointer group/item transition-colors duration-200 py-0.5"
    >
      <span className="relative flex items-center justify-center w-2.5 h-2.5">
        <span 
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            directHover 
              ? "bg-foreground scale-125 shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
              : "bg-muted-foreground/40 scale-100"
          }`}
        />
      </span>
      <span>{name}</span>
    </motion.li>
  );
});

// Premium interactive card with spotlight, 3D tilt, and dynamic Euclidean distance logic
const SkillCard = ({ cat, idx }) => {
  const cardRef = useRef(null);
  const itemRefs = useRef([]);
  const [hovered, setHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [proximityOpacities, setProximityOpacities] = useState([]);
  const [isLight, setIsLight] = useState(false);

  // Hook into active theme classes
  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Initialize arrays
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, cat.skillsList.length);
  }, [cat.skillsList]);

  // Framer values for parallax 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltRotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const tiltRotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const springRotateX = useSpring(tiltRotateX, { damping: 25, stiffness: 220 });
  const springRotateY = useSpring(tiltRotateY, { damping: 25, stiffness: 220 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Centered coordinates for 3D tilt (-0.5 to 0.5)
    const relX = (e.clientX - rect.left) / width - 0.5;
    const relY = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(relX);
    mouseY.set(relY);

    const mouseCardX = e.clientX - rect.left;
    const mouseCardY = e.clientY - rect.top;

    setSpotlightPos({ x: mouseCardX, y: mouseCardY });

    // Euclidean distance calculations for text proximity lighting
    const opacities = itemRefs.current.map((itemRef) => {
      if (!itemRef) return 0.6;
      const itemRect = itemRef.getBoundingClientRect();
      const itemCenterX = (itemRect.left + itemRect.width / 2) - rect.left;
      const itemCenterY = (itemRect.top + itemRect.height / 2) - rect.top;

      const dx = mouseCardX - itemCenterX;
      const dy = mouseCardY - itemCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Distance boundaries
      const maxDist = 120;
      const minDist = 10;

      if (distance >= maxDist) return 0.5;
      if (distance <= minDist) return 0.95;

      // Linear interpolation between muted state (0.5) and focused state (0.95)
      const factor = (maxDist - distance) / (maxDist - minDist);
      return 0.5 + factor * 0.45;
    });

    setProximityOpacities(opacities);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setProximityOpacities([]);
  };

  const spotlightColor = isLight ? "rgba(0,0,0,0.015)" : "rgba(255,255,255,0.035)";
  const Icon = cat.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      animate={
        hovered
          ? {
              y: -10,
              scale: 1.02,
              borderColor: isLight ? "rgba(0, 0, 0, 0.18)" : "#333333",
              backgroundColor: isLight ? "#ffffff" : "#111111",
              boxShadow: isLight 
                ? "0 12px 24px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)" 
                : "0 20px 40px rgba(0,0,0,0.8)",
            }
          : {
              y: 0,
              scale: 1,
              borderColor: isLight ? "rgba(0, 0, 0, 0.10)" : "#232323",
              backgroundColor: isLight ? "#ffffff" : "#111111",
              boxShadow: isLight 
                ? "0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)" 
                : "0 4px 20px rgba(0,0,0,0.4)",
            }
      }
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col h-full rounded-2xl border border-border p-5 overflow-hidden backdrop-blur-sm cursor-default group"
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      <div style={{ transform: "translateZ(20px)" }} className="h-full flex flex-col relative z-10">
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-2.5">
          <motion.div
            animate={
              hovered
                ? {
                    rotate: 8,
                    scale: 1.1,
                    backgroundColor: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.06)",
                    borderColor: isLight ? "rgba(0, 0, 0, 0.18)" : "rgba(255, 255, 255, 0.12)",
                    boxShadow: isLight ? "0 0 15px rgba(0,0,0,0.04)" : "0 0 15px rgba(255,255,255,0.05)",
                  }
                : {
                    rotate: 0,
                    scale: 1,
                    backgroundColor: isLight ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.03)",
                    borderColor: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.05)",
                    boxShadow: "none",
                  }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-10 h-10 rounded-xl border flex items-center justify-center text-secondary-foreground group-hover:text-foreground transition-colors"
          >
            <Icon className="w-5 h-5" />
          </motion.div>

          <motion.h3
            animate={hovered ? { x: 4 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-base font-bold text-foreground leading-snug font-heading"
          >
            {cat.title}
          </motion.h3>
        </div>

        {/* Description */}
        <p className="text-[12px] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300 mb-3 leading-relaxed font-body">
          {cat.description}
        </p>

        {/* Dynamic Expanding Card Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + idx * 0.1, duration: 0.6 }}
          className={`h-[1px] w-full origin-left my-3 transition-colors duration-300 ${
            hovered ? "bg-border-hover" : "bg-border/30"
          }`}
        />

        {/* Skills List */}
        <ul className="space-y-1 mt-auto">
          {cat.skillsList.map((skill, sIdx) => (
            <SkillItem
              key={sIdx}
              ref={(el) => (itemRefs.current[sIdx] = el)}
              name={skill}
              proximityOpacity={proximityOpacities[sIdx] || 0.6}
              hoveredCard={hovered}
            />
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-8 lg:py-12 relative overflow-hidden bg-background border-t border-border/20">
      
      {/* Ambient animated gradient backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-foreground/[0.015] dark:bg-white/[0.003] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-foreground/[0.015] dark:bg-white/[0.003] rounded-full blur-[120px]"
        />
      </div>

      <div className="container-responsive relative z-10 mx-auto">
        
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-6">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase font-mono">
              Expertise & Competence
            </span>
          </ScrollReveal>
          <div className="mt-3 mb-4 flex justify-center items-center flex-wrap">
            <MaskWordReveal text="Technical" delay={0.1} />
            <MaskWordReveal text="Capabilities." delay={0.2} />
          </div>
          <ScrollReveal delay={0.3}>
            <p className="text-secondary-foreground text-sm sm:text-base leading-relaxed">
              Engineering solutions across deep learning, agentic orchestration, and systems engineering.
            </p>
          </ScrollReveal>
        </div>

        {/* Global Expanding Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          className="h-[1px] w-full bg-border/20 origin-left mt-2 mb-8"
        />

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {EXPERTISE_CATEGORIES.map((cat, idx) => {
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <SkillCard cat={cat} idx={idx} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
