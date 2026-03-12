"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Code2,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Minus,
  Sparkles,
  TrendingUp,
  Wrench,
  X,
} from "lucide-react";

const navigation = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
];

const stats = [
  { value: "3", label: "IEEE Papers", form: "standout" as const },
  { value: "2", label: "Internships", form: "steady" as const },
  { value: "6+", label: "Projects", form: "standout" as const },
];

const experience = [
  {
    company: "Rice University",
    role: "Teaching Assistant, Automata, Formal Languages & Computability",
    period: "Aug 2025 - Present",
    location: "Houston, TX",
    description:
      "I run office hours and support coursework in automata and computability. I help students break down hard problems and write clearer solutions.",
    tags: ["Teaching", "Theory", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Software Engineering Intern",
    period: "Jan 2024 - Apr 2024",
    location: "Chennai, India",
    description:
      "I built a face-recognition attendance system for 500+ users, brought inference down to about 0.5s, and shipped a React Native app used in production.",
    tags: ["Computer Vision", "React Native", "OpenCV"],
  },
  {
    company: "VIT Chennai",
    role: "Machine Learning Research Intern",
    period: "Nov 2023 - Dec 2023",
    location: "Chennai, India",
    description:
      "I worked on LSTM wind forecasting and improved results by 10% over baseline. I also set up federated training to reduce central server load while keeping data private.",
    tags: ["LSTM", "Federated Learning", "Flower"],
  },
];

const projects = [
  {
    title: "LLaMA Fine-Tuning for Research Classification",
    description:
      "I fine-tuned LLaMA with LoRA on 2k+ arXiv papers to classify research topics. Accuracy improved from 40% to 67% with far fewer trainable parameters.",
    tech: ["PyTorch", "Hugging Face", "LoRA"],
    link: "https://github.com/KaavinB/finetuning_arXiv",
    featured: true,
  },
  {
    title: "MLOps Sentiment Pipeline on AWS",
    description:
      "I built a sentiment pipeline on AWS EKS for 50k+ IMDB reviews. It uses MLflow, DVC, and monitoring so experiments are easy to reproduce.",
    tech: ["AWS", "Docker", "MLflow", "DVC"],
    link: "https://github.com/KaavinB",
    featured: true,
  },
  {
    title: "Federated Learning for Wind Prediction",
    description:
      "I built a federated LSTM setup with Flower for wind prediction. Each client trains locally, so raw data stays private.",
    tech: ["TensorFlow", "Flower", "LSTM"],
    link: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
  },
  {
    title: "COVID-19 Detection from Chest X-rays",
    description:
      "I compared a custom CNN and VGG-16 for COVID detection from chest X-rays and documented what worked, what did not, and why.",
    tech: ["TensorFlow", "Keras", "CNN"],
    link: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face Liveness Detection",
    description:
      "I trained CNN models for liveness detection to separate real faces from spoof attacks in varied lighting conditions.",
    tech: ["TensorFlow", "OpenCV"],
    link: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime Spam Detection",
    description:
      "I built a real-time spam filter connected to IMAP with live inference and feature logs to track drift over time.",
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
      "I published a paper on building and deploying a practical facial-recognition attendance pipeline.",
  },
  {
    title: "Enhancing Drug Repositioning Through Collaborative Metric Learning",
    venue: "IEEE, July 2024",
    description:
      "I proposed a collaborative metric-learning method for drug-disease prediction and reported better ranking performance on CTD benchmarks.",
  },
  {
    title: "AI Applications in Nutrition & Education",
    venue: "IEEE Conference, 2024",
    description:
      "I reviewed practical AI use cases in nutrition and education, including deployment and evaluation considerations.",
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

const particles = Array.from({ length: 18 }, (_, idx) => ({
  id: idx,
  left: `${(idx * 5.3 + 7) % 100}%`,
  size: 3 + (idx % 4),
  duration: 12 + (idx % 7) * 1.6,
  delay: (idx % 5) * 0.45,
}));

function Reveal({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px -10% 0px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function AnimatedHeading({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <h1 className={className}>
      {lines.map((line, idx) => (
        <motion.span
          key={line}
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: 0.22 + idx * 0.14,
            type: "spring",
            stiffness: 180,
            damping: 22,
            mass: 0.75,
          }}
          className="block"
        >
          {line}
        </motion.span>
      ))}
    </h1>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.94]);
  const heroOpacity = useTransform(scrollY, [0, 420], [1, 0.35]);
  const leftOrbY = useTransform(scrollY, [0, 900], [0, -180]);
  const rightOrbY = useTransform(scrollY, [0, 900], [0, -120]);
  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const cursorXCore = useSpring(cursorX, { stiffness: 340, damping: 28 });
  const cursorYCore = useSpring(cursorY, { stiffness: 340, damping: 28 });
  const cursorXTrail = useSpring(cursorX, { stiffness: 170, damping: 24 });
  const cursorYTrail = useSpring(cursorY, { stiffness: 170, damping: 24 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
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
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -55% 0px",
      }
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
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;
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
      <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[#c9a227]" style={{ scaleX: smoothScrollProgress }} />
      <motion.div
        className="pointer-events-none fixed z-[55] hidden h-24 w-24 rounded-full md:block"
        style={{
          x: cursorXTrail,
          y: cursorYTrail,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.42) 0%, rgba(201,162,39,0.1) 45%, transparent 75%)",
          filter: "blur(7px)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[56] hidden h-8 w-8 rounded-full md:block"
        style={{
          x: cursorXCore,
          y: cursorYCore,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,220,120,0.9) 0%, rgba(201,162,39,0.6) 55%, rgba(201,162,39,0) 100%)",
          boxShadow: "0 0 24px rgba(201,162,39,0.55)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 stadium-lights" />
      <div className="pointer-events-none fixed inset-0 stadium-haze" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(141,185,255,0.2),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(3,70,148,0.25),transparent_35%)]" />
      <div className="fixed inset-0 pointer-events-none bg-grid-lines opacity-30" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-[#8db9ff]/30"
            style={{
              left: particle.left,
              width: particle.size,
              height: particle.size,
              bottom: "-8%",
            }}
            animate={{
              y: ["0vh", "-112vh"],
              x: [0, (particle.id % 2 === 0 ? 22 : -18), 0],
              opacity: [0, 0.8, 0],
              scale: [0.7, 1.2, 0.8],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>
      <motion.div
        style={{ y: leftOrbY }}
        className="pointer-events-none fixed left-[8%] top-24 h-44 w-44 rounded-full bg-[#034694]/28 blur-3xl animate-drift"
      />
      <motion.div
        style={{ y: rightOrbY }}
        className="pointer-events-none fixed right-[10%] top-[42%] h-52 w-52 rounded-full bg-[#8db9ff]/16 blur-3xl animate-drift-slow"
      />

      <header className="sticky top-0 z-50 border-b border-[#8db9ff]/20 bg-[#022a57]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => scrollToSection("home")}
            className="font-editorial text-4xl font-medium leading-none tracking-tight text-[#e9f2ff]/90 transition-colors hover:text-[#c9a227]"
          >
            Kaavin
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`rounded-full px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                  activeSection === item.id ? "bg-[#c9a227] text-[#022a57]" : "text-[#e9f2ff]/75 hover:text-[#e9f2ff]"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <button
            className="rounded-lg border border-[#8db9ff]/30 p-2 text-[#e9f2ff] md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#8db9ff]/20 bg-[#022a57]/95 md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              <div className="grid grid-cols-2 gap-2">
                {navigation.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl border px-3 py-2 text-center text-xs uppercase tracking-wide transition-colors ${
                      activeSection === item.id
                        ? "border-[#c9a227] bg-[#c9a227] text-[#022a57]"
                        : "border-[#8db9ff]/25 text-[#e9f2ff]/80 hover:border-[#8db9ff]/55"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-20 text-center sm:px-6 sm:pb-28">
        <motion.section id="home" style={{ scale: heroScale, opacity: heroOpacity }} className="w-full pt-14 sm:pt-20">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex rounded-full border border-[#8db9ff]/30 bg-[#034694]/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#e9f2ff]/80"
          >
            Open to ML engineering roles
          </motion.p>
          <div className="relative mx-auto mt-5 max-w-4xl">
            <div aria-hidden className="hero-crest-pattern pointer-events-none absolute inset-0 -z-20 rounded-3xl" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, ease: "linear", repeat: Infinity }}
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <span className="orbit-pill top-[6%] left-[10%]">Vision</span>
              <span className="orbit-pill top-[12%] right-[12%]">MLOps</span>
              <span className="orbit-pill bottom-[18%] left-[8%]">LLMs</span>
              <span className="orbit-pill bottom-[10%] right-[8%]">AI Systems</span>
            </motion.div>
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="relative h-[20rem] w-[20rem] opacity-95 sm:h-[25rem] sm:w-[25rem]">
                <Image
                  src="/chelsea-logo.png"
                  alt="Chelsea-inspired emblem"
                  fill
                  className="object-contain drop-shadow-[0_0_40px_rgba(3,70,148,0.45)]"
                  priority
                />
              </div>
            </div>
            <AnimatedHeading
              lines={["I build practical AI products."]}
              className="text-3xl font-semibold leading-tight sm:text-6xl md:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#e9f2ff]/78 sm:text-lg"
          >
            I am Kaavin Balasubramanian, a machine learning engineer focused on LLMs, computer vision, and MLOps. I care about clear thinking, reliable systems, and good teamwork.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <motion.a
              href="mailto:kaavinb7@gmail.com"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="primary-cta cta-kinetic inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-semibold text-[#022a57] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="cta-icon h-4 w-4" />
              Contact
              <ArrowUpRight className="cta-icon h-4 w-4" />
            </motion.a>
            <motion.a
              href="https://github.com/KaavinB"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cta-kinetic inline-flex items-center gap-2 rounded-xl border border-[#8db9ff]/35 px-4 py-2.5 text-sm text-[#e9f2ff]/90 hover:border-[#c9a227]/70"
            >
              <Github className="cta-icon h-4 w-4" />
              GitHub
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/kaavin"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cta-kinetic inline-flex items-center gap-2 rounded-xl border border-[#8db9ff]/35 px-4 py-2.5 text-sm text-[#e9f2ff]/90 hover:border-[#c9a227]/70"
            >
              <Linkedin className="cta-icon h-4 w-4" />
              LinkedIn
            </motion.a>
          </motion.div>

          <div className="marquee-shell mt-10">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, idx) => (
                <span key={`${item}-${idx}`} className="marquee-item">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.section>

        <Reveal id="projects" className="section-shell w-full">
          <div className="section-head">
            <Code2 className="h-4 w-4" />
            <h2>Projects</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, idx) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
                whileHover={{ y: -6, scale: 1.012 }}
                className={`card-shell hyper-card block transition-transform hover:-translate-y-1 ${
                  project.featured ? "featured-card sm:col-span-2" : ""
                } ${project.featured && idx === 0 ? "captains-armband" : ""} ${project.featured ? "key-play-card" : ""}`}
              >
                {project.featured && <span className="key-play-badge">Featured</span>}
                {project.featured && <span className="goal-flash">GOAL</span>}
                <div className="mb-3 flex items-start justify-center gap-2">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <ExternalLink className="text-accent mt-0.5 h-4 w-4 shrink-0" />
                </div>
                <p className="text-body text-sm leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal id="experience" className="section-shell w-full">
          <div className="section-head">
            <Briefcase className="h-4 w-4" />
            <h2>Experience</h2>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {experience.map((item, idx) => (
              <motion.article
                key={item.role}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.28 }}
                variants={sectionVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`card-shell hyper-card experience-item ${idx < experience.length - 1 ? "with-fixture-dot" : ""}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{item.role}</h3>
                    <p className="text-meta mt-1 text-sm">{item.company}</p>
                  </div>
                  <div className="text-meta flex flex-wrap justify-center gap-2 text-xs">
                    <span className="chip">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.period}
                    </span>
                    <span className="chip">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>
                <p className="text-body mt-4 text-sm leading-relaxed sm:text-base">{item.description}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <Reveal id="skills" className="section-shell w-full">
          <div className="section-head">
            <Sparkles className="h-4 w-4" />
            <h2>Technical Stack</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((group) => (
              <motion.article
                key={group.group}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={sectionVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="card-shell hyper-card"
              >
                <div className="mb-4 flex items-center justify-center gap-2">
                  <group.icon className="h-4 w-4 text-[#8db9ff]/90" />
                  <h3 className="text-meta text-xs uppercase tracking-[0.15em]">{group.group}</h3>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {group.items.map((skill) => (
                    <span key={skill} className="chip-muted">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <Reveal id="publications" className="section-shell w-full">
          <div className="section-head">
            <BookOpen className="h-4 w-4" />
            <h2>Publications</h2>
          </div>
          <div className="space-y-4">
            {publications.map((publication) => (
              <motion.article
                key={publication.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                whileHover={{ y: -4 }}
                className="card-shell hyper-card"
              >
                <h3 className="text-lg font-medium">{publication.title}</h3>
                <p className="text-meta mt-1 text-sm">{publication.venue}</p>
                <p className="text-body mt-4 text-sm leading-relaxed">{publication.description}</p>
              </motion.article>
            ))}
          </div>
          <div className="mt-8">
            <div className="section-head mb-4">
              <Award className="h-4 w-4" />
              <h3 className="text-meta text-sm uppercase tracking-[0.12em]">Certifications</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {certifications.map((cert) => (
                <motion.span key={cert} whileHover={{ y: -2 }} className="chip">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {cert}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal id="contact" className="section-shell w-full">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="card-shell hyper-card flex flex-col items-center gap-5"
          >
            <div>
              <p className="text-meta text-xs uppercase tracking-[0.15em]">Currently available</p>
              <h2 className="mt-2 text-2xl font-medium sm:text-3xl">Open to machine learning engineering roles.</h2>
            </div>
            <motion.a
              href="mailto:kaavinb7@gmail.com"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="primary-cta inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c9a227] px-5 py-3 text-sm font-semibold text-[#022a57] sm:w-auto"
            >
              <Mail className="cta-icon h-4 w-4" />
              kaavinb7@gmail.com
            </motion.a>
          </motion.div>
        </Reveal>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="section-shell w-full"
        >
          <div className="flex w-full flex-wrap justify-center gap-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={sectionVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="card-shell stat-card w-full max-w-sm p-5 sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]"
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-meta mt-1 text-xs uppercase tracking-widest">{stat.label}</p>
                <div className={`matchday-chip ${stat.form === "standout" ? "is-standout" : ""}`}>
                  {stat.form === "standout" ? <TrendingUp className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                  <span>{stat.form === "standout" ? "Strong" : "Steady"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <footer className="mt-16 border-t border-[#8db9ff]/20 py-6 text-center text-xs uppercase tracking-[0.12em] text-[#e9f2ff]/45">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </footer>
      </main>
    </div>
  );
}
