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
  Award,
  GraduationCap,
  Home,
  Briefcase,
  FolderOpen,
  BookOpen,
} from "lucide-react";

const experience = [
  {
    company: "Rice University",
    role: "Teaching Assistant — Automata, Formal Languages & Computability",
    period: "Aug 2025 – Present",
    location: "Houston, TX",
    description:
      "Helping grad students conquer the beautiful chaos of automata theory! I run office hours that actually help (shoutout to the 10+ students whose problem-set scores shot up 📈), craft feedback that makes sense, and keep the course running smoother than a deterministic finite automaton.",
    tags: ["Teaching", "Theory", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Software Engineering Intern",
    period: "Jan 2024 – Apr 2024",
    location: "Chennai, India",
    description:
      "Built a face-recognition attendance system that knows 500+ faces in under half a second (87% accuracy, 0.5s latency — yes, I timed it). Squeezed 30% more speed out of the inference pipeline, wrapped it in a React Native app, and pitched it so well the university went campus-wide with it. Oh, and it became an IEEE paper. 🎓",
    tags: ["Computer Vision", "React Native", "OpenCV"],
  },
  {
    company: "VIT Chennai",
    role: "Machine Learning Research Intern",
    period: "Nov 2023 – Dec 2023",
    location: "Chennai, India",
    description:
      "Taught an LSTM to predict wind speeds 10% better than baseline — useful for renewable energy, cooler for my resume. Also got hands-on with federated learning (Flower framework, 4 distributed clients), cutting server load by 35% while keeping everyone's data private. Privacy-preserving ML before it was cool? Maybe. 😎",
    tags: ["LSTM", "Federated Learning", "Flower"],
  },
];

const projects = [
  {
    title: "LLaMA Fine-Tuning for Research Classification",
    description:
      "Spent some quality time with 2k+ arXiv papers so LLaMA didn't have to read them all. Used LoRA to shrink trainable params from 1B → 6M (efficiency win!) and bumped classification accuracy from 40% → 67%. Now it auto-labels papers at ~95ms a pop. 🦙",
    tech: ["PyTorch", "Hugging Face", "LoRA"],
    link: "https://github.com/KaavinB/finetuning_arXiv",
    featured: true,
  },
  {
    title: "MLOps Sentiment Pipeline on AWS",
    description:
      "Built an end-to-end sentiment analyzer that chews through 50k+ IMDB reviews on AWS EKS. Complete with MLflow experiments, DVC for versioning everything (datasets, features, models), and a monitoring stack (Prometheus + Grafana) that would make any DevOps engineer happy. ☁️",
    tech: ["AWS", "Docker", "MLflow", "DVC"],
    link: "https://github.com/KaavinB",
    featured: true,
  },
  {
    title: "Federated Learning for Wind Prediction",
    description:
      "Privacy-preserving weather predictions! LSTM clients and a Flower server working together without sharing raw data. Renewable energy folks, you're welcome. 🌬️",
    tech: ["TensorFlow", "Flower", "LSTM"],
    link: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
    featured: false,
  },
  {
    title: "COVID-19 Detection from Chest X-rays",
    description:
      "Custom CNN vs. VGG-16 showdown for medical image classification. Documented all the trade-offs so you can swap in any dataset and get going.",
    tech: ["TensorFlow", "Keras", "CNN"],
    link: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face Liveness Detection",
    description:
      "Teaching CNNs the difference between 'real human' and 'photo of a human.' Includes data augmentation because fooling this model should at least be a challenge. 👀",
    tech: ["TensorFlow", "OpenCV"],
    link: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime Spam Detection",
    description:
      "A logistic regression classifier that hooks into your inbox via IMAP and actually filters spam in real-time. Also logs predictions for drift monitoring — because spam evolves, and so should your model.",
    tech: ["scikit-learn", "TF-IDF", "IMAP"],
    link: "https://github.com/KaavinB/Realtime_Spam_Detection",
  },
];

const skills = [
  { group: "Languages", items: ["Python", "Java", "R", "SQL"], icon: Code2 },
  {
    group: "ML & Deep Learning",
    items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face", "LoRA", "LLaMA", "Flower"],
    icon: Brain,
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
      "That face-recognition system I built at VIT? It ended up in an IEEE paper! Covers the full pipeline from face encoding to real-time inference at scale. 📸",
    link: "#",
  },
  {
    title: "Enhancing Drug Repositioning Through Collaborative Metric Learning",
    venue: "IEEE, July 2024",
    description:
      "A collaborative metric learning approach for predicting drug-disease interactions — turns out the math can outperform traditional repositioning methods on the CTD dataset. 💊",
    link: "#",
  },
  {
    title: "AI Applications in Nutrition & Education",
    venue: "IEEE Conference, 2024",
    description:
      "Exploring how AI can make personalized nutrition recommendations and enhance educational outcomes. Because algorithms should help you eat better and learn faster! 🥗📚",
    link: "#",
  },
];

const certifications = [
  "NPTEL — CSR",
  "NPTEL — Educational Leadership",
  "NPTEL — Emotional Intelligence",
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
      <p className="text-2xl sm:text-4xl md:text-5xl font-bold gradient-text">{isNaN(numericValue) ? value : count}</p>
      <p className="text-[10px] sm:text-sm text-neutral-500 mt-1 sm:mt-2 uppercase tracking-wider">{label}</p>
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
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md md:max-w-none md:w-auto"
      >
        <div className="flex items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-2 glass-nav rounded-full shadow-xl">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "experience", label: "Experience", icon: Briefcase },
            { id: "projects", label: "Projects", icon: FolderOpen },
            { id: "skills", label: "Skills", icon: Brain },
            { id: "publications", label: "Publications", icon: BookOpen },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${activeSection === item.id
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
              <span className="relative z-10 hidden sm:inline">{item.label}</span>
              <item.icon className="relative z-10 w-4 h-4 sm:hidden" />
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Hero */}
      <motion.section
        id="home"
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-20"
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
            className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="text-neutral-100">Hi, I'm </span>
            <span className="gradient-text text-glow">Kaavin</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="text-base sm:text-xl md:text-2xl text-neutral-400 max-w-2xl leading-relaxed"
          >
            Master's student at{" "}
            <span className="text-neutral-200 font-medium">Rice University</span> (Dec '26).
            I teach machines to see, learn, and occasionally predict the weather.
            Currently obsessed with{" "}
            <span style={{ color: "var(--accent-primary)" }}>LLMs</span>,{" "}
            <span style={{ color: "var(--accent-primary)" }}>MLOps</span>, and{" "}
            <span style={{ color: "var(--accent-primary)" }}>making AI that actually works in production</span>.
          </motion.p>

          {/* Focus Areas */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-2 sm:gap-3 pt-2">
            {["Machine Learning", "Deep Learning", "MLOps", "Computer Vision"].map(
              (skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-neutral-300 glass-card rounded-lg hover-glow cursor-default"
                >
                  {skill}
                </motion.span>
              )
            )}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeInUp} className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6">
            <a
              href="mailto:kaavinb7@gmail.com"
              className="group inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 glow-sm hover:glow-md"
              style={{ background: "var(--gradient-primary)", color: "#000" }}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Get in Touch</span>
              <span className="sm:hidden">Contact</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://github.com/KaavinB"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-lg hover-glow"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300" />
            </a>
            <a
              href="https://linkedin.com/in/kaavin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-lg hover-glow"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-300" />
            </a>
          </motion.div>
        </motion.div>

        {/* Stats with Animated Counters */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-neutral-800/50"
        >
          <AnimatedCounter value="3" label="IEEE Papers" />
          <AnimatedCounter value="2" label="Internships" />
          <AnimatedCounter value="3" label="Certifications" />
        </motion.div>
      </motion.section>

      {/* Experience */}
      <AnimatedSection id="experience" className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 sm:mb-12">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 accent-text" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">Experience</h2>
        </motion.div>

        <div className="relative pl-6 sm:pl-8 md:pl-12">
          {/* Timeline Line */}
          <div className="timeline-line" />

          <div className="space-y-6 sm:space-y-8">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="relative glass-card p-4 sm:p-6 md:p-8 rounded-xl hover-glow cursor-pointer"
              >
                {/* Timeline Dot */}
                <div className="timeline-dot" />

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-neutral-100">
                      {exp.role}
                    </h3>
                    <p className="accent-text mt-0.5 sm:mt-1 text-sm sm:text-base font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-500 mt-2 sm:mt-0">
                    <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 bg-neutral-800/50 rounded-full">
                      <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 bg-neutral-800/50 rounded-full">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-4 sm:mb-5">{exp.description}</p>
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
      <AnimatedSection id="projects" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 sm:mb-12">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6 accent-text" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">Projects</h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.a
              key={idx}
              variants={scaleIn}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`group relative glass-card p-4 sm:p-6 md:p-8 rounded-xl hover-glow cursor-pointer ${project.featured ? "md:col-span-1" : ""
                }`}
            >
              <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-100 group-hover-accent-secondary transition-colors">
                  {project.title}
                </h3>
                {/* Featured Badge */}
                {project.featured && (
                  <span className="flex-shrink-0 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-4 sm:mb-5">
                {project.description}
              </p>

              <div className="flex items-end justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-neutral-400 bg-neutral-800/70 rounded-md skill-pill border border-transparent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Styled Link Button */}
                <div className="flex-shrink-0 p-2 sm:p-2.5 rounded-lg bg-neutral-800/50 border border-neutral-700/50 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-500 group-hover-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </AnimatedSection>

      {/* Skills */}
      <AnimatedSection id="skills" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 sm:mb-12">
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 accent-text" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">Skills</h2>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {skills.map((group) => (
            <motion.div
              key={group.group}
              variants={fadeInUp}
              className="glass-card p-4 sm:p-6 md:p-8 rounded-xl hover-glow cursor-pointer"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <group.icon className="w-4 h-4 sm:w-5 sm:h-5 accent-text" />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-neutral-300 uppercase tracking-wider">
                  {group.group}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-neutral-300 bg-neutral-800/50 rounded-lg skill-pill border border-neutral-700/50 cursor-default"
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
      <AnimatedSection id="publications" className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 pb-32 sm:pb-40">
        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8 sm:mb-12">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 accent-text" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-100">Publications</h2>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {publications.map((pub, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass-card p-4 sm:p-6 md:p-8 rounded-xl gradient-border hover-glow cursor-pointer"
            >
              <h3 className="text-base sm:text-xl font-semibold text-neutral-100 mb-1.5 sm:mb-2">
                {pub.title}
              </h3>
              <p className="text-xs sm:text-sm accent-text font-medium mb-3 sm:mb-4">{pub.venue}</p>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">{pub.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div variants={fadeInUp} className="mt-12 sm:mt-16">
          <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Award className="w-4 h-4 sm:w-5 sm:h-5 accent-text" />
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-100">Certifications</h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {certifications.map((cert, idx) => (
              <motion.span
                key={idx}
                variants={scaleIn}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 glass-card rounded-lg text-xs sm:text-sm text-neutral-300 hover-glow cursor-default"
              >
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 accent-text" />
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-neutral-800/50 text-center"
        >
          <p className="text-xs sm:text-sm text-neutral-600">
            Designed & built with{" "}
            <span style={{ color: 'var(--accent-primary)' }}>Next.js</span>,{" "}
            <span style={{ color: 'var(--accent-primary)' }}>Tailwind CSS</span>, and{" "}
            <span style={{ color: 'var(--accent-primary)' }}>Framer Motion</span>
          </p>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}
