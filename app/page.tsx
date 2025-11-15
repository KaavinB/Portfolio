"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Cpu,
  Brain,
  BarChart3,
  Sparkles,
  Code2,
} from "lucide-react";

const experience = [
  {
    company: "Rice University",
    role: "Teaching Assistant: Automata, Formal Languages & Computability",
    period: "Aug 2025 – Present",
    location: "Houston, TX",
    description: [
    "Most people met automata theory and immediately started questioning their life choices. I spent my time making sure students didn’t stay in that phase for long. Between office hours, exam prep, and problem-set walkthroughs, I turned dense definitions and scary proofs into something that actually felt navigable.",
    "On the backend, I designed and graded assignments with surgical feedback so students knew exactly why something worked or broke. Regrade requests dropped once the rubrics got sharper, and I kept Piazza, grading queues, and logistics moving so the course felt less like chaos and more like a well-behaved DFA.",
  ],

    tags: ["Teaching", "Theory", "Python", "LaTeX"],
  },
  {
    company: "VIT Chennai",
    role: "Software Engineering Intern",
    period: "Jan 2024 – Apr 2024",
    location: "Chennai, India",
    description: [
      "Attendance used to mean calling names in a crowded classroom. I helped replace that with a facial-recognition system that checks in 200+ students in under a second per face, clocking around 87% accuracy across a 500+ face gallery. Professors stopped asking ‘Who’s here?’ and started asking ‘When can we roll this out everywhere?’",
      "Under the hood, I squeezed the encoding and inference pipeline until it behaved: latency dropped, reliability went up, and the React Native front-end stayed smooth. The demo to university leadership turned into a campus pilot and an IEEE publication, which is not a bad output for one internship.",
    ],
    tags: ["Computer Vision", "React Native", "Python"],
  },
  {
    company: "VIT Chennai",
    role: "Machine Learning Research Intern",
    period: "Nov 2023 – Dec 2023",
    location: "Chennai, India",
    description: [
      "Wind looks random until your forecast model starts getting judged on mean absolute error. I fine-tuned an LSTM for wind-speed prediction that beat the baseline by about 10%, which is the difference between ‘yeah, sort of’ and ‘this is actually useful.’",
      "Then I wired in Flower to run federated learning across four clients so each site could train locally without shipping raw data to a central server. Scripts, configs, and experiment scaffolding were all packaged cleanly so future datasets can be dropped in without archaeology through half-broken notebooks.",
    ],
    tags: ["LSTM", "Federated Learning", "Flower"],
  },
];

