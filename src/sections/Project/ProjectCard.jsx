import React from 'react';
import { motion } from 'framer-motion';
import { SiGithub } from 'react-icons/si';

// UPDATED: Added 'category' to the props list
const ProjectCard = ({ delay, title, category, description, image, tags, githubLink }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="relative group h-full"
    >
      {/* --- 1. RUNNING BORDER ANIMATION --- */}
      <div className="absolute -inset-px rounded-3xl bg-linear-to-r from-brand-cyan via-brand-purple to-brand-cyan opacity-50 blur-sm group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* --- 2. MAIN CARD CONTAINER --- */}
      <div className="relative flex flex-col h-full bg-[#161618] rounded-3xl overflow-hidden ring-1 ring-white/10">
        
        {/* --- IMAGE SECTION --- */}
        <div className="relative h-64 w-full overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="flex flex-col grow p-8 relative z-20 -mt-8 bg-linear-to-t from-[#161618] via-[#161618] to-transparent pt-12 rounded-t-[2.5rem]">
          
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-white group-hover:text-brand-cyan transition-colors duration-300 drop-shadow-lg">
              {title}
            </h3>
          </div>
          
          {/* Description */}
          <ul className="text-gray-300 space-y-3 mb-8 text-[15px] leading-relaxed grow">
            {description.map((line, idx) => (
              <li key={idx} className="flex items-start group/item">
                <span className="text-brand-cyan mr-3 mt-1.5 text-xs shadow-[0_0_8px_rgba(0,188,212,0.6)] transition-transform group-hover/item:scale-125">●</span>
                <span className="group-hover/item:text-white transition-colors duration-300">{line}</span>
              </li>
            ))}
          </ul>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8 mt-auto border-t border-white/5 pt-6">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="
                  relative px-3 py-1.5 text-xs font-bold text-white tracking-wide
                  rounded-lg overflow-hidden
                  bg-linear-to-br from-white/10 to-transparent
                  border border-white/10
                  shadow-[0_4px_10px_rgba(0,0,0,0.3)]
                  backdrop-blur-md
                  transition-all duration-300
                  hover:border-brand-cyan/50
                  hover:shadow-[0_0_15px_rgba(0,188,212,0.4)]
                  hover:-translate-y-0.5
                  cursor-default
                "
              >
                <span className="absolute inset-0 bg-brand-cyan/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <a 
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-3 w-full py-4 rounded-xl 
            bg-[#1F1F22] border border-white/10 overflow-hidden shadow-lg
            transition-all duration-300 active:scale-95 hover:border-brand-cyan/50"
          >
            <div className="absolute inset-0 bg-linear-to-r from-brand-cyan/0 via-brand-cyan/10 to-brand-cyan/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            
            <SiGithub size={20} className="text-white group-hover/btn:text-brand-cyan transition-colors" />
            <span className="font-semibold text-white group-hover/btn:text-brand-cyan transition-colors">View Code</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;