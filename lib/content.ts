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
  study: "Master’s student in Computer Science, Rice University",
  location: "Houston, TX",
  summary:
    "I fine-tune and evaluate language and vision-language models, and build the infrastructure that keeps them reliable once they’re deployed.",
  email: "kaavinb7@gmail.com",
  github: { label: "GitHub", href: "https://github.com/KaavinB" },
  linkedin: { label: "LinkedIn", href: "https://linkedin.com/in/kaavin" },
  lookingFor:
    "I graduate in December 2026 and I’m looking for full-time ML engineering roles, especially in LLM systems, model evaluation and MLOps.",
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
    title: "Medical VLM reliability evaluation",
    role: "Co-author: evaluation, metrics and fine-tuning",
    stack: ["PyTorch", "Hugging Face", "Qwen-VL", "LoRA", "4-bit NF4"],
    result: { value: "76.8%", label: "of Qwen3-VL’s errors made with high confidence" },
    built: [
      "An evaluation of Qwen2.5-VL-7B and Qwen3-VL-8B on a balanced set of 200 chest X-rays, zero-shot and fine-tuned with LoRA, scoring each diagnosis together with its stated confidence and explanation.",
      "Accuracy and F1 hid the real problem, so we added metrics for overconfident errors, fluency and faithfulness. The strongest model still missed over half of pneumonia cases, and its wrong answers were its most fluent: 0.855 fluency on errors against 0.655 accuracy.",
    ],
    link: {
      href: "https://github.com/KaavinB/Medical-VLM-Reliability-Evaluation",
      label: "KaavinB/Medical-VLM-Reliability-Evaluation",
    },
  },
  {
    number: "02",
    scene: 2,
    title: "LLaMA fine-tuning for research classification",
    role: "Fine-tuning and data curation",
    stack: ["PyTorch", "Hugging Face", "LoRA", "4-bit NF4"],
    result: { value: "40% → 67%", label: "classification accuracy" },
    built: [
      "Fine-tuned LLaMA-3.2-3B to sort arXiv papers by research area from their title and abstract, using a balanced dataset of 2,000+ abstracts I curated.",
      "Rank-16 LoRA adapters on a 4-bit NF4 base cut the trainable parameters to about 6M, so the whole thing trains on a local GPU. Zero-shot and adapted models run through the same inference pipeline for a fair comparison.",
    ],
    link: { href: "https://github.com/KaavinB/finetuning_arXiv", label: "KaavinB/finetuning_arXiv" },
  },
  {
    number: "03",
    scene: 3,
    title: "MLOps sentiment pipeline on AWS",
    role: "Pipeline and infrastructure",
    stack: ["Docker", "AWS EKS", "GitHub Actions", "DVC", "MLflow", "Prometheus", "Grafana"],
    result: { value: "71% → 87.7%", label: "test accuracy" },
    built: [
      "A sentiment classifier for 50K IMDB reviews, taken from raw data to a monitored endpoint on AWS EKS. DVC versions the data and MLflow tracks every run and holds the model registry.",
      "One git push runs a 10-step GitHub Actions workflow: rebuild the pipeline, test the model and the server, promote the model to Production and roll the new image out to EKS through ECR. Prometheus and Grafana track latency, throughput and health, with p95 latency at 12.8 ms.",
    ],
    link: { href: "https://github.com/KaavinB/mlops-sentiment-pipeline", label: "KaavinB/mlops-sentiment-pipeline" },
  },
];

export type MinorProject = { title: string; description: string; href: string };

export const minorProjects: MinorProject[] = [
  {
    title: "RAG with citations",
    description:
      "Question answering over PDFs with ChromaDB and Claude. Answers cite the printed page they came from, and the system says it doesn’t know when retrieval comes back weak.",
    href: "https://github.com/KaavinB/RAG",
  },
  {
    title: "Houston route comparison",
    description:
      "Built with a teammate for the FIFA Sustainability Hackathon: compares routes to World Cup matches by shade, heat and carbon, not just time. I added METRORail and bus routing, step-free routes and weather-aware trip planning.",
    href: "https://github.com/KaavinB/fifa-sustainability-hackathon",
  },
  {
    title: "Federated learning for wind prediction",
    description:
      "An LSTM for wind forecasting trained across clients with Flower. Each node shares only model updates, so raw data stays on-site.",
    href: "https://github.com/KaavinB/Wind-Prediction-LSTM-Federated-Learning",
  },
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
    start: "May 2026",
    end: "Aug 2026",
    role: "AI Engineering Intern",
    org: "Rice Center for Engineering Leadership",
    place: "Houston, TX",
    description:
      "Built a natural-language search tool that ranks 68 US AAU universities by research strength across 110K dissertations, for faculty hiring committees. Bayesian shrinkage corrected a small-sample bias that inflated specialization scores up to 18×, cutting unreliable rankings by 88%. Queries are matched to a 77-topic taxonomy with coarse-to-fine search over MiniLM embeddings and checked by an LLM, served through FastAPI on GCP Cloud Run.",
  },
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

export type Degree = { org: string; program: string; place: string; dates: string; gpa: string };

export const education: Degree[] = [
  {
    org: "Rice University",
    program: "Master of Computer Science",
    place: "Houston, TX",
    dates: "Graduating Dec 2026",
    gpa: "GPA 3.68 / 4.0",
  },
  {
    org: "Vellore Institute of Technology",
    program: "B.Tech in Electronics and Computer Engineering",
    place: "Chennai, India",
    dates: "Aug 2021 – Apr 2025",
    gpa: "GPA 8.66 / 10",
  },
];

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

export const toolkit: { group: string; items: string[] }[] = [
  { group: "Languages & data", items: ["Python", "Java", "SQL", "NumPy", "Pandas", "SciPy", "SQLite", "MongoDB"] },
  {
    group: "Machine learning",
    items: ["PyTorch", "Hugging Face Transformers", "TensorFlow", "LoRA & quantization", "LLMs & VLMs", "Computer vision"],
  },
  { group: "LLM systems", items: ["Embeddings", "RAG", "Semantic search", "Model evaluation"] },
  {
    group: "MLOps & cloud",
    items: ["AWS (EKS, EC2, S3)", "GCP Cloud Run", "Docker", "FastAPI", "MLflow", "DVC", "GitHub Actions", "Prometheus & Grafana", "Git"],
  },
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
