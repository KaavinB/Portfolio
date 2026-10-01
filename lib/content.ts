/**
 * Every fact rendered on the site lives here. Components only arrange it.
 * `scene` values refer to the sculpture states in `components/scene/states.ts`,
 * which are ordered to match the page.
 */

export const person = {
  name: "Kaavin Balasubramanian",
  firstName: "Kaavin",
  lastName: "Balasubramanian",
  role: "Machine learning engineer",
  study: "Computer Science graduate student, Rice University",
  location: "Houston, TX",
  summary:
    "Most of my work is on the deployment side of machine learning: fine-tuning, monitoring, and getting models to work reliably outside a notebook.",
  email: "kaavinb7@gmail.com",
  github: { label: "GitHub", href: "https://github.com/KaavinB" },
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/kaavin" },
  lookingFor:
    "I’m looking for ML engineering roles, especially in MLOps and LLM systems, but I’m open to most things.",
} as const;

/** The personal thread. Used sparingly; never as the subject of professional copy. */
export const club = {
  name: "Chelsea FC",
  /** "Keep the blue flag flying high" */
  motto: "KTBFFH",
} as const;

export const sections = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "more", label: "More work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export type FeaturedProject = {
  number: string;
  scene: number;
  title: string;
  role: string;
  stack: string[];
  result?: { value: string; label: string };
  built: string[];
  link: { href: string; label: string };
};

export const featuredProjects: FeaturedProject[] = [
  {
    number: "01",
    scene: 1,
    title: "LLaMA fine-tuning for research classification",
    role: "Fine-tuning and data curation",
    stack: ["PyTorch", "Hugging Face", "LoRA"],
    result: { value: "40% → 67%", label: "classification accuracy" },
    built: [
      "Fine-tuned LLaMA with LoRA on arXiv papers for research topic classification.",
      "Most of the accuracy gain came from better data curation, not from changes to the model.",
    ],
    link: { href: "https://github.com/KaavinB/finetuning_arXiv", label: "KaavinB/finetuning_arXiv" },
  },
  {
    number: "02",
    scene: 2,
    title: "MLOps sentiment pipeline on AWS",
    role: "Pipeline and infrastructure",
    stack: ["AWS EKS", "Docker", "DVC", "MLflow", "Prometheus", "Grafana"],
    built: [
      "An end-to-end sentiment analysis pipeline running on AWS EKS.",
      "Data is versioned with DVC, experiments are tracked in MLflow, and the deployed model is monitored with Prometheus and Grafana.",
    ],
    link: { href: "https://github.com/KaavinB", label: "github.com/KaavinB" },
  },
  {
    number: "03",
    scene: 3,
    title: "Federated learning for wind prediction",
    role: "Model and federated training setup",
    stack: ["TensorFlow", "Flower", "LSTM"],
    built: [
      "A federated LSTM for wind prediction built with Flower.",
      "Each node trains on its own data and shares only model updates, so raw data stays on-site.",
    ],
    link: {
      href: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
      label: "KaavinB/Wind-Prediction-LSTM-Federated-Learning",
    },
  },
];

export type MinorProject = { title: string; description: string; href: string };

export const minorProjects: MinorProject[] = [
  {
    title: "COVID-19 detection from chest X-rays",
    description: "Compared a custom CNN with VGG-16. VGG-16 did significantly better with less training data.",
    href: "https://github.com/KaavinB/COVID-19-Detection-using-X-ray",
  },
  {
    title: "Face liveness detection",
    description: "A CNN that tells real faces from spoofs, with heavy augmentation to cope with different lighting.",
    href: "https://github.com/KaavinB/face-liveness",
  },
  {
    title: "Realtime spam detection",
    description: "A spam classifier connected to IMAP that logs feature distributions over time to catch drift.",
    href: "https://github.com/KaavinB/Realtime_Spam_Detection",
  },
];

export type Role = {
  start: string;
  end: string;
  role: string;
  detail?: string;
  org: string;
  place: string;
  description: string;
};

export const experience: Role[] = [
  {
    start: "Aug 2025",
    end: "Present",
    role: "Teaching Assistant",
    detail: "Automata, Formal Languages & Computability",
    org: "Rice University",
    place: "Houston, TX",
    description:
      "Office hours and grading for a graduate automata theory course. Helping students work through formal proofs is harder to teach than it looks.",
  },
  {
    start: "Jan 2024",
    end: "Apr 2024",
    role: "Software Engineering Intern",
    org: "VIT Chennai",
    place: "Chennai, India",
    description:
      "Built a face-recognition attendance system used by 500+ students on campus. Got inference under 0.5s and shipped a companion React Native app to production.",
  },
  {
    start: "Nov 2023",
    end: "Dec 2023",
    role: "Machine Learning Research Intern",
    org: "VIT Chennai",
    place: "Chennai, India",
    description:
      "Built LSTM models for wind energy forecasting that beat the baseline by about 10%, and set up a federated training pipeline with Flower to keep raw data local.",
  },
];

export const education = {
  org: "Rice University",
  program: "Graduate student, Computer Science",
  place: "Houston, TX",
};

export type Publication = { title: string; venue: string; note: string };

export const publications: Publication[] = [
  {
    title: "AI-Powered Attendance System Using Facial Recognition",
    venue: "IEEE Conference, 2024",
    note: "From the VIT internship: the system architecture and deployment decisions, including latency optimisation and where inference runs.",
  },
  {
    title: "Enhancing Drug Repositioning Through Collaborative Metric Learning",
    venue: "IEEE, July 2024",
    note: "Collaborative metric learning for drug–disease association prediction, with better ranking performance on CTD benchmarks.",
  },
  {
    title: "AI Applications in Nutrition & Education",
    venue: "IEEE Conference, 2024",
    note: "A survey of applied AI in nutrition and education that looks at deployment context and practical evaluation, not just benchmark accuracy.",
  },
];

/** NPTEL certificate subjects */
export const certifications = ["CSR", "Educational Leadership", "Emotional Intelligence"];

export const toolkit: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "R", "SQL"] },
  {
    group: "ML & deep learning",
    items: ["PyTorch", "TensorFlow", "Keras", "scikit-learn", "Hugging Face", "LoRA", "LLaMA", "Flower"],
  },
  { group: "Data & cloud", items: ["AWS (EKS, EC2, S3)", "Docker", "MLflow", "Prometheus", "Grafana", "MongoDB", "DVC"] },
  { group: "Tools", items: ["OpenCV", "Pandas", "NumPy", "Matplotlib", "React Native", "Git", "CI/CD"] },
];

/** Football seasons run August to May: Jan 2024 sits in 23/24. */
export function season(date: string) {
  const [mon, year] = date.split(" ");
  const y = Number(year);
  if (!y) return null;
  const late = ["Aug", "Sep", "Oct", "Nov", "Dec"].includes(mon);
  const from = late ? y : y - 1;
  return `${String(from).slice(2)}/${String(from + 1).slice(2)}`;
}
