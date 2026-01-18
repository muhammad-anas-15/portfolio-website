import React from "react";
import ExperienceCard from "./ExperienceCard";
import { motion } from "framer-motion";

const experienceData = [
  {
    title: "Web Developer Intern",
    company: "CIMT Mansehra",
    duration: "Jan 2026 - Feb 2026",
    description: [
      "Worked on multiple client-based projects, handling complete development cycles from UI/UX design to backend implementation.",
      "Built responsive and user-focused interfaces while integrating secure and scalable backend services.",
      "Collaborated with designers, developers to deliver production-ready solutions under tight deadlines.",
      "Actively contributed to feature planning, debugging, optimization, and performance improvements across projects.",
    ],
    tags: ["React", "Node.js", "MongoDB", "Express", "UI/UX", "REST APIs"],
  },
  {
    title: "Freelance Frontend",
    company: "Self-Employed",
    duration: "Dec 25 - Present",
    description: [
      "Developed modern, high-quality frontend interfaces for freelance clients with a strong focus on usability and clean design.",
      "Translated design concepts and requirements into reusable React components and smooth user experiences.",
      "Ensured responsiveness, accessibility, and performance optimization across different devices and screen sizes.",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "Responsive Design", "UI Development"],
  },
];

const ExperienceSection = () => {
  return (
    <section 
      id="experience" 
      // UPDATED: Removed 'bg-black/30' and 'backdrop-blur-sm'
      // Now it is transparent so particles show through clearly
      className="relative py-24 min-h-screen w-full overflow-hidden flex flex-col justify-center"
    >
      
      {/* --- OPTIONAL: Local Ambience Blobs --- */}
      {/* Kept these for the 'Liquid Aqua' theme, but they are soft overlays. 
          If you want ONLY particles, you can remove this div. */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] -translate-x-1/2" />
         <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            My <span className="text-brand-cyan">Experience</span>
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-brand-cyan to-brand-purple rounded-full mx-auto"></div>
        </motion.div>

        {/* Experience Timeline Container */}
        <div className="flex flex-col">
          {experienceData.map((exp, index) => (
            <ExperienceCard
              key={index}
              delay={index * 0.2}
              title={exp.title}
              company={exp.company}
              duration={exp.duration}
              description={exp.description}
              tags={exp.tags}
              isLast={index === experienceData.length - 1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;