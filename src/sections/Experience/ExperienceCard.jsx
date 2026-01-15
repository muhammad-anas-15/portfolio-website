import React from "react";
import { motion } from "framer-motion";

const ExperienceCard = ({
  delay,
  title,
  company,
  duration,
  description,
  tags,
  isLast = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.7 }}
      // UPDATED: Increased max-w to 7xl for wider coverage
      className="relative flex gap-6 md:gap-10 items-stretch w-full max-w-7xl mx-auto group mb-12"
    >
      {/* --- TIMELINE COLUMN (Left) --- */}
      <div className="flex flex-col items-center">
        
        {/* 1. Spinning Neon Reactor Node */}
        <div className="relative w-10 h-10 flex items-center justify-center z-20 shrink-0">
            {/* Spinning Dashed Ring */}
            <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-brand-cyan animate-spin-slow" />
            {/* Core Glowing Dot */}
            <div className="w-4 h-4 bg-brand-cyan rounded-full shadow-[0_0_15px_rgba(0,188,212,1)]" />
        </div>

        {/* 2. Neon Connector Line (Stretches to bottom) */}
        {!isLast && (
           <div className="w-[3px] grow bg-linear-to-b from-brand-cyan via-brand-purple to-transparent opacity-40 shadow-[0_0_10px_rgba(0,188,212,0.4)] mt-2" />
        )}
      </div>

      {/* --- CARD CONTENT (Right) --- */}
      <motion.div
        whileHover={{ 
          scale: 1.02, // Zoom effect
          backgroundColor: "rgba(255, 255, 255, 0.07)", // Brighter glass
          borderColor: "rgba(0, 188, 212, 0.5)", // Aqua Border Glow
          boxShadow: "0 20px 50px -10px rgba(0, 188, 212, 0.2)" // Ambient Glow
        }}
        transition={{ duration: 0.3 }}
        // UPDATED: 'min-h-[250px]' for taller cards, p-8 md:p-10 for more space
        className="glass-card flex-1 p-8 md:p-12 rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden flex flex-col justify-between"
      >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 rounded-4xl from-brand-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8 relative z-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white group-hover:text-brand-cyan transition-colors duration-300">
              {title}
            </h3>
            <p className="text-xl text-gray-300 font-medium mt-1">{company}</p>
          </div>
          
          <span className="shrink-0 px-6 py-2 rounded-full bg-white/5 text-white font-bold text-sm tracking-widest border border-white/10 shadow-lg w-fit">
              {duration}
            </span>
        </div>

        {/* Description List */}
        <ul className="space-y-4 mb-8 relative z-10 grow">
          {description.map((line, i) => (
            <li key={i} className="flex items-start text-gray-300 text-lg leading-relaxed">
              <span className="text-brand-cyan mr-4 mt-1.5 text-base">▹</span>
              {line}
            </li>
          ))}
        </ul>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-3 relative z-10 pt-4 border-t border-white/5">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1.5 text-sm rounded-full border border-white/10 
              bg-white/5 text-gray-300 font-medium
              group-hover:border-brand-cyan/30 group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan 
              transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;