const projects = [
  {
    title: "LLaMA Fine-Tuning for Research Classification",
    subtitle:
      "LoRA fine-tuned LLaMA on arXiv abstracts for multi-domain paper tagging.",
    description: [
      "I took LLaMA, pointed it at arXiv abstracts, and convinced it to stop giving generic responses and start acting like a half-decent research assistant. Using LoRA adapters, I fine-tuned a classifier that tags papers across multiple domains without collapsing into ‘everything is machine learning’ mode.",
      "The stack around it is built properly: curated datasets, data loaders that don’t trip over edge cases, a training loop with real logging, and evaluation utilities that produce plots and metrics instead of vibes. I experimented with imbalance handling, regularization, and learning rate schedules until the validation curve stopped behaving like a random walk.",
    ],
    tech: ["PyTorch", "Hugging Face", "LoRA", "LLaMA"],
    link: "https://github.com/KaavinB/finetuning_arXiv",
  },
  {
    title: "Wind-Prediction LSTM Federated Learning",
    subtitle:
      "Privacy-preserving time-series forecasting with Flower and LSTM clients.",
    description: [
      "Here the goal was simple: forecast wind, keep the data private, and still get respectable performance. I wired up an LSTM forecaster to run under a federated setup, where multiple clients train locally and only share model updates with a central server.",
      "The codebase is split cleanly into server, client, and data-prep modules so you can actually reproduce experiments instead of praying to old git commits. Metrics are logged per round to compare centralized and federated runs, which makes it obvious where privacy begins to cost performance and where it really doesn’t.",
    ],
    tech: ["TensorFlow", "Flower", "LSTM", "Time Series"],
    link: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
  },
  {
    title: "COVID-19 Detection using Chest X-rays",
    subtitle: "Comparing custom CNN vs VGG-16 for medical image classification.",
    description: [
      "I started with a noisy multi-class chest X-ray dataset and tried to answer a boring but important question: does a custom CNN stand a chance against a fine-tuned VGG-16 here? After cleaning and organizing the data, I trained both models and made them compete on accuracy and confusion matrices.",
      "The result is a set of documented trade-offs: model size versus performance, training stability versus complexity, and where transfer learning clearly earns its keep. The repo is structured so someone can plug in a new medical dataset and get to meaningful baselines without redoing the entire pipeline.",
    ],
    tech: ["TensorFlow", "Keras", "CNN", "VGG-16"],
    link: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face Liveness Detection",
    subtitle: "CNN-based system to distinguish real faces from spoofed images.",
    description: [
      "A normal face-recognition system will happily authenticate a printed photo if you don’t teach it better. I built a liveness detection model that classifies real versus spoofed faces using a convolutional network trained on a custom dataset.",
      "Alongside the model, I shipped a small prediction script that takes a single image, runs the liveness check, and returns a clear verdict without ceremony. Data augmentation and regularization keep the validation accuracy steady instead of collapsing every time the dataset changes slightly.",
    ],
    tech: ["TensorFlow", "Keras", "Computer Vision"],
    link: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime Spam Detection",
    subtitle: "Logistic regression + IMAP inbox integration for live spam filtering.",
    description: [
      "This project is basically a bouncer for your inbox. I trained a Logistic Regression model on TF-IDF features to classify emails as spam or ham, then wired it to an IMAP inbox so it works on real traffic instead of toy CSVs.",
      "New emails are pulled, vectorized, and judged on arrival, with predictions and metrics logged over time so you can see when the model starts drifting. When the world’s spam tactics change, you get the data to retrain instead of quietly accepting worse filters.",
    ],
    tech: ["Python", "scikit-learn", "TF-IDF", "IMAP"],
    link: "https://github.com/KaavinB/Realtime_Spam_Detection",
  },
  {
    title: "Infant Cry Detection",
    subtitle:
      "Audio classification pipeline to distinguish cry types using learned features.",
    description: [
      "Infant cries come in different flavors of chaos. I built an audio classification pipeline that turns raw cry recordings into features and then into predictions about the type of cry using models in PyTorch and Keras.",
      "The code handles dataset organization, feature extraction, training, and artifact saving in one coherent flow. Model weights and feature parameters are packaged so deployment scripts can take in real audio and output meaningful labels instead of mystery numbers.",
    ],
    tech: ["Python", "Audio ML", "PyTorch", "Keras"],
    link: "https://github.com/KaavinB/cry-detection",
  },
  {
    title: "AlexNet Paper Implementation",
    subtitle:
      "Reimplementation of AlexNet in PyTorch with training script and documentation.",
    description: [
      "AlexNet is ancient by deep learning standards, but it still explains a lot about why modern CNNs look the way they do. I reimplemented AlexNet in PyTorch from the original paper, keeping the architecture faithful while making the code readable.",
      "A configurable training script handles ImageNet-style data, augmentation, SGD, and learning-rate decay without resorting to magic constants. The documentation turns the repo into a reference for anyone who wants to understand classic CNNs by reading code instead of just slides.",
    ],
    tech: ["PyTorch", "CNN", "Image Classification"],
    link: "https://github.com/KaavinB/paper-implementation",
  },
];

const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "R", "SQL"],
  },
  {
    group: "ML / DL",
    items: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Scikit-learn",
      "Hugging Face",
      "LoRA",
      "LLaMA",
      "Flower",
    ],
  },
  {
    group: "Data & Cloud",
    items: [
      "AWS (EKS, EC2, ECR, S3, IAM)",
      "Docker",
      "MLflow",
      "Prometheus",
      "Grafana",
      "MongoDB",
      "DVC",
    ],
  },
  {
    group: "Tools",
    items: ["OpenCV", "Pandas", "NumPy", "Matplotlib", "React Native", "Git", "CI/CD"],
  },
];

const publications = [
  {
    title:
      "Enhancing Drug Repositioning Through Collaborative Metric Learning: A Novel Approach",
    venue: "IEEE Jul 2, 2024",
    role: "Author",
    summary:
      "Frames computational drug repurposing as a top-K recommendation task using collaborative metric learning on a balanced CTD dataset to predict novel drug–disease interactions, outperforming several existing repositioning strategies.",
    link: "#",
  },
  {
    title: "More coming soon",
    venue: "To be announced",
    role: "In progress",
    summary:
      "Two additional papers are currently in the writing pipeline and being tuned for submission.",
    link: "#",
  },
];

