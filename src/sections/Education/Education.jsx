import React from "react";
import { motion } from "framer-motion";

// --- Helper: Timeline Connector ---
const TimelineConnector = ({ isLast }) => (
  <div className="flex flex-col items-center mr-6 md:mr-10">
    <div className="w-6 h-6 rounded-full bg-brand-cyan border-4 border-[#0a0a0a] z-10 shadow-[0_0_20px_rgba(0,188,212,0.8)]" />
    {!isLast && (
      <div className="w-1 grow bg-linear-to-b from-brand-cyan to-transparent my-2 opacity-50" />
    )}
  </div>
);

// --- Helper: Education Card ---
const EducationCard = ({ degree, institution, duration, description, isLast, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="flex w-full mb-16 last:mb-0"
    >
      <TimelineConnector isLast={isLast} />
      
      {/* --- CARD WRAPPER --- */}
      <div className="relative grow group">
        
        {/* --- 1. RUNNING BORDER ANIMATION (Exact match to Project Card) --- */}
        {/* Adjusted rounded-3xl to rounded-[2.5rem] to fit this card's shape */}
        <div className="absolute inset-px rounded-[2.5rem] bg-linear-to-r from-brand-cyan via-brand-purple to-brand-cyan opacity-50 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>

        {/* --- 2. MAIN CARD CONTENT --- */}
        <motion.div 
          whileHover={{ y: -5 }} 
          className="relative h-full bg-[#161618] rounded-[2.5rem] border border-white/10 p-8 md:p-12 overflow-hidden"
        >
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-4 relative z-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {degree}
              </h3>
              <p className="text-brand-cyan font-bold text-lg uppercase tracking-wider mt-3 drop-shadow-[0_0_5px_rgba(0,188,212,0.4)]">
                {institution}
              </p>
            </div>
            
            {/* Duration Badge */}
            <span className="shrink-0 px-6 py-2 rounded-full bg-white/5 text-white font-bold text-sm tracking-widest border border-white/10 shadow-lg w-fit">
              {duration}
            </span>
          </div>

          {/* Description List */}
          <ul className="space-y-4 relative z-10">
            {description.map((point, idx) => (
              <li key={idx} className="flex items-start text-gray-300 text-lg leading-relaxed">
                <span className="text-brand-cyan mr-4 mt-1.5 text-xs shadow-[0_0_8px_rgba(0,188,212,0.6)]">●</span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  const educationData = [
  {
    degree: "Bachelor of Computer Science",
    institution: "FAST NUCES Peshawar",
    duration: "2023 - Present",
    description: [
      "Currently enrolled in the 6th semester with a strong focus on software development and problem-solving.",
      "Studying core subjects including Data Structures, OOP ,Databases, Operating Systems and Software Design.",
      "Actively applying academic concepts to real-world projects and full-stack application development."
    ],
  },
  {
    degree: "FSc (Pre-Medical) with Additional Mathematics",
    institution: "Peace Group of School & Colleges , Mansehra ",
    duration: "2020 - 2022",
    description: [
      "Completed intermediate education with a strong academic record, securing 90% overall marks.",
      "Studied Mathematics, English, and core science subjects with an emphasis on analytical thinking.",
    ],
  },
  {
    degree: "Matriculation (SSC)",
    institution: "Peace Group of School & Colleges , Mansehra ",
    duration: "2018 - 2020",
    description: [
      "Completed matriculation with 85% marks, majoring in Mathematics and English.",
    ],
  },
];


  return (
    <section id="education" className="relative py-24 px-6 bg-black/30 backdrop-blur-sm overflow-hidden">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-x-1/2" />
         <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
          >
            My <span className="text-brand-cyan">Education</span>
          </motion.h2>
          
          <div className="w-24 h-1.5 bg-linear-to-r from-brand-cyan to-brand-purple rounded-full mx-auto mb-6"></div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The academic foundation of my professional journey.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {educationData.map((edu, index) => (
            <EducationCard
              key={index}
              index={index}
              isLast={index === educationData.length - 1}
              {...edu}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;