import React from "react";
import { motion } from "framer-motion";

import { 
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaAws, FaDocker, FaJava, 
  FaBrain, FaSearch, FaRobot, FaHtml5, FaCss3Alt, FaLinux, 
  FaDatabase, FaPaperPlane 
} from "react-icons/fa";

import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, 
  SiPostgresql, SiFirebase, SiCplusplus, SiJavascript, 
  SiMysql, SiFlutter, SiDart, SiPhp
} from "react-icons/si";

const skillsData = [
  {
    category: "Programming Languages",
    skills: [
      { name: "C++", level: 90, icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "Python", level: 85, icon: <FaPython className="text-[#3776AB]" /> },
      { name: "JavaScript", level: 95, icon: <SiJavascript className="text-[#F7DF1E]" /> },
      { name: "Java", level: 80, icon: <FaJava className="text-[#007396]" /> },
      { name: "Dart", level: 85, icon: <SiDart className="text-[#0175C2]" /> }, 
      { name: "PHP", level: 80, icon: <SiPhp className="text-[#777BB4]" /> },
    ],
  },
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML5", level: 100, icon: <FaHtml5 className="text-[#E34F26]" /> },
      { name: "CSS3", level: 95, icon: <FaCss3Alt className="text-[#1572B6]" /> },
      { name: "React.js", level: 95, icon: <FaReact className="text-[#61DAFB]" /> },
      { name: "Next.js", level: 90, icon: <SiNextdotjs className="text-white" /> },
      { name: "TypeScript", level: 85, icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "Tailwind CSS", level: 95, icon: <SiTailwindcss className="text-[#38B2AC]" /> },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", level: 90, icon: <FaNodeJs className="text-[#339933]" /> },
      { name: "Express.js", level: 90, icon: <SiExpress className="text-white" /> },
      { name: "PHP", level: 80, icon: <SiPhp className="text-[#777BB4]" /> },
      { name: "REST APIs", level: 92, icon: <SiExpress className="text-gray-400" /> },
    ],
  },
  {
    category: "Mobile App Development", 
    skills: [
      { name: "Flutter", level: 90, icon: <SiFlutter className="text-[#02569B]" /> },
      { name: "Dart", level: 85, icon: <SiDart className="text-[#0175C2]" /> },
      { name: "iOS & Android Builds", level: 80, icon: <FaReact className="text-gray-300" /> }, 
    ],
  },
  {
    category: "Database & Cloud",
    skills: [
      { name: "MongoDB", level: 92, icon: <SiMongodb className="text-[#47A248]" /> },
      { name: "MySQL", level: 85, icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "PostgreSQL", level: 85, icon: <SiPostgresql className="text-[#336791]" /> },
      { name: "Firebase", level: 88, icon: <SiFirebase className="text-[#FFCA28]" /> },
      { name: "Vector DBs", level: 80, icon: <FaDatabase className="text-white" /> },
    ],
  },
  {
    category: "Generative AI",
    skills: [
      { name: "Large Language Models", level: 85, icon: <FaBrain className="text-[#A4C639]" /> },
      { name: "LangChain", level: 85, icon: <FaRobot className="text-white" /> },
      { name: "Agentic AI", level: 80, icon: <FaRobot className="text-pink-400" /> },
      { name: "RAG Pipelines", level: 80, icon: <FaSearch className="text-brand-cyan" /> },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", level: 95, icon: <FaGitAlt className="text-[#F05032]" /> },
      { name: "Docker", level: 80, icon: <FaDocker className="text-[#2496ED]" /> },
      { name: "Postman", level: 90, icon: <FaPaperPlane className="text-[#FF6C37]" /> }, 
      { name: "Linux / Bash", level: 85, icon: <FaLinux className="text-white" /> },
    ],
  },
];

const SkillBar = ({ name, level, icon }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-4 text-white font-medium">
          <span className="text-2xl drop-shadow-md">{icon}</span>
          <span className="text-lg tracking-wide text-gray-200">{name}</span>
        </div>
        <span className="text-sm font-bold text-brand-cyan">{level}%</span>
      </div>
      
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full shadow-[0_0_10px_rgba(0,188,212,0.5)] relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </motion.div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 px-6 bg-transparent overflow-hidden min-h-screen flex flex-col justify-center">
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] -translate-x-1/2" />
      </div> */}

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-white">
            Technical <span className="text-brand-cyan">Proficiency</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A breakdown of my technical expertise and the technologies I use to build scalable solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {skillsData.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group w-full"
            >
              <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-cyan opacity-0 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>

              <div className="relative bg-[#161618]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 md:p-12 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-transparent group-hover:-translate-y-1">
 
                <h3 className="text-3xl font-bold text-white mb-10 border-b border-white/10 pb-6 flex items-center gap-5">
                  <span className="w-2 h-10 bg-gradient-to-b from-brand-cyan to-brand-purple rounded-full shadow-[0_0_15px_rgba(0,188,212,0.6)]"></span>
                  {category.category}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
                  {category.skills.map((skill, i) => (
                    <SkillBar key={i} {...skill} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Skills;