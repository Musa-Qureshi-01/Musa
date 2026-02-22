
export const portfolioData = {
    personalInfo: {
        name: "Musa Qureshi",
        title: "AI Engineer & Agentic Developer",
        email: "musaqureshi0000@gmail.com",
        location: "Bhopal, India",
        phone: "+91 6263473208",
        socials: {
            github: "https://github.com/Musa-Qureshi-01",
            linkedin: "https://www.linkedin.com/in/musaqureshi",
            twitter: "https://x.com/Musa_Qureshi_01",
            leetcode: "https://leetcode.com/u/Zxo9KccODj/",
            hackerearth: "https://www.hackerearth.com/@musaqureshi0000/",
            portfolio: "#",
        },
        bio: "Hi, I'm Musa Qureshi \u2014 a Computer Science student specializing in AI engineering, agentic systems, and quantitative research. I build intelligent software that solves real problems.\n\nI learn by building end-to-end systems, not just models. My focus is on taking ideas from algorithms and data all the way to deployed applications that work reliably in production.\n\nMy work emphasizes engineering depth over buzzwords \u2014 strong fundamentals, clean system design, and practical decision-making under real-world constraints. Through this approach, I've developed solid experience across ML pipelines, system architecture, API and Agent development, and deployment workflows.\n\nI'm looking for internship, entry-level, or research roles where I can design, ship, and improve production-grade AI systems while deepening my expertise in machine learning, agentic systems, and quantitative methods.",
        tagline: "Building intelligent agents and production-grade AI systems.",
        flipWords: ["AI Engineer", "Agentic Developer", "Quant Researcher"],
    },
    skills: {
        development: [
            "Python", "C++", "SQL",
            "FastAPI", "React",
        ],
        mlData: [
            "Pandas", "NumPy", "Scikit-learn",
            "OpenCV", "TensorFlow", "PyTorch",
            "ML & DL Concepts", "Algorithms",
        ],
        agenticAI: [
            "LangChain", "LangGraph", "LangSmith",
            "Agno", "CrewAI", "RAG", "Agentic Systems",
            "Hugging Face", "LLM Tuning",
        ],
        others: [
            "Git/GitHub", "Linux", "REST API", "n8n", "Docker",
            "Gemini API/SDK", "Prompt Engineering", "AWS",
        ],
    },
    experience: [
        {
            id: 1,
            role: "Python / Machine Learning Intern",
            company: "SURE TRUST",
            period: "Jan 2026 - Feb 2026",
            description: "Built an AI-driven FinTech market intelligence system and reliable ML pipelines. Moved beyond experimental modeling to deploy scalable solutions.",
            achievements: [
                "Implemented core Machine Learning algorithms from scratch using Python without relying on high-level abstractions.",
                "Performed end-to-end data cleaning, preprocessing, and feature engineering for production readiness.",
                "Delivered and deployed a FinTech forecasting model integrating FinBERT sentiment analysis and time-series modeling processing 10K+ daily records.",
            ],
        },
        {
            id: 2,
            role: "Freelance Developer & AI Consultant",
            company: "Self-Employed \u00B7 Remote",
            period: "2023 - Present",
            description: "Designing and shipping production-grade AI systems with a focus on generative and agentic architectures, delivered end-to-end as real products.",
            achievements: [
                {
                    title: "Current Focus",
                    items: [
                        "Building RAG pipelines, agentic workflows, and LLM-powered tools",
                        "Developing autonomous and semi-autonomous agent systems",
                        "Delivering full-stack AI SaaS products from architecture to deployment",
                    ]
                },
                {
                    title: "Background (Condensed)",
                    items: [
                        "Strong foundation in frontend and full-stack engineering",
                        "Experience with data pipelines, analytics systems, and ML model lifecycles",
                        "Progressed from UI \u2192 systems \u2192 applied AI under real-world constraints",
                    ]
                }
            ],
        },
    ],
    projects: [
        {
            id: 1,
            title: "POTHOLE.IO",
            category: "Computer Vision & Civic Tech",
            description: "A full-stack platform for real-time pothole detection and reporting using deep learning segmentation models.",
            tech: ["YOLOv8n-seg", "FastAPI", "React", "Supabase", "Gemini API"],
            link: "#",
            github: "#",
            image: "/assets/Pothole.io -- Banner.png",
            highlights: [
                "Deployed YOLOv8n-seg (ONNX) achieving 91% accuracy with ~200ms inference.",
                "Implemented Gemini GenAI for automated report summarization.",
                "Architected a scalable FastAPI backend with real-time data sync.",
            ],
        },
        {
            id: 2,
            title: "TRADE GLANCE",
            category: "Agentic AI & FinTech",
            description: "An AI-driven market intelligence platform combining time-series forecasting, technical analysis, and autonomous research agents.",
            tech: ["LangGraph", "Prophet", "FinBERT", "Python", "Streamlit"],
            link: "#",
            github: "#",
            image: "/assets/Trade Glance -- Banner.png",
            highlights: [
                "Developed an agentic AI assistant with tool-calling capabilities for live market research.",
                "Engineered real-time forecasting pipelines with 7\u201390 day horizons.",
                "Integrated FinBERT for sentiment analysis on 500+ daily news articles.",
            ],
        },
        {
            id: 3,
            title: "CareGrid",
            category: "Healthcare AI",
            description: "Intelligent healthcare management system optimized for resource allocation and patient monitoring.",
            tech: ["React", "Python", "ML", "Cloud"],
            link: "#",
            github: "#",
            image: "/assets/Care Grid -- Banner.png",
            highlights: [
                "Optimized resource allocation algorithms for hospital management.",
                "Integrated real-time patient monitoring dashboards.",
                "Designed scalable architecture for healthcare data processing.",
            ],
        },
        {
            id: 4,
            title: "AI Aggregator",
            category: "AI Tooling & Orchestration",
            description: "A comprehensive platform for discovering, testing, and comparing various AI models and tools.",
            tech: ["Next.js", "TypeScript", "AI APIs", "PostgreSQL"],
            link: "#",
            github: "#",
            highlights: [
                "Aggregated 50+ AI tools into a unified discovery platform.",
                "Implemented comparative analysis features for model performance.",
                "Built a robust search and filtering engine for AI resources.",
            ],
        },
        {
            id: 5,
            title: "AI Blog SaaS",
            category: "GenAI & Content",
            description: "Automated content generation platform leveraging LLMs for creating high-quality blog posts.",
            tech: ["Next.js", "OpenAI API", "Stripe", "Supabase"],
            link: "#",
            github: "#",
            highlights: [
                "Automated blog post generation with SEO optimization.",
                "Integrated Stripe for subscription management.",
                "Used RAG for context-aware content creation.",
            ],
        },
        {
            id: 6,
            title: "OpenLab",
            category: "Interactive AI Research",
            description: "An interactive laboratory for running ML/DL experiments, visualizing data, and testing agentic workflows.",
            tech: ["React", "PyTorch", "D3.js", "FastAPI"],
            link: "#",
            github: "#",
            highlights: [
                "Interactive visualization of neural network training processes.",
                "Sandboxed environment for running agentic AI experiments.",
                "Real-time metrics tracking and performance analysis.",
            ],
        },
    ],
    education: [
        {
            degree: "Bachelor of Technology in Computer Science",
            school: "Bansal Group of Institutes (RGPV)",
            year: "2023 - 2027",
            details: "Relevent Coursework: Software Engineering, OS, OOPs, Data Structures & Algorithms. Cumulative GPA: 7.76/10",
        },
    ],
    certifications: [
        {
            name: "Machine Learning Specialization",
            issuer: "DeepLearning.AI \u00B7 Stanford University",
            period: "January 2026 \u2014 April 2026",
        },
    ],
    editorial: {
        description: "My latest writing, technical blogs, and formal research publications.",
        articles: [
            {
                id: 1,
                title: "Optimizing YOLOv8 for Edge Inference",
                summary: "Techniques for quantization and ONNX export to achieve <200ms latency on CPU.",
                platform: "LinkedIn",
                link: "#",
                date: "2026-01-15",
            },
        ],
        blogs: [
            {
                id: 1,
                title: "Building Reliable Agentic Workflows with LangGraph",
                summary: "A deep dive into state management and control flow for production-grade AI agents.",
                platform: "Medium",
                link: "https://medium.com/@Musa-Qureshi",
                date: "2026-02-01",
            },
        ],
        publications: [
            {
                id: 1,
                title: "The Future of Financial Forecasting: Transformers vs. Statistical Models",
                summary: "Comparative analysis of Prophet and Transformer-based approaches for market trend prediction.",
                platform: "Research",
                link: "#",
                date: "2025-12-20",
            },
        ],
    },
};