const tabs = [
  { value: "experience", label: "Experience", icon: Cpu },
  { value: "projects", label: "Projects", icon: Code2 },
  { value: "skills", label: "Skills", icon: Brain },
  { value: "publications", label: "Publications", icon: Sparkles },
] as const;

type TabValue = (typeof tabs)[number]["value"];

export default function AIMLPortfolio() {
  const [activeTab, setActiveTab] = useState<TabValue>("experience");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* subtle background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:flex-row lg:gap-10 lg:py-12">
        {/* LEFT COLUMN */}
        <aside className="flex w-full flex-col gap-4 lg:sticky lg:top-8 lg:h-fit lg:w-80 lg:shrink-0">
          {/* PROFILE CARD */}
          <Card className="border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
            <CardHeader className="px-6 pt-5 pb-2 space-y-3">
              <div className="space-y-1.5">
                <CardTitle className="text-2xl font-semibold tracking-tight text-slate-50">
                  Kaavin Balasubramanian
                </CardTitle>
                <p className="text-sm text-slate-300">MCS · Rice University</p>
                <p className="text-xs text-slate-400">
                  Machine Learning · AI · LLMs · MLOps
                </p>
                <p className="text-xs text-slate-500">
                  Curiosity killed my free time :P
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-6 pt-2 pb-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-emerald-500/10 text-emerald-200 border border-emerald-500/30 text-[11px] font-medium px-2.5 py-1 rounded-full">
                  <Cpu className="mr-1.5 h-3.5 w-3.5" />
                  ML Engineer in training
                </Badge>
                <Badge className="bg-indigo-500/10 text-indigo-200 border border-indigo-500/30 text-[11px] font-medium px-2.5 py-1 rounded-full">
                  <Brain className="mr-1.5 h-3.5 w-3.5" />
                  Research-driven
                </Badge>
                <Badge className="bg-amber-500/10 text-amber-200 border border-amber-500/30 text-[11px] font-medium px-2.5 py-1 rounded-full">
                  <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                  MLOps aware
                </Badge>
                <Badge className="bg-fuchsia-500/10 text-fuchsia-200 border border-fuchsia-500/30 text-[11px] font-medium px-2.5 py-1 rounded-full">
                  <Code2 className="mr-1.5 h-3.5 w-3.5" />
                  LLM tinkerer
                </Badge>
              </div>

              <Separator className="bg-slate-700/60" />

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-slate-600/80 bg-slate-900/90 text-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all rounded-xl"
                >
                  <a
                    href="https://github.com/KaavinB"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-slate-600/80 bg-slate-900/90 text-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all rounded-xl"
                >
                  <a
                    href="https://linkedin.com/in/kaavin"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-slate-600/80 bg-slate-900/90 text-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all rounded-xl"
                >
                  <a
                    href="https://kaavin.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>

                <div className="ml-auto">
                  <Button
                    asChild
                    variant="default"
                    className="h-9 px-4 bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 hover:from-emerald-400 hover:to-sky-400 shadow-lg shadow-emerald-500/25 text-xs font-semibold rounded-xl"
                  >
                    <a href="mailto:kaavinb7@gmail.com">
                      <Mail className="mr-2 h-3.5 w-3.5" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QUICK STATS */}
          <Card className="border-slate-700/60 bg-slate-900/80 backdrop-blur-xl shadow-[0_16px_35px_rgba(15,23,42,0.85)]">
            <CardHeader className="px-6 pt-4 pb-1">
              <CardTitle className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
                Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pt-2 pb-4 space-y-2.5 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                <span className="text-slate-300">Published papers (so far...)</span>
                <span className="flex items-baseline gap-1 font-semibold text-emerald-400 text-lg">
                  1
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                <span className="text-slate-300">Internships</span>
                <span className="flex items-baseline gap-1 font-semibold text-emerald-400 text-lg">
                  2
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                <span className="text-slate-300">GitHub repos</span>
                <span className="flex items-baseline gap-1 font-semibold text-emerald-400 text-lg">
                  12
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-700/70 bg-slate-900/80 px-3 py-2">
                <span className="text-slate-300">Coffees sacrificed to debugging</span>
                <span className="flex items-baseline gap-1 font-semibold text-emerald-400 text-lg">
                  ∞
                </span>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* RIGHT COLUMN */}
        <main className="flex-1 min-w-0 space-y-6">
          {/* HERO ROW */}
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-emerald-200 shadow-lg shadow-emerald-500/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to AI/ML internships and research roles
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-50">
                AI / ML portfolio
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                I train models, ship them, and babysit them when reality fights back.
              </p>
            </div>
          </section>

          <Separator className="bg-slate-800/70" />

          <div className="space-y-5">
            {/* TABS */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.9)] backdrop-blur-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.value;

                  return (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`group inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 ${
                        active
                          ? "bg-gradient-to-br from-emerald-500 via-emerald-400 to-sky-400 text-slate-950 shadow-lg shadow-emerald-500/40 translate-y-[1px]"
                          : "bg-transparent text-slate-300 hover:bg-slate-900/80 hover:text-slate-50"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-transform duration-200 ${
                          active ? "scale-110" : "group-hover:scale-105"
                        }`}
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONTENT */}
            <div className="space-y-4">
              {activeTab === "experience" && (
                <div className="space-y-4">
                  {experience.map((exp, idx) => (
                    <Card
                      key={idx}
                      className="border-slate-800/70 bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.9)] hover:border-emerald-500/60 hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      <CardHeader className="px-6 pt-4 pb-2 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="space-y-1.5">
                            <CardTitle className="text-base sm:text-lg font-semibold text-slate-50 leading-tight">
                              {exp.role}
                            </CardTitle>
                            <p className="text-sm font-medium text-emerald-400">
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-xs text-slate-400 space-y-0.5 sm:text-right sm:shrink-0">
                            <p className="font-medium">{exp.period}</p>
                            <p>{exp.location}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pt-1 pb-4 space-y-3">
                        <div className="space-y-2 text-sm text-slate-200 leading-relaxed">
                          {exp.description.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {exp.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-slate-700/70 bg-slate-900/70 text-[11px] text-slate-200 px-2.5 py-1 rounded-full"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-4">
                  {projects.map((p, idx) => (
                    <Card
                      key={idx}
                      className="border-slate-800/70 bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.9)] hover:border-emerald-500/60 hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      <CardHeader className="px-6 pt-4 pb-2 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="space-y-1.5 flex-1">
                            <CardTitle className="text-base sm:text-lg font-semibold text-slate-50 leading-tight">
                              {p.title}
                            </CardTitle>
                            <p className="text-xs sm:text-sm text-emerald-300 leading-relaxed">
                              {p.subtitle}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-1 sm:mt-0 border-slate-600/80 bg-slate-900/90 text-[11px] sm:text-xs text-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 rounded-xl transition-all"
                            asChild
                          >
                            <a href={p.link} target="_blank" rel="noreferrer">
                              <Globe className="mr-1.5 h-3.5 w-3.5" />
                              View repo
                            </a>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pt-1 pb-4 space-y-3">
                        <div className="space-y-2 text-sm text-slate-200 leading-relaxed">
                          {p.description.map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.tech.map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="border-slate-700/70 bg-slate-900/70 text-[11px] uppercase tracking-tight text-slate-200 px-2.5 py-1 rounded-full"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "skills" && (
                <Card className="border-slate-800/70 bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.9)]">
                  <CardHeader className="px-6 pt-4 pb-2">
                    <CardTitle className="text-lg font-semibold text-slate-50">
                      Technical skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pt-2 pb-4 space-y-4">
                    {skills.map((group) => (
                      <div key={group.group} className="space-y-2.5">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                          {group.group}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <Badge
                              key={item}
                              variant="outline"
                              className="border-slate-700/70 bg-slate-900/70 text-[11px] text-slate-200 px-3 py-1.5 rounded-full"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {activeTab === "publications" && (
                <div className="space-y-4">
                  {publications.map((pub, idx) => (
                    <Card
                      key={idx}
                      className="border-slate-800/70 bg-slate-950/85 backdrop-blur-xl shadow-[0_16px_40px_rgba(15,23,42,0.9)] hover:border-emerald-500/60 hover:shadow-emerald-500/20 transition-all duration-300"
                    >
                      <CardHeader className="px-6 pt-4 pb-2 space-y-2.5">
                        <CardTitle className="text-base sm:text-lg font-semibold text-slate-50 leading-tight">
                          {pub.title}
                        </CardTitle>
                        <p className="text-xs font-semibold text-emerald-400">
                          {pub.venue}
                        </p>
                      </CardHeader>
                      <CardContent className="px-6 pt-2 pb-4 space-y-3">
                        <p className="text-[11px] uppercase font-semibold text-slate-400">
                          {pub.role}
                        </p>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {pub.summary}
                        </p>
                        {pub.link !== "#" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600/80 bg-slate-900/90 text-[11px] sm:text-xs text-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 rounded-xl transition-all"
                            asChild
                          >
                            <a href={pub.link} target="_blank" rel="noreferrer">
                              View paper
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
