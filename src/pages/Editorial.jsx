import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { ArticleCard } from "@/components/ArticleCard";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn, Reveal } from "@/components/Reveal";
import { LetterReveal, ScrollReveal, WipeReveal, GlitchText } from "@/components/TextAnimations";

export const Editorial = () => {
    const { editorial } = portfolioData;
    const [activeTab, setActiveTab] = useState("Research");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-background flex flex-col">
            {/* Extended Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-[-1]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
            </div>

            <div className="container-responsive relative z-10 flex flex-col flex-grow w-full">
                <div className="space-y-12 max-w-7xl mx-auto flex flex-col items-center w-full flex-grow">

                    {/* Header — back button left, title centered, same row */}
                    <div className="mb-10 w-full pt-2">
                        <div className="relative flex items-center justify-center min-h-[56px] mb-6">
                            {/* Back button — pinned to left */}
                            <Link to="/" className="absolute left-0 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-primary/20">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Portfolio
                            </Link>

                            {/* Title — centered in the full row */}
                            <GlitchText text="Editorial Hub." className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center font-heading text-foreground" delay={0.1} />
                        </div>
                        <ScrollReveal delay={0.2}>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-center font-body italic">
                                {editorial.description}
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Tabs Navigation (Editorial Style) */}
                    <ScrollReveal delay={0.3} className="w-full flex justify-center mb-12 sticky top-20 z-40 bg-background/80 backdrop-blur-md pt-4 pb-0 border-b border-white/5">
                        <div className="flex gap-8 px-4">
                            {['Research', 'Articles', 'Blogs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative pb-4 text-sm font-medium transition-colors tracking-wide uppercase ${activeTab === tab
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {tab}
                                    {/* Animated Active Indicator */}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary animate-fade-in" style={{ borderRadius: '2px 2px 0 0' }} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </ScrollReveal>

                    {/* Tab Content */}
                    <div className="w-full">
                        {/* Research Section */}
                        {activeTab === 'Research' && editorial.publications.length > 0 && (
                            <section className="animate-fade-in w-full">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {editorial.publications.map((item, idx) => (
                                        <ArticleCard key={item.id} article={item} index={idx} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Articles Section */}
                        {activeTab === 'Articles' && editorial.articles.length > 0 && (
                            <section className="animate-fade-in w-full">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {editorial.articles.map((item, idx) => (
                                        <ArticleCard key={item.id} article={item} index={idx} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Blogs Section */}
                        {activeTab === 'Blogs' && editorial.blogs.length > 0 && (
                            <section className="animate-fade-in w-full">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {editorial.blogs.map((item, idx) => (
                                        <ArticleCard key={item.id} article={item} index={idx} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
