import React from "react";
import { motion } from "framer-motion";

// 💡 Importing all necessary icons (Updated for AI/ML + Full Stack)
import {
  SiMongodb,
  SiMysql,
  SiExpress,
  SiReact,
  SiFramer,
  SiNextdotjs,
  SiVercel,
  SiGit,
  SiGithub,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiPostman,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiStreamlit,
  SiFastapi,
  SiPostgresql,
} from "react-icons/si";
import { FaJava, FaRobot } from "react-icons/fa";
import { FiDatabase, FiCpu } from "react-icons/fi";

// --- Helper component for individual skill item ---
const SkillItem = ({ name, icon: Icon, color, size = 40 }) => {
  
  // Glow Variants from Home Section
  const glowVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.2,
      y: -3,
      filter: "drop-shadow(0 0 8px rgba(0, 188, 212, 0.9)) drop-shadow(0 0 18px rgba(140, 70, 255, 0.8))",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  return (
    <div className="flex items-center space-x-3 p-3 min-w-max mx-4">
      <motion.div 
        style={{ color: color }} 
        className="text-3xl transition-all duration-300 cursor-pointer"
        initial="initial"
        whileHover="hover"
        variants={glowVariants}
      >
         {React.cloneElement(Icon, { size })}
      </motion.div>
      <p className="text-lg font-medium whitespace-nowrap text-gray-300 pointer-events-none">{name}</p>
    </div>
  );
};

// --- Helper component for the scrolling track ---
const SkillRow = ({ skills, direction = "right", speed = "60s" }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];
  const animationName = direction === "right" ? "scrollRight" : "scrollLeft";

  return (
    <div className="group flex overflow-hidden w-full py-2 my-0 mask-gradient">
       <style>{`
         .mask-gradient {
           mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
         }
         .group:hover .animate-scrolling {
           animation-play-state: paused !important;
         }
       `}</style>
       
      <div
        className="flex shrink-0 animate-scrolling"
        style={{
          animationName: animationName,
          animationDuration: speed,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillItem key={`${skill.name}-${index}`} {...skill} />
        ))}
      </div>
    </div>
  );
};

// --- Main TechStack component ---
const TechStack = () => {
  
  // Data Lists Updated for AI/ML & MERN
  
  // Row 1: Languages & Core AI
  const row1Skills = [
    { name: "Python", icon: <SiPython />, color: "#3776AB" },
    { name: "C/C++", icon: <SiCplusplus />, color: "#00599C" },
    { name: "Java", icon: <FaJava />, color: "#007396" },
    { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
    { name: "Scikit-Learn", icon: <SiScikitlearn />, color: "#F7931E" },
    { name: "LangChain / LLMs", icon: <FaRobot />, color: "#06B6D4" },
  ];

  // Row 2: Web Frontend & UI Apps
  const row2Skills = [
    { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "React", icon: <SiReact />, color: "#61DAFB" },
    { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
    { name: "Streamlit", icon: <SiStreamlit />, color: "#FF4B4B" },
  ];

  // Row 3: Backend & Databases
  const row3Skills = [
    { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
    { name: "Express.js", icon: <SiExpress />, color: "#ffffff" },
    { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
    { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    { name: "FAISS / Vector DBs", icon: <FiDatabase />, color: "#00A67E" },
  ];

  // Row 4: Tools, Vision & Deployment
  const row4Skills = [
    { name: "OpenCV", icon: <SiOpencv />, color: "#5C3EE8" },
    { name: "Multi-Agent Systems", icon: <FiCpu />, color: "#8A2BE2" },
    { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
    { name: "Git & GitHub", icon: <SiGithub />, color: "#FFFFFF" },
    { name: "Vercel", icon: <SiVercel />, color: "#FFFFFF" },
    { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
  ];

  return (
    <section id="skills" className="relative py-24 w-full overflow-hidden bg-black/30 backdrop-blur-sm">
      
      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes scrollLeft {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-25%); } 
          }
          @keyframes scrollRight {
            0% { transform: translateX(-25%); }
            100% { transform: translateX(0%); }
          }
        `}
      </style>

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] 
          rounded-full bg-linear-to-r from-brand-purple via-brand-teal to-brand-cyan 
          opacity-30 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse">
        </div>

        <div className="absolute bottom-0 left-0 w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-linear-to-r from-brand-purple via-brand-teal to-brand-cyan
          opacity-30 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500">
        </div>
      </div>

      {/* CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
            Tech <span className="text-brand-cyan">Stack</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full mx-auto"></div>
        </motion.div>

        {/* Scrolling Rows */}
        <div className="flex flex-col gap-1">
            <SkillRow skills={row1Skills} direction="right" speed="50s" />
            <SkillRow skills={row2Skills} direction="left" speed="60s" />
            <SkillRow skills={row3Skills} direction="right" speed="55s" />
            <SkillRow skills={row4Skills} direction="left" speed="65s" />
        </div>

      </div>
    </section>
  );
};

export default TechStack;