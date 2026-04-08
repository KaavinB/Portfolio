"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

/* ─── Data ─── */
const navigation = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

const experience = [
  {
    company: "Rice University",
    role: "Teaching Assistant, Automata, Formal Languages & Computability",
    period: "Aug 2025 - Present",
    location: "Houston, TX",
    description:
      "Office hours and grading for a graduate automata theory course. Helping students work through formal proofs is harder to teach than it looks.",
    tags: ["Teaching", "Theory", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Software Engineering Intern",
    period: "Jan 2024 - Apr 2024",
    location: "Chennai, India",
    description:
      "Built a face-recognition attendance system used by 500+ students on campus. Optimized inference to under 0.5s and shipped a companion React Native app that went to production.",
    tags: ["Computer Vision", "React Native", "OpenCV"],
  },
  {
    company: "VIT Chennai",
    role: "Machine Learning Research Intern",
    period: "Nov 2023 - Dec 2023",
    location: "Chennai, India",
    description:
      "Built LSTM models for wind energy forecasting, improving on the baseline by around 10%. Also set up a federated training pipeline with Flower to keep raw data local across sites.",
    tags: ["LSTM", "Federated Learning", "Flower"],
  },
];

const projects = [
  {
    title: "LLaMA Fine-Tuning for Research Classification",
    description:
      "Fine-tuned LLaMA with LoRA on arXiv papers for research topic classification. Accuracy went from 40% to 67%, mostly through better data curation.",
    tech: ["PyTorch", "Hugging Face", "LoRA"],
    link: "https://github.com/KaavinB/finetuning_arXiv",
    featured: true,
  },
  {
    title: "MLOps Sentiment Pipeline on AWS",
    description:
      "End-to-end sentiment analysis pipeline on AWS EKS. Data versioning with DVC, experiment tracking with MLflow, production monitoring with Prometheus and Grafana.",
    tech: ["AWS", "Docker", "MLflow", "DVC"],
    link: "https://github.com/KaavinB",
    featured: true,
  },
  {
    title: "Federated Learning for Wind Prediction",
    description:
      "Federated LSTM for wind prediction using Flower. Each node trains locally and only shares model updates, keeping raw data on-site.",
    tech: ["TensorFlow", "Flower", "LSTM"],
    link: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
  },
  {
    title: "COVID-19 Detection from Chest X-rays",
    description:
      "Compared a custom CNN and VGG-16 for COVID-19 detection from chest X-rays. VGG-16 outperformed significantly with less training data.",
    tech: ["TensorFlow", "Keras", "CNN"],
    link: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face Liveness Detection",
    description:
      "CNN-based liveness detection to distinguish real faces from spoofs. Used heavy augmentation to handle lighting variation across different environments.",
    tech: ["TensorFlow", "OpenCV"],
    link: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime Spam Detection",
    description:
      "Real-time spam classifier connected to IMAP. Logs feature distributions over time for drift detection.",
    tech: ["scikit-learn", "TF-IDF", "IMAP"],
    link: "https://github.com/KaavinB/Realtime_Spam_Detection",
  },
];

const skills = [
  { group: "Languages", items: ["Python", "Java", "R", "SQL"], icon: Code2 },
  {
    group: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face", "LoRA", "LLaMA", "Flower"],
    icon: Sparkles,
  },
  {
    group: "Data & Cloud",
    items: ["AWS (EKS, EC2, S3)", "Docker", "MLflow", "Prometheus", "Grafana", "MongoDB", "DVC"],
    icon: Database,
  },
  {
    group: "Tools & Frameworks",
    items: ["OpenCV", "Pandas", "NumPy", "Matplotlib", "React Native", "Git", "CI/CD"],
    icon: Wrench,
  },
];

const publications = [
  {
    title: "AI-Powered Attendance System Using Facial Recognition",
    venue: "IEEE Conference, 2024",
    description:
      "Published from the VIT internship. Covers the system architecture and deployment decisions, including latency optimization and inference placement.",
  },
  {
    title: "Enhancing Drug Repositioning Through Collaborative Metric Learning",
    venue: "IEEE, July 2024",
    description:
      "Collaborative metric learning for drug-disease association prediction with improved ranking performance on CTD benchmarks.",
  },
  {
    title: "AI Applications in Nutrition & Education",
    venue: "IEEE Conference, 2024",
    description:
      "Survey of applied AI in nutrition and education, with a focus on deployment context and practical evaluation beyond benchmark accuracy.",
  },
];

const certifications = [
  "NPTEL - CSR",
  "NPTEL - Educational Leadership",
  "NPTEL - Emotional Intelligence",
];

const marqueeItems = [
  "LLM Fine-Tuning",
  "MLOps",
  "Computer Vision",
  "AWS",
  "Federated Learning",
  "Model Monitoring",
  "Applied ML",
];

const particles = Array.from({ length: 10 }, (_, idx) => ({
  id: idx,
  left: `${(idx * 9.7 + 5) % 100}%`,
  size: 2 + (idx % 3),
  duration: 14 + (idx % 5) * 2,
  delay: (idx % 4) * 0.8,
}));

/* ─── Components ─── */

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loader-bg fixed inset-0 z-[100] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div className="flex flex-col items-center gap-4">
        <motion.span
          className="font-editorial text-5xl font-medium text-[#e9f2ff]/90 sm:text-7xl"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Kaavin
        </motion.span>
        <motion.div
          className="h-[2px] bg-[#c9a227]"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px -10% 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 40, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function AnimatedHeading({ lines, className }: { lines: string[]; className?: string }) {
  // Pre-compute global char index for each line+char position
  const offsets: number[] = [];
  let total = 0;
  for (const line of lines) {
    offsets.push(total);
    total += line.length;
  }

  return (
    <h1 className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split("").map((char, i) => {
            const globalIdx = offsets[lineIdx] + i;
            if (char === " ") {
              return <span key={i}>&nbsp;</span>;
            }
            return (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  initial={{
                    y: "100%",
                    opacity: 0,
                  }}
                  animate={{
                    y: "0%",
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.5 + globalIdx * 0.035,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function MagneticCard({
  children,
  className = "",
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const spotlightX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const spotlightBg = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(201,162,39,0.06) 0%, transparent 60%)`;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className={className}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl z-10"
        style={{ background: spotlightBg }}
      />
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

/* ─── Main ─── */
export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const heroScale = useTransform(scrollY, [0, 500], [1, 0.92]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const leftOrbY = useTransform(scrollY, [0, 900], [0, -180]);
  const rightOrbY = useTransform(scrollY, [0, 900], [0, -120]);

  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const cursorXTrail = useSpring(cursorX, { stiffness: 260, damping: 28 });
  const cursorYTrail = useSpring(cursorY, { stiffness: 260, damping: 28 });

  const [showScrollTop, setShowScrollTop] = useState(false);

  const stagger = {
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-20% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    return scrollY.on("change", (v) => setShowScrollTop(v > 500));
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const performScroll = () => {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      const header = document.querySelector("header");
      const headerHeight = header?.getBoundingClientRect().height ?? 64;
      const extraOffset = window.innerWidth < 768 ? 28 : 36;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    };

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      requestAnimationFrame(() => requestAnimationFrame(performScroll));
      return;
    }
    performScroll();
  };

  return (
    <div className="min-h-screen bg-[#022a57] text-[#e9f2ff]">
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#c9a227] via-[#e8c84a] to-[#c9a227]"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed z-[55] hidden h-24 w-24 rounded-full md:block"
        style={{
          x: cursorXTrail,
          y: cursorYTrail,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(201,162,39,0.12) 0%, rgba(201,162,39,0.03) 50%, transparent 75%)",
          filter: "blur(10px)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[56] hidden h-3 w-3 rounded-full md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(255,223,132,0.9) 0%, rgba(201,162,39,0.85) 70%, transparent 100%)",
          boxShadow: "0 0 12px rgba(201,162,39,0.4), 0 0 24px rgba(201,162,39,0.15)",
        }}
      />

      {/* Background layers */}
      <div className="ambient-bg" />
      <div className="pointer-events-none fixed inset-0 stadium-lights" />
      <div className="pointer-events-none fixed inset-0 stadium-haze" />
      <div className="pointer-events-none fixed inset-0 bg-grid-lines opacity-25" />
      <div className="noise-overlay" />

      {/* Floating particles (reduced count for performance) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-[1]">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#8db9ff]/25"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              bottom: "-5%",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Parallax orbs */}
      <motion.div
        style={{ y: leftOrbY }}
        className="pointer-events-none fixed left-[8%] top-24 h-44 w-44 rounded-full bg-[#034694]/20 blur-3xl animate-drift"
      />
      <motion.div
        style={{ y: rightOrbY }}
        className="pointer-events-none fixed right-[10%] top-[42%] h-52 w-52 rounded-full bg-[#8db9ff]/10 blur-3xl animate-drift-slow"
      />

      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b border-[#8db9ff]/12 bg-[#022a57]/70 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => scrollToSection("home")}
            className="font-editorial text-3xl font-medium leading-none tracking-tight text-[#e9f2ff]/90 transition-colors hover:text-[#c9a227]"
          >
            Kaavin
          </button>

          <nav className="hidden md:flex items-center gap-0.5">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-[#022a57]"
                    : "text-[#e9f2ff]/60 hover:text-[#e9f2ff]/90"
                }`}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-[#c9a227]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <button
            className="rounded-lg border border-[#8db9ff]/20 p-2 text-[#e9f2ff] md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile menu with animation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-[#8db9ff]/12 bg-[#022a57]/95 backdrop-blur-xl md:hidden"
            >
              <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
                <div className="grid grid-cols-2 gap-2">
                  {navigation.map((item, idx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`rounded-xl border px-3 py-2.5 text-center text-xs uppercase tracking-wide transition-colors ${
                        activeSection === item.id
                          ? "border-[#c9a227] bg-[#c9a227] text-[#022a57]"
                          : "border-[#8db9ff]/15 text-[#e9f2ff]/70 hover:border-[#8db9ff]/40"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Main content ─── */}
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 sm:px-6 sm:pb-28">
        {/* ─── Hero ─── */}
        <motion.section
          id="home"
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="w-full pt-16 sm:pt-24 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-[#8db9ff]/20 bg-[#034694]/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[#e9f2ff]/70 mb-6"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse translate-y-[-0.5px]" />
            <span>Available for ML engineering roles</span>
          </motion.div>

          <div className="relative mx-auto max-w-4xl">
            {/* Floating discipline pills */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              {[
                { label: "Computer Vision", pos: "top-[6%] left-[8%]", delay: 1.2 },
                { label: "MLOps", pos: "top-[10%] right-[10%]", delay: 1.3 },
                { label: "LLMs", pos: "bottom-[18%] left-[6%]", delay: 1.35 },
                { label: "Federated ML", pos: "bottom-[10%] right-[6%]", delay: 1.4 },
              ].map(({ label, pos, delay }) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`orbit-pill ${pos}`}
                >
                  {label}
                </motion.span>
              ))}
            </div>

            <AnimatedHeading
              lines={["Hey, I'm Kaavin."]}
              className="gradient-text text-4xl font-semibold leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#e9f2ff]/65 sm:text-lg sm:leading-relaxed"
          >
            CS grad student at Rice working on ML engineering. I focus on the deployment side of things: fine-tuning, monitoring, and getting models to work reliably outside of notebooks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <a
              href="mailto:kaavinb7@gmail.com"
              className="cta-primary inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#022a57] hover:bg-[#e8c84a] hover:shadow-[0_8px_30px_-6px_rgba(201,162,39,0.4)]"
            >
              <Mail className="h-4 w-4" />
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/KaavinB"
              target="_blank"
              rel="noreferrer"
              className="cta-secondary inline-flex items-center gap-2 rounded-xl border border-[#8db9ff]/25 px-5 py-3 text-sm text-[#e9f2ff]/80 hover:text-[#e9f2ff]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/kaavin"
              target="_blank"
              rel="noreferrer"
              className="cta-secondary inline-flex items-center gap-2 rounded-xl border border-[#8db9ff]/25 px-5 py-3 text-sm text-[#e9f2ff]/80 hover:text-[#e9f2ff]"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>

          {/* Marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="marquee-shell mt-12"
          >
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span key={`${item}-${idx}`} className="marquee-item">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="mt-12 flex justify-center"
          >
            <motion.button
              onClick={() => scrollToSection("projects")}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#e9f2ff]/30 hover:text-[#c9a227] transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </motion.section>

        {/* ─── Projects ─── */}
        <Reveal id="projects" className="section-shell w-full">
          <div className="section-head">
            <Code2 className="h-4 w-4 text-[#c9a227]" />
            <h2>Projects</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className={project.featured ? "sm:col-span-2" : ""}
              >
                <MagneticCard
                  href={project.link}
                  className={`relative block h-full rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 ${
                    project.featured
                      ? "card-featured"
                      : "card-glass"
                  }`}
                >
                  {project.featured && (
                    <span className="key-play-badge">Featured</span>
                  )}
                  <div className="relative z-20 mb-3 flex items-start justify-center gap-2">
                    <h3 className="text-lg font-medium">{project.title}</h3>
                    <ExternalLink className="text-accent mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                  </div>
                  <p className="relative z-20 text-body text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="relative z-20 mt-4 flex flex-wrap justify-center gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="chip-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>

        {/* ─── Experience (Timeline) ─── */}
        <Reveal id="experience" className="section-shell w-full">
          <div className="section-head">
            <Briefcase className="h-4 w-4 text-[#c9a227]" />
            <h2>Experience</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="mx-auto max-w-3xl space-y-8"
          >
            {experience.map((item) => (
              <motion.article
                key={item.role}
                variants={fadeUp}
                className="timeline-item"
              >
                <div className="card-glass rounded-2xl p-5 sm:p-6 text-left">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-medium">{item.role}</h3>
                      <p className="text-meta mt-0.5 text-sm">{item.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs shrink-0">
                      <span className="chip">
                        <Calendar className="h-3 w-3" />
                        {item.period}
                      </span>
                      <span className="chip">
                        <MapPin className="h-3 w-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-body mt-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="chip-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>

        {/* ─── Skills ─── */}
        <Reveal id="skills" className="section-shell w-full">
          <div className="section-head">
            <Sparkles className="h-4 w-4 text-[#c9a227]" />
            <h2>Technical Stack</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2"
          >
            {skills.map((group) => (
              <motion.article
                key={group.group}
                variants={fadeUp}
                className="card-glass rounded-2xl p-5 sm:p-6"
              >
                <div className="mb-4 flex items-center justify-center gap-2">
                  <group.icon className="h-4 w-4 text-[#c9a227]/80" />
                  <h3 className="text-meta text-xs uppercase tracking-[0.15em]">
                    {group.group}
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Reveal>

        {/* ─── Publications ─── */}
        <Reveal id="publications" className="section-shell w-full">
          <div className="section-head">
            <BookOpen className="h-4 w-4 text-[#c9a227]" />
            <h2>Publications</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
            className="space-y-4"
          >
            {publications.map((pub, idx) => (
              <motion.article
                key={pub.title}
                variants={fadeUp}
                className="card-glass rounded-2xl p-5 sm:p-6 text-left relative"
              >
                <span className="pub-number">{String(idx + 1).padStart(2, "0")}</span>
                <div className="relative z-10">
                  <h3 className="text-lg font-medium">{pub.title}</h3>
                  <p className="text-accent mt-1 text-sm font-medium">{pub.venue}</p>
                  <p className="text-body mt-3 text-sm leading-relaxed">{pub.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="mt-8"
          >
            <div className="section-head mb-4">
              <Award className="h-4 w-4 text-[#c9a227]" />
              <h3 className="text-meta text-sm uppercase tracking-[0.12em]">Certifications</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {certifications.map((cert) => (
                <motion.span key={cert} variants={fadeUp} className="chip">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {cert}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* ─── Contact ─── */}
        <Reveal id="contact" className="section-shell w-full">
          <MagneticCard className="card-glass rounded-2xl p-8 sm:p-12 text-center">
            <div className="relative z-20">
              <p className="text-meta text-xs uppercase tracking-[0.18em]">Currently available</p>
              <h2 className="mt-3 text-2xl font-medium sm:text-4xl gradient-text">
                Let&apos;s build something together.
              </h2>
              <p className="text-body mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base">
                Especially interested in MLOps and LLM systems, but open to most things.
                Feel free to reach out.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="mailto:kaavinb7@gmail.com"
                  className="cta-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#022a57] hover:bg-[#e8c84a] hover:shadow-[0_8px_30px_-6px_rgba(201,162,39,0.4)]"
                >
                  <Mail className="h-4 w-4" />
                  kaavinb7@gmail.com
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/KaavinB"
                    target="_blank"
                    rel="noreferrer"
                    className="cta-secondary inline-flex items-center gap-2 rounded-xl border border-[#8db9ff]/25 px-4 py-3 text-sm text-[#e9f2ff]/80 hover:text-[#e9f2ff]"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/kaavin"
                    target="_blank"
                    rel="noreferrer"
                    className="cta-secondary inline-flex items-center gap-2 rounded-xl border border-[#8db9ff]/25 px-4 py-3 text-sm text-[#e9f2ff]/80 hover:text-[#e9f2ff]"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </MagneticCard>
        </Reveal>

        {/* ─── Footer ─── */}
        <footer className="mt-20 w-full border-t border-[#8db9ff]/10 py-8 text-center">
          <p className="text-xs text-[#e9f2ff]/30 tracking-wide">
            Designed & built by Kaavin Balasubramanian
          </p>
          <p className="mt-1 text-[10px] text-[#e9f2ff]/20 uppercase tracking-[0.15em]">
            Next.js  ·  Tailwind CSS  ·  Framer Motion
          </p>
        </footer>
      </main>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="scroll-top-btn"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
