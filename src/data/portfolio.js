// ─────────────────────────────────────────────────────────────
// ALL portfolio content lives here. Edit this file to update the
// site — components only handle the design.
//
// Keep this file plain data (no imports): the "Ask me" AI worker
// (ai-worker/) also reads it to build the bot's knowledge.
// Image paths are relative to /public.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Muhammad Anas",
  firstName: "Muhammad",
  lastName: "Anas",
  initials: "MA",
  headline: "AI Engineer & Full Stack Developer",
  location: "Islamabad, Pakistan",
  email: "muhammadannas.2356@gmail.com",
  availability: "Open to internships, AI engineering roles and freelance projects",
  roles: ["AI Engineer", "Agentic AI Builder", "Full Stack Developer"],
  // **double stars** = highlighted words
  tagline:
    "Building **AI agents**, **RAG systems** and **full-stack web apps** that turn complex business logic into intelligent, production-ready products.",
  photo: "images/profile.webp",
  resume: "Muhammad_Anas_Resume.pdf",
  socials: {
    github: "https://github.com/muhammad-anas-15",
    linkedin: "https://www.linkedin.com/in/muhammad-anaspk/",
  },
};

export const about = {
  heading: "Building intelligent software, end to end",
  text:
    "I'm a Computer Science student at FAST-NUCES with hands-on experience building end-to-end AI applications, multi-agent systems and full-stack SaaS platforms. I train machine learning models, build computer-vision forensics pipelines and integrate LLMs and RAG architectures into production-ready web apps — turning complex business logic into intelligent, autonomous systems that deliver measurable impact.",
  highlights: [
    {
      icon: "cpu",
      title: "AI & Multi-Agent Systems",
      text: "Sequential multi-agent pipelines, RAG architectures and LLM apps with LangChain and Gemini.",
    },
    {
      icon: "code",
      title: "Full-Stack & SaaS",
      text: "Scalable, production-ready SaaS platforms with React, Next.js, Node.js and FastAPI.",
    },
    {
      icon: "eye",
      title: "Machine Learning & Vision",
      text: "XGBoost and PyTorch models, plus forensic computer-vision pipelines with OpenCV.",
    },
    {
      icon: "layers",
      title: "Data & Vector Search",
      text: "Schemas across PostgreSQL, MongoDB and vector stores like FAISS for semantic search.",
    },
  ],
};

// Animated counters. `auto` values are calculated from the data below.
export const stats = [
  { value: 2, suffix: "+", label: "Years coding" },
  { value: "auto:projects", suffix: "+", label: "Projects built" },
  { value: "auto:ai", suffix: "", label: "AI systems built" },
  { value: "auto:internships", suffix: "", label: "Internships" },
  { value: "auto:tech", suffix: "+", label: "Technologies" },
];

