"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Code2,
  Brain,
  Database,
  Wrench,
} from "lucide-react";

const experience = [
  {
    company: "Rice University",
    role: "Teaching Assistant — Automata, Formal Languages & Computability",
    period: "Aug 2025 – Present",
    location: "Houston, TX",
    description:
      "Lead office hours and exam preparation sessions. Design and grade assignments with detailed feedback. Manage course logistics and student communications.",
    tags: ["Teaching", "Theory", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Software Engineering Intern",
    period: "Jan 2024 – Apr 2024",
    location: "Chennai, India",
    description:
      "Built a facial-recognition attendance system processing 200+ students with 87% accuracy. Optimized inference pipeline and developed React Native frontend. Work published in IEEE.",
    tags: ["Computer Vision", "React Native", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Machine Learning Research Intern",
    period: "Nov 2023 – Dec 2023",
    location: "Chennai, India",
    description:
      "Developed LSTM model for wind-speed prediction, improving baseline MAE by 10%. Implemented federated learning across four clients using Flower framework.",
    tags: ["LSTM", "Federated Learning", "Flower"],
  },
];

const projects = [
  {
    title: "LLaMA Fine-Tuning for Research Classification",
    description:
      "LoRA fine-tuned LLaMA on arXiv abstracts for multi-domain paper classification. Includes training pipeline, evaluation utilities, and experiment logging.",
    tech: ["PyTorch", "Hugging Face", "LoRA"],
    link: "https://github.com/KaavinB/finetuning_arXiv",
    featured: true,
  },
  {
    title: "Federated Learning for Wind Prediction",
    description:
      "Privacy-preserving time-series forecasting with LSTM clients and Flower server. Modular codebase with per-round metrics logging.",
    tech: ["TensorFlow", "Flower", "LSTM"],
    link: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
    featured: true,
  },
  {
    title: "COVID-19 Detection from Chest X-rays",
    description:
      "Comparative study of custom CNN vs VGG-16 for medical image classification. Documented trade-offs and structured for easy dataset substitution.",
    tech: ["TensorFlow", "Keras", "CNN"],
    link: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face Liveness Detection",
    description:
      "CNN-based system distinguishing real faces from spoofed images. Includes prediction script and data augmentation pipeline.",
    tech: ["TensorFlow", "OpenCV"],
    link: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime Spam Detection",
    description:
      "Logistic regression classifier with IMAP integration for live inbox filtering. Logs predictions over time for drift monitoring.",
    tech: ["scikit-learn", "TF-IDF", "IMAP"],
    link: "https://github.com/KaavinB/Realtime_Spam_Detection",
  },
  {
    title: "AlexNet Implementation",
    description:
      "PyTorch reimplementation of AlexNet from the original paper with configurable training script and documentation.",
    tech: ["PyTorch", "CNN"],
    link: "https://github.com/KaavinB/paper-implementation",
  },
];

const skills = [
  { group: "Languages", items: ["Python", "Java", "R", "SQL"], icon: Code2 },
  {
    group: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face"],
    icon: Brain,
  },
  {
    group: "Infrastructure",
    items: ["AWS", "Docker", "MLflow", "Prometheus", "Grafana", "MongoDB"],
    icon: Database,
  },
  {
    group: "Tools",
    items: ["OpenCV", "Pandas", "NumPy", "Git", "React Native"],
    icon: Wrench,
  },
];

const publications = [
  {
    title:
      "Enhancing Drug Repositioning Through Collaborative Metric Learning",
    venue: "IEEE, July 2024",
    description:
      "Collaborative metric learning approach for drug-disease interaction prediction, outperforming existing repositioning methods on CTD dataset.",
    link: "#",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Animated section wrapper component
function AnimatedSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Stats counter animation
function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value);

  useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      let start = 0;
      const duration = 1500;
      const increment = numericValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div ref={ref} variants={fadeInUp} className="text-center">
      <p className="text-4xl md:text-5xl font-bold gradient-text">{isNaN(numericValue) ? value : count}</p>
      <p className="text-sm text-neutral-500 mt-2 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    // Use a more reliable approach - track which section is most visible
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that is intersecting
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.5],
        rootMargin: "-20% 0px -60% 0px"
      }
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full opacity-20 animate-float animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full opacity-15 animate-float-delayed animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 animate-float"
          style={{ background: "radial-gradient(circle, rgba(110, 231, 183, 0.4) 0%, transparent 70%)" }}
        />
      </div>

      {/* Subtle Grid */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Navigation */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-1 px-3 py-2 glass-nav rounded-full shadow-xl">
          {[
            { id: "home", label: "Home" },
            { id: "experience", label: "Experience" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "publications", label: "Publications" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${activeSection === item.id
                ? "text-neutral-950"
                : "text-neutral-400 hover:text-neutral-100"
                }`}
            >
              {activeSection === item.id && (
                <motion.span
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        id="home"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-20"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Status Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-neutral-300">Open to opportunities</span>
          </motion.div>

          {/* Name with Gradient */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="text-neutral-100">Hi, I'm </span>
            <span className="gradient-text text-glow">Kaavin</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed"
          >
            Graduate student in Computer Science at{" "}
            <span className="text-neutral-200 font-medium">Rice University</span>.
            Building intelligent systems at the intersection of{" "}
            <span className="text-emerald-400">machine learning</span>,{" "}
            <span className="text-emerald-400">computer vision</span>, and{" "}
            <span className="text-emerald-400">applied research</span>.
          </motion.p>

          {/* Focus Areas */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
            {["Machine Learning", "Deep Learning", "MLOps", "Computer Vision"].map(
              (skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-4 py-2 text-sm text-neutral-300 glass-card rounded-lg hover-glow cursor-default"
                >
                  {skill}
                </motion.span>
              )
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-6">
            <a
              href="mailto:kaavinb7@gmail.com"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-300 glow-sm hover:glow-md"
              style={{ background: "var(--gradient-primary)", color: "#000" }}
            >
              <Mail className="w-4 h-4" />
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/KaavinB"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 glass-card rounded-lg hover-glow"
            >
              <Github className="w-5 h-5 text-neutral-300" />
            </a>
            <a
              href="https://linkedin.com/in/kaavin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 glass-card rounded-lg hover-glow"
            >
              <Linkedin className="w-5 h-5 text-neutral-300" />
            </a>
          </motion.div>
        </motion.div>

        {/* Stats with Animated Counters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-neutral-800/50"
        >
          <AnimatedCounter value="1" label="Publications" />
          <AnimatedCounter value="2" label="Internships" />
          <AnimatedCounter value="12" label="Repositories" />
        </motion.div>
      </motion.section>

      {/* Experience */}
      <AnimatedSection id="experience" className="relative max-w-5xl mx-auto px-6 py-24">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-12">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">Experience</h2>
        </motion.div>

        <div className="relative pl-8 md:pl-12">
          {/* Timeline Line */}
          <div className="timeline-line" />

          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="relative glass-card p-6 md:p-8 rounded-xl hover-glow cursor-pointer"
              >
                {/* Timeline Dot */}
                <div className="timeline-dot" />

                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-100">
                      {exp.role}
                    </h3>
                    <p className="text-emerald-400 mt-1 font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800/50 rounded-full">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-neutral-800/50 rounded-full">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-neutral-400 leading-relaxed mb-5">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projects */}
      <AnimatedSection id="projects" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-12">
          <Code2 className="w-6 h-6 text-emerald-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">Projects</h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              variants={scaleIn}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`group relative glass-card p-6 md:p-8 rounded-xl hover-glow cursor-pointer ${project.featured ? "md:col-span-1" : ""
                }`}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                {/* Featured Badge */}
                {project.featured && (
                  <span className="flex-shrink-0 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium text-neutral-400 bg-neutral-800/70 rounded-md skill-pill border border-transparent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Styled Link Button */}
                <div className="flex-shrink-0 p-2.5 rounded-lg bg-neutral-800/50 border border-neutral-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection id="skills" className="max-w-5xl mx-auto px-6 py-24">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-12">
          <Brain className="w-6 h-6 text-emerald-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((group) => (
            <motion.div
              key={group.group}
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-xl hover-glow cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <group.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                  {group.group}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 text-sm text-neutral-300 bg-neutral-800/50 rounded-lg skill-pill border border-neutral-700/50 cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Publications */}
      <AnimatedSection id="publications" className="max-w-5xl mx-auto px-6 py-24 pb-40">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-12">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">Publications</h2>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass-card p-6 md:p-8 rounded-xl gradient-border hover-glow"
            >
              <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                {pub.title}
              </h3>
              <p className="text-sm text-emerald-400 font-medium mb-4">{pub.venue}</p>
              <p className="text-neutral-400 leading-relaxed">{pub.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          className="mt-20 pt-10 border-t border-neutral-800/50 text-center"
        >
          <p className="text-sm text-neutral-600">
            Designed & built with{" "}
            <span className="text-emerald-500">Next.js</span>,{" "}
            <span className="text-emerald-500">Tailwind CSS</span>, and{" "}
            <span className="text-emerald-500">Framer Motion</span>
          </p>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
