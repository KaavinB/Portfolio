"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
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
  Sparkles,
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
  { value: "3", label: "IEEE Papers" },
  { value: "2", label: "Internships" },
  { value: "6+", label: "Projects Built" },
];

const experience = [
  {
    company: "Rice University",
    role: "Teaching Assistant, Automata, Formal Languages & Computability",
    period: "Aug 2025 - Present",
    location: "Houston, TX",
    description:
      "Lead office hours and technical support for graduate coursework in automata and computability, helping students improve problem-solving rigor and assignment outcomes.",
    tags: ["Teaching", "Theory", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Software Engineering Intern",
    period: "Jan 2024 - Apr 2024",
    location: "Chennai, India",
    description:
      "Built a face-recognition attendance platform for 500+ users with ~0.5s inference latency, improved pipeline throughput by 30%, and shipped a React Native interface used in production.",
    tags: ["Computer Vision", "React Native", "OpenCV"],
  },
  {
    company: "VIT Chennai",
    role: "Machine Learning Research Intern",
    period: "Nov 2023 - Dec 2023",
    location: "Chennai, India",
    description:
      "Improved wind-speed forecasting by 10% over baseline with LSTM models and implemented federated training workflows that reduced central server load by 35% while preserving data privacy.",
    tags: ["LSTM", "Federated Learning", "Flower"],
  },
];

const projects = [
  {
    title: "LLaMA Fine-Tuning for Research Classification",
    description:
      "Fine-tuned LLaMA with LoRA on 2k+ arXiv papers, improving classification accuracy from 40% to 67% while reducing trainable parameters from 1B to ~6M for efficient deployment.",
    tech: ["PyTorch", "Hugging Face", "LoRA"],
    link: "https://github.com/KaavinB/finetuning_arXiv",
    featured: true,
  },
  {
    title: "MLOps Sentiment Pipeline on AWS",
    description:
      "Built a production-style sentiment pipeline on AWS EKS for 50k+ IMDB reviews with MLflow, DVC, and monitoring to support repeatable experiments and reliable model operations.",
    tech: ["AWS", "Docker", "MLflow", "DVC"],
    link: "https://github.com/KaavinB",
    featured: true,
  },
  {
    title: "Federated Learning for Wind Prediction",
    description:
      "Implemented distributed wind forecasting with LSTM clients and Flower orchestration, enabling privacy-preserving training without transferring raw datasets.",
    tech: ["TensorFlow", "Flower", "LSTM"],
    link: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
  },
  {
    title: "COVID-19 Detection from Chest X-rays",
    description:
      "Benchmarked custom CNN and VGG-16 models for medical image classification and documented architecture, data, and performance trade-offs for reproducible experimentation.",
    tech: ["TensorFlow", "Keras", "CNN"],
    link: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face Liveness Detection",
    description:
      "Developed anti-spoofing classifiers with CNN architectures and augmentation-heavy training for robust real-versus-fake face verification.",
    tech: ["TensorFlow", "OpenCV"],
    link: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime Spam Detection",
    description:
      "Built an IMAP-connected spam filtering service with real-time inference and feature logging to monitor drift and maintain model quality in production-like conditions.",
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
      "Published a deployable attendance automation pipeline covering face encoding, system architecture, and real-time inference at institutional scale.",
  },
  {
    title: "Enhancing Drug Repositioning Through Collaborative Metric Learning",
    venue: "IEEE, July 2024",
    description:
      "Proposed a collaborative metric-learning framework for drug-disease interaction prediction with improved ranking performance on CTD benchmarks.",
  },
  {
    title: "AI Applications in Nutrition & Education",
    venue: "IEEE Conference, 2024",
    description:
      "Analyzed AI-driven personalization for nutrition and education with practical deployment guidance and evaluation considerations.",
  },
];

const certifications = [
  "NPTEL - CSR",
  "NPTEL - Educational Leadership",
  "NPTEL - Emotional Intelligence",
];

const marqueeItems = [
  "LLM Fine-Tuning",
  "Production MLOps",
  "Computer Vision",
  "Federated Learning",
  "Model Monitoring",
  "Applied ML Engineering",
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
  const cursorXSpring = useSpring(cursorX, { stiffness: 280, damping: 30 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 280, damping: 30 });

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
    <div className="min-h-screen bg-black text-white">
      <motion.div className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-white" style={{ scaleX: smoothScrollProgress }} />
      <motion.div
        className="pointer-events-none fixed z-[55] hidden h-44 w-44 rounded-full md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 35%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_35%)]" />
      <div className="fixed inset-0 pointer-events-none bg-grid-lines opacity-30" />
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-white/35"
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
        className="pointer-events-none fixed left-[8%] top-24 h-44 w-44 rounded-full bg-white/10 blur-3xl animate-drift"
      />
      <motion.div
        style={{ y: rightOrbY }}
        className="pointer-events-none fixed right-[10%] top-[42%] h-52 w-52 rounded-full bg-white/10 blur-3xl animate-drift-slow"
      />

      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/70">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => scrollToSection("home")}
            className="text-sm tracking-[0.25em] uppercase text-white/90 hover:text-white transition-colors"
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
                  activeSection === item.id ? "bg-white text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <button
            className="md:hidden rounded-lg border border-white/20 p-2 text-white"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/95">
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
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/80 hover:border-white/50"
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
            className="inline-flex rounded-full border border-white/20 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/70"
          >
            Open to ML engineering roles
          </motion.p>
          <div className="relative mx-auto mt-5 max-w-4xl">
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
              <div className="h-56 w-56 rounded-full border border-white/10 animate-spin-slow" />
              <div className="absolute h-44 w-44 rounded-full border border-white/15 animate-spin-reverse" />
            </div>
            <AnimatedHeading
              lines={["I like to build AI that delivers outcomes."]}
              className="text-3xl font-semibold leading-tight sm:text-6xl md:text-7xl"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.6 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            I am Kaavin Balasubramanian. I build high-impact ML products across LLMs, computer vision, and MLOps.
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
              className="cta-kinetic inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" />
              Contact
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
            <motion.a
              href="https://github.com/KaavinB"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cta-kinetic inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm text-white/85 hover:border-white/60"
            >
              <Github className="h-4 w-4" />
              GitHub
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/kaavin"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cta-kinetic inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm text-white/85 hover:border-white/60"
            >
              <Linkedin className="h-4 w-4" />
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
            <h2>Selected Work</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
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
                  project.featured ? "sm:col-span-2" : ""
                }`}
              >
                <div className="mb-3 flex items-start justify-center gap-2">
                  <h3 className="text-lg font-medium">{project.title}</h3>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                </div>
                <p className="text-sm leading-relaxed text-white/75">{project.description}</p>
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
            {experience.map((item) => (
              <motion.article
                key={item.role}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.28 }}
                variants={sectionVariants}
                whileHover={{ y: -4, scale: 1.01 }}
                className="card-shell hyper-card"
              >
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <h3 className="text-lg font-medium">{item.role}</h3>
                    <p className="mt-1 text-sm text-white/70">{item.company}</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs text-white/65">
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
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">{item.description}</p>
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
                  <group.icon className="h-4 w-4 text-white/80" />
                  <h3 className="text-xs uppercase tracking-[0.15em] text-white/70">{group.group}</h3>
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
                <p className="mt-1 text-sm text-white/60">{publication.venue}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{publication.description}</p>
              </motion.article>
            ))}
          </div>
          <div className="mt-8">
            <div className="section-head mb-4">
              <Award className="h-4 w-4" />
              <h3 className="text-sm uppercase tracking-[0.12em] text-white/80">Certifications</h3>
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
              <p className="text-xs uppercase tracking-[0.15em] text-white/55">Currently available</p>
              <h2 className="mt-2 text-2xl font-medium sm:text-3xl">Open to machine learning engineering roles.</h2>
            </div>
            <motion.a
              href="mailto:kaavinb7@gmail.com"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black sm:w-auto"
            >
              <Mail className="h-4 w-4" />
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
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={sectionVariants}
                whileHover={{ y: -4, scale: 1.02 }}
                className="stat-card rounded-2xl border border-white/15 bg-white/[0.02] p-5"
              >
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <footer className="mt-16 border-t border-white/10 py-6 text-center text-xs uppercase tracking-[0.12em] text-white/45">
          Built with Next.js, Tailwind CSS, and Framer Motion.
        </footer>
      </main>
    </div>
  );
}