export const expertise = {
  text:
    "My strongest area is applied AI — agentic pipelines, retrieval-augmented generation and ML models — backed by solid full-stack skills to ship them as real products. Click a skill to see where I stand.",
  skills: [
    { name: "Python", level: 85 },
    { name: "Agentic AI", level: 85 },
    { name: "RAG Pipelines", level: 85 },
    { name: "LLMs", level: 80 },
    { name: "LangChain", level: 80 },
    { name: "C++", level: 90 },
    { name: "JavaScript", level: 80 },
    { name: "TypeScript", level: 80 },
    { name: "React.js", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js / Express", level: 80 },
    { name: "MongoDB", level: 85 },
    { name: "PostgreSQL", level: 80 },
    { name: "Tailwind CSS", level: 85 },
    { name: "Flutter", level: 80 },
    { name: "Docker", level: 80 },
  ],
};

// Tech globe. `icon` keys are mapped to logos in sections/TechStack.jsx
export const techStack = [
  { name: "Python", icon: "python", group: "Languages" },
  { name: "C++", icon: "cplusplus", group: "Languages" },
  { name: "Java", icon: "java", group: "Languages" },
  { name: "JavaScript", icon: "javascript", group: "Languages" },
  { name: "TypeScript", icon: "typescript", group: "Languages" },
  { name: "Dart", icon: "dart", group: "Languages" },
  { name: "LangChain", icon: "langchain", group: "AI & ML" },
  { name: "Gemini", icon: "gemini", group: "AI & ML" },
  { name: "PyTorch", icon: "pytorch", group: "AI & ML" },
  { name: "Scikit-learn", icon: "scikitlearn", group: "AI & ML" },
  { name: "OpenCV", icon: "opencv", group: "AI & ML" },
  { name: "Hugging Face", icon: "huggingface", group: "AI & ML" },
  { name: "Pandas", icon: "pandas", group: "AI & ML" },
  { name: "NumPy", icon: "numpy", group: "AI & ML" },
  { name: "Streamlit", icon: "streamlit", group: "AI & ML" },
  { name: "React", icon: "react", group: "Frontend" },
  { name: "Next.js", icon: "nextjs", group: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwind", group: "Frontend" },
  { name: "HTML5", icon: "html", group: "Frontend" },
  { name: "CSS3", icon: "css", group: "Frontend" },
  { name: "Flutter", icon: "flutter", group: "Frontend" },
  { name: "Node.js", icon: "nodejs", group: "Backend" },
  { name: "Express", icon: "express", group: "Backend" },
  { name: "FastAPI", icon: "fastapi", group: "Backend" },
  { name: "Django", icon: "django", group: "Backend" },
  { name: "Socket.io", icon: "socketio", group: "Backend" },
  { name: "PostgreSQL", icon: "postgresql", group: "Data" },
  { name: "MongoDB", icon: "mongodb", group: "Data" },
  { name: "MySQL", icon: "mysql", group: "Data" },
  { name: "Firebase", icon: "firebase", group: "Data" },
  { name: "Docker", icon: "docker", group: "Tools" },
  { name: "Git", icon: "git", group: "Tools" },
  { name: "GitHub", icon: "github", group: "Tools" },
  { name: "Vercel", icon: "vercel", group: "Tools" },
  { name: "Netlify", icon: "netlify", group: "Tools" },
  { name: "Postman", icon: "postman", group: "Tools" },
  { name: "Figma", icon: "figma", group: "Tools" },
  { name: "Shopify", icon: "shopify", group: "Tools" },
  { name: "Claude Code", icon: "claude", group: "Tools" },
];

// Experience — oldest first. `label` is the big date on the left.
export const experience = [
  {
    label: "Mid 2024",
    role: "Python Developer Intern",
    company: "BIT BUILD",
    location: "Remote",
    period: "Jul 2024 – Aug 2024",
    summary:
      "Wrote and optimised Python programs for automation, data handling and backend processing with a remote team.",
    points: [
      "Developed and optimised Python scripts for automation, data handling and backend processing.",
      "Troubleshot, debugged and improved existing software together with the development team.",
      "Practised the full software development lifecycle, writing clean and maintainable Python code.",
    ],
    tech: ["Python", "Automation", "Debugging", "Remote collaboration"],
    images: [],
  },
  {
    label: "Early 2025",
    role: "Web Developer Intern",
    company: "CIMT Tech",
    location: "Mansehra, Pakistan",
    period: "Jan 2025 – Feb 2025",
    summary:
      "Built responsive, production-ready web pages for client projects — from UI/UX designs through to the database.",
    points: [
      "Converted UI/UX designs into responsive web pages using React.js and CSS.",
      "Followed design layouts closely to keep interfaces clean, user-friendly and visually consistent.",
      "Designed and organised MongoDB schemas for storing user and application data.",
      "Ensured smooth data flow between frontend and backend so applications worked end to end.",
    ],
    tech: ["React.js", "CSS", "Node.js", "Express", "MongoDB", "REST APIs"],
    images: [],
  },
  {
    label: "Mid 2026",
    role: "Full Stack AI Intern",
    company: "Petalnex Pvt Ltd",
    location: "Mansehra, Pakistan",
    period: "Jul 2026 – Aug 2026",
    summary:
      "Built and scaled AI-powered SaaS products on the MERN stack — from responsive interfaces to robust APIs and database design.",
    points: [
      "Developed and maintained scalable SaaS applications with the MERN stack (MongoDB, Express.js, React.js, Node.js).",
      "Integrated AI features into full-stack platforms to enhance products, automate user workflows and deliver intelligent solutions.",
      "Designed responsive, user-friendly frontends and engineered robust RESTful APIs for seamless end-to-end performance.",
      "Collaborated on database architecture and optimised system performance for high-availability SaaS products.",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "AI Integration", "SaaS"],
    images: [],
  },
];

// Education — oldest first
export const education = [
  {
    label: "2018 — 2020",
    degree: "Matriculation (Science) — 85%",
    school: "Peace Group of Schools & Colleges",
    location: "Mansehra, Pakistan",
    details: "",
  },
  {
    label: "2020 — 2022",
    degree: "FSc Pre-Engineering — 89%",
    school: "Peace Group of Schools & Colleges",
    location: "Mansehra, Pakistan",
    details: "",
  },
  {
    label: "2023 — Now",
    degree: "BS Computer Science",
    school: "FAST-NUCES",
    location: "Peshawar, Pakistan",
    details:
      "Relevant courses: OOP, Data Structures & Algorithms, Database Systems, Operating Systems, Software Design, Artificial Intelligence.",
  },
];

// Project categories, in display order (the toggle above the projects).
export const projectCategories = [
  { id: "ai-agents", name: "AI Agents & LLMs" },
  { id: "ml-vision", name: "ML & Vision" },
  { id: "saas", name: "SaaS" },
  { id: "full-stack", name: "Full Stack" },
  { id: "apps", name: "Apps" },
];

// links.github / links.live: leave "" to hide the button.
// `ai: true` counts the project in the "AI systems built" stat.
// No screenshot yet? Leave `image` empty and set `cover` ("voice" | "trading")
// to show a designed cover instead.
export const projects = [
  {
    title: "Agentic Clinical Intelligence Partner",
    category: "ai-agents",
    ai: true,
    label: "Multi-agent triage system",
    image: "images/project-agentic.webp",
    description:
      "A multi-agent emergency-department triage system: a sequential pipeline of 10 specialised agents processes patient data and produces evidence-based treatment recommendations.",
    metrics: [
      { value: "89.97%", label: "Triage accuracy" },
      { value: "87K+", label: "Training records" },
      { value: "18", label: "X-ray pathologies" },
    ],
    points: [
      "5-class XGBoost classifier trained on 87,000+ records, plus KNN and K-Means for patient similarity.",
      "Imaging Agent (DenseNet-121 + CLAHE + Grad-CAM) analyses X-rays across 18 pathologies with heatmaps.",
      "RAG pipeline (FAISS + Gemini) and a live dashboard that drafts treatment plans and flags deterioration.",
    ],
    tech: ["Python", "XGBoost", "PyTorch", "FAISS", "Gemini 2.0", "Streamlit"],
    links: { github: "", live: "" },
  },
  {
    title: "RAG-based Document AI Assistant",
    category: "ai-agents",
    ai: true,
    label: "Multimodal RAG chatbot",
    image: "images/project-rag.webp",
    description:
      "An interactive Document AI platform: upload multiple PDFs and chat with them instantly, with answers grounded in the exact passages retrieved.",
    metrics: [
      { value: "Multi-PDF", label: "Chat over many files" },
      { value: "Semantic", label: "Vector search" },
      { value: "AWS EC2", label: "Dockerised deploy" },
    ],
    points: [
      "Retrieval-augmented generation with LangChain, FAISS vector search and Hugging Face embeddings.",
      "Google Gemini for context-aware answers and accurate synthesis over dense documents.",
      "Containerised with Docker and deployed on AWS EC2.",
    ],
    tech: ["Python", "LangChain", "Gemini API", "FAISS", "Streamlit", "Docker", "AWS"],
    links: { github: "https://github.com/muhammad-anas-15/Multimodal-RAG-Chatbot", live: "" },
  },
  {
    title: "Payment Screenshot Fraud Detection",
    category: "ml-vision",
    ai: true,
    label: "Forensic CV pipeline",
    image: "images/project-fraud.webp",
    description:
      "A hybrid, forensic-grade pipeline that detects forged mobile-payment receipts through pixel-level analysis and machine learning.",
    metrics: [
      { value: "93%+", label: "Detection accuracy" },
      { value: "128", label: "Forensic features" },
      { value: "2-tier", label: "Decision engine" },
    ],
    points: [
      "128 custom forensic features using Error Level Analysis, LBP texture and DCT variance.",
      "Two-tier engine: local XGBoost for fast inference, Gemini 2.5 Pro as a fallback for uncertain cases.",
      "Streamlit app with ROI extraction, ELA heatmaps, confidence scores and downloadable reports.",
    ],
    tech: ["Python", "OpenCV", "Scikit-learn", "XGBoost", "Streamlit"],
    links: { github: "https://github.com/muhammad-anas-15/AI-Powered-Transaction-Receipt-Forgery-Detection-System", live: "" },
  },
  {
    title: "HealthVoiceAI",
    category: "saas",
    ai: true,
    label: "AI medical voice agent",
    image: "",
    cover: "voice",
    description:
      "An AI-powered medical voice assistant: consult a virtual doctor through real-time voice conversation and get AI-driven guidance and an automatic medical report.",
    metrics: [
      { value: "Live voice", label: "Real-time consults" },
      { value: "Auto", label: "Medical reports" },
      { value: "SaaS", label: "Subscriptions & billing" },
    ],
    points: [
      "Real-time voice consultations with an AI doctor, powered by Vapi.",
      "Google Gemini (via OpenRouter) for intelligent answers, with AI doctor matching based on symptoms.",
      "Automatic medical reports after each session, with full session history.",
      "Secure Clerk authentication and a subscription & billing system for premium doctors.",
    ],
    tech: ["Next.js", "Vapi", "Gemini", "OpenRouter", "Clerk", "Serverless APIs"],
    links: { github: "https://github.com/muhammad-anas-15/HealthVoiceAI", live: "" },
  },
  {
    title: "Genima",
    category: "saas",
    ai: true,
    label: "AI text-to-image SaaS",
    image: "images/project-genima.webp",
    description:
      "A SaaS text-to-image platform powered by AI models — type a prompt, get an image, with a clean real-time generation workflow.",
    metrics: [],
    points: [
      "Text-to-image generation through AI model APIs with a real-time workflow.",
      "Clean, intuitive interface designed around the create → preview → download loop.",
      "Full MERN architecture built for performance and scalability.",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "AI APIs"],
    links: { github: "https://github.com/muhammad-anas-15/Genima", live: "" },
  },
  {
    title: "MsgIn",
    category: "full-stack",
    label: "Real-time chat app",
    image: "images/project-msgin.webp",
    description:
      "A real-time chat application with instant message delivery, live user presence and private conversations.",
    metrics: [],
    points: [
      "Instant messaging and online presence powered by Socket.io.",
      "Secure authentication, private conversations and efficient message handling.",
      "Optimised APIs and a structured backend designed to scale.",
    ],
    tech: ["React.js", "Express.js", "MongoDB", "Socket.io"],
    links: { github: "https://github.com/muhammad-anas-15/MsgIN-Web-Application-MERN-Stack", live: "" },
  },
  {
    title: "Estrone",
    category: "full-stack",
    label: "Shopify · luxury lifestyle store",
    image: "images/project-estrone.webp",
    imageNote: "Store no longer live — visual recreation of the original storefront",
    description:
      "A Shopify store for a local Pakistani accessories brand selling watches, earbuds and glasses — built end to end and grown with paid social ads.",
    metrics: [],
    points: [
      "Set up and customised the storefront: premium homepage, collections (Watches, Earbuds, Glasses) and product pages.",
      "Ran paid ad campaigns on Meta (Facebook & Instagram) and TikTok to drive traffic and sales.",
      "Trust sections (free delivery, secure payments, easy returns, order tracking) to turn ad visitors into orders.",
    ],
    tech: ["Shopify", "Theme Customisation", "Meta Ads", "TikTok Ads", "E-commerce"],
    links: { github: "", live: "" },
  },
  {
    title: "Holex",
    category: "full-stack",
    label: "Shopify · premium accessories store",
    image: "images/project-holex.webp",
    imageNote: "Store no longer live — visual recreation of the original storefront",
    description:
      "A Shopify store for a local Pakistani brand selling digital watches, AirPods, chains, rings and bracelets — launched and scaled with TikTok and Meta ads.",
    metrics: [],
    points: [
      "Bold monochrome storefront with a 'Top Picks' grid across watches, chains, rings and bracelets.",
      "Ran TikTok and Meta (Facebook & Instagram) ad campaigns to bring in customers and generate sales.",
      "Mobile-first collections and product pages so ad visitors reach checkout in a few taps.",
    ],
    tech: ["Shopify", "Theme Customisation", "TikTok Ads", "Meta Ads", "E-commerce"],
    links: { github: "", live: "" },
  },
  {
    title: "Zentrix-AI",
    category: "apps",
    ai: true,
    label: "AI trading assistant",
    image: "",
    cover: "trading",
    description:
      "An AI-powered trading assistant that analyses market trends and delivers smart, easy-to-understand trading signals for forex and commodities — helping traders make confident decisions without the guesswork.",
    metrics: [
      { value: "Forex", label: "& commodities" },
      { value: "AI", label: "Trend analysis" },
      { value: "Clear", label: "Trading signals" },
    ],
    points: [
      "Analyses market trends across forex pairs and commodities.",
      "Turns the analysis into smart trading signals that anyone can understand.",
      "Designed to help traders act with confidence instead of guesswork.",
    ],
    tech: [],
    links: { github: "https://github.com/muhammad-anas-15/Zentrix-AI", live: "" },
  },
];

export const contact = {
  marqueeTop: "Got an idea worth building?",
  marqueeBottom: "Let's make it real together —",
  text:
    "I'm open to internships, full-time AI / full-stack roles and freelance projects. Whether it's an agent, a RAG system or a full web app — drop me a message and I'll get back to you.",
};

// "Ask me" AI assistant. It speaks in the first person, as Anas.
export const assistant = {
  name: "Anas · AI",
  greeting:
    "Hey, I'm Anas — well, my AI version 👋 Ask me anything about my projects, skills or experience and I'll answer.",
  starters: [
    "What are you best at?",
    "Tell me about your AI projects",
    "Are you open to work?",
    "How can I reach you?",
  ],
  // Topics the bot must not answer — it points people to email instead.
  privateTopics: ["phone number", "home address", "salary expectations", "personal relationships"],
};
