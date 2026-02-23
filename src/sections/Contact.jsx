import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/Button";
import { useState } from "react";

import { portfolioData } from "@/data/portfolio";
import { Reveal, FadeIn } from "@/components/Reveal";
import { ScrollReveal, LetterReveal } from "@/components/TextAnimations";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: portfolioData.personalInfo.email,
    href: `mailto:${portfolioData.personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: portfolioData.personalInfo.phone,
    href: `tel:${portfolioData.personalInfo.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: portfolioData.personalInfo.location,
    href: "#",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7d89d23d-355c-4fa3-8383-515c4344c2b2",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send message. Please try again later.");
      }
    } catch (err) {
      console.error("Web3Forms error:", err);
      setSubmitStatus({
        type: "error",
        message:
          err.message || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal>
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
              Get In Touch
            </span>
          </ScrollReveal>

          <div className="mt-4 mb-6">
            <LetterReveal text="Let's build something great." className="text-3xl md:text-4xl font-bold text-foreground font-heading" />
          </div>

          <ScrollReveal delay={0.2}>
            <p className="text-zinc-400">
              Have a project in mind? I'd love to hear about it. Send me a message
              and let's discuss how we can work together.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto">
          <FadeIn delay={0.3} className="h-full">
            <div className="bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/10 shadow-lg h-full flex flex-col relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none placeholder:text-muted-foreground/30"
                  />
                </div>

                <Button className="w-full h-12 text-base" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                {submitStatus.type && (
                  <div
                    className={`flex items-center gap-3 p-4 rounded-xl ${submitStatus.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                      }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </div>
                )}
              </form>

              <div className="mt-8 pt-8 border-t border-white/10 text-center relative z-20">
                <p className="text-sm text-muted-foreground mb-4">Prefer a direct conversation?</p>
                <a
                  href="https://cal.com/musa-qureshi-01/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center h-12 px-8 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 text-foreground font-medium transition-all group"
                >
                  Book a 15-min Meeting
                  <Phone className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.4} className="space-y-6 h-full">
            <div className="bg-white/[0.02] p-6 md:p-8 rounded-3xl border border-white/10 shadow-lg h-full flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-6 font-heading">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium mb-1">
                          {item.label}
                        </div>
                        <div className="font-semibold text-sm sm:text-base break-all">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>

                <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="font-semibold text-emerald-500">Currently Available</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I'm currently open to new opportunities. Whether you need a full-time engineer or a consultant for your next big AI project, let's talk!
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
