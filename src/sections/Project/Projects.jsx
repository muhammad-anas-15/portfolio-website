import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';

// --- EXISTING IMAGES ---
import msgInImg from '../../assets/msgIn_Img.jpeg';
import GenimaImg from '../../assets/Genima_img.jpg';
import Realstateimg from '../../assets/realstate.jpg';
import Rag_based from '../../assets/Rag_based.png';
import Agentic_img from '../../assets/Agentic_Clinical.png';
import fake_screenshot from '../../assets/fake_screenshot.png';

// --- NEW AI PROJECT IMAGES (Update these with your actual files!) ---
// import agenticImg from '../../assets/agentic.jpg';
// import fraudDetectionImg from '../../assets/fraud_detection.jpg';
// import medicalVoiceImg from '../../assets/medical_voice.jpg';

const projectsData = [
  // --- FULL STACK PROJECTS ---
  {
    type: "full-stack",
    title: "MsgIn",
    category: "Real-time Chat App",
    description: [
      "Real-time chat application with instant message delivery and live user presence.",
      "Secure authentication, private conversations, and efficient message handling.",
      "Designed for scalability with optimized APIs and structured backend architecture."
    ],
    image: msgInImg,
    tags: ["React.js", "Express.js", "MongoDB", "Socket.io"],
    githubLink: "https://github.com/muhammad-anas-15/MsgIN-Web-Application-MERN-Stack"
  },
  {
    type: "full-stack",
    title: "Genima",
    category: "AI SaaS Platform",
    description: [
      "SaaS-based text-to-image generation platform powered by AI models.",
      "Clean, intuitive user interface with real-time image generation workflow.",
      "Built with a full MERN stack architecture ensuring performance and scalability."
    ],
    image: GenimaImg,
    tags: ["MongoDB", "Express.js", "React.js", "Node.js", "AI APIs"],
    githubLink: "#"
  },
  {
    type: "full-stack",
    title: "RealEstate Hub",
    category: "Real Estate Platform",
    description: [
      "Modern real estate web application for browsing, filtering, and viewing property listings.",
      "Responsive frontend focused on user experience and smooth navigation.",
      "Integrated dynamic property data with reusable React components."
    ],
    image: Realstateimg,
    tags: ["React.js", "UI Development", "Responsive Design"],
    githubLink: "https://github.com/muhammad-anas-15/real-estate-UI-react"
  },

  // --- AI / ML PROJECTS ---
  {
    type: "ai-ml",
    title: "Agentic Intelligence Partner",
    category: "Multi-Agent System",
    description: [
      "Multi-agent emergency department triage system using a sequential pipeline of 10 distinct agents.",
      "Trained a 5-class XGBoost classifier on 87,000+ records and integrated a DenseNet Imaging Agent.",
      "Implemented a multimodal RAG pipeline with a real-time Streamlit dashboard for treatment plans."
    ],
    image: Agentic_img, // Replace with 'agenticImg'
    tags: ["Python", "XGBoost", "PyTorch", "FAISS", "Gemini 2.0"],
    githubLink: "#"
  },
  {
    type: "ai-ml",
    title: "Fraud Receipt Detection",
    category: "Computer Vision Pipeline",
    description: [
      "Hybrid forensic-grade pipeline to detect forged mobile payment receipts, achieving 93%+ accuracy.",
      "Engineered 128 custom forensic features using Error Level Analysis (ELA) and DCT variance.",
      "Developed a two-tier decision engine using local XGBoost for fast inference and Gemini Pro fallback."
    ],
    image: fake_screenshot, // Replace with 'fraudDetectionImg'
    tags: ["OpenCV", "Scikit-Learn", "XGBoost", "Python"],
    githubLink: "#"
  },
  {
    type: "ai-ml",
    title: "RAG-Based Document AI",
    category: "RAG & LLM Application",
    description: [
      "Built an interactive Document AI platform that allows users to upload multiple PDFs and chat with their data instantly.",
      "Engineered a robust Retrieval-Augmented Generation (RAG) pipeline using LangChain, FAISS vector search, and HuggingFace embeddings.",
      "Integrated Google Gemini 2.5 Flash for context-aware answering and deployed via Docker on AWS EC2."
    ],
    image: Rag_based, // Replace with 'ragProjectImg'
    tags: ["Python", "LangChain", "Gemini API", "FAISS", "Streamlit", "AWS"],
    githubLink: "#"
  }
];

const ProjectSection = () => {
  // State to manage which tab is active
  const [activeTab, setActiveTab] = useState("full-stack");

  // Filter projects based on active tab
  const filteredProjects = projectsData.filter(project => project.type === activeTab);

  return (
    <section id="projects" className="relative py-24 min-h-screen bg-black/30 backdrop-blur-sm overflow-hidden">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
          >
            My <span className="text-brand-cyan">Projects</span>
          </motion.h2>
          
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full mx-auto mb-6"></div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent technical work, turning ideas into functional digital solutions.
          </p>
        </div>

        {/* --- TOGGLE BUTTONS --- */}
        <div className="flex justify-center mb-16 relative z-20">
          <div className="bg-white/5 p-1.5 rounded-2xl inline-flex backdrop-blur-md border border-white/10 shadow-xl">
            <button
              onClick={() => setActiveTab("full-stack")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base tracking-wide ${
                activeTab === "full-stack" 
                  ? "bg-gradient-to-r from-brand-cyan to-blue-500 text-white shadow-lg shadow-brand-cyan/25" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Full Stack
            </button>
            <button
              onClick={() => setActiveTab("ai-ml")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base tracking-wide ${
                activeTab === "ai-ml" 
                  ? "bg-gradient-to-r from-brand-purple to-pink-500 text-white shadow-lg shadow-brand-purple/25" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              AI / ML
            </button>
          </div>
        </div>

        {/* 3 Column Grid with Animation for Switching */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard 
                  delay={0} // Handled by AnimatePresence now
                  {...project}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectSection;