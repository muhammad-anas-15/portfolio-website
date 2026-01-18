import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUser, FiZap, FiCloud } from 'react-icons/fi';
import profileImg from '../../assets/admin-profile-2.png';
// Import Resume
import resumePDF from "../../assets/Resume.pdf";

const About = () => {
  const highlights = [
    {
      icon: <FiCode />,
      title: "Full-Stack Development",
      text: "Expertise in scalable architectures using MERN & Next.js.",
    },
    {
      icon: <FiZap />,
      title: "Modern Frontend",
      text: "Creating responsive and interactive UIs with React.js and Next.js.",
    },
    {
      icon: <FiUser />,
      title: "Database Management",
      text: "Working with MongoDB and MySQL to design and manage efficient data models.",
    },
    {
      icon: <FiCloud />, 
      title: "Cloud Native Solutions", 
      text: "Deploying resilient applications using modern cloud infrastructure.",
    },
  ];

  return (
    <section id="about" className="relative py-12 w-full overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-y-1/2 -z-10" />

      {/* CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            About <span className="text-brand-cyan">Me</span>
          </h2>
          <div className="w-24 h-1.5 bg-linear-to-r from-brand-cyan to-brand-purple rounded-full mx-auto"></div>
        </motion.div>

        {/* TWO COLUMNS LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"> 

          {/* LEFT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
             {/* 1. Profile Image */}
             <div className="flex justify-center lg:justify-start">
                <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                   <div className="absolute inset-0 rounded-full border-8 border-dashed border-brand-purple animate-[spin_10s_linear_infinite] shadow-[0_0_30px_rgba(140,70,255,0.6)]" />
                   <div className="absolute inset-0 rounded-full bg-brand-cyan/20 blur-2xl group-hover:bg-brand-purple/40 transition-all duration-500" />
                   <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/5 shadow-2xl z-10 bg-brand-dark">
                      <img 
                        src={profileImg} 
                        alt="Muhammad Anas" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                   </div>
                </div>
             </div>

             {/* 2. Text Content */}
             <div className="space-y-4 text-center lg:text-left">
                <p className="text-gray-400 text-lg leading-relaxed">
                  A Computer Science student with hands-on experience in MERN stack development. 
                  I have worked on real-world projects involving authentication, databases, APIs, 
                  and deployment, with a strong interest in building practical, user-friendly web applications.
                </p>

                {/* 3. Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
                  <a href="#contact" className="btn-primary text-center">
                    Get in Touch
                  </a>
                  
                  {/* DOWNLOAD RESUME BUTTON */}
                  <a 
                    href={resumePDF} 
                    download="Muhammad_Anas_Resume.pdf"
                    className="px-8 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 hover:border-brand-cyan transition-all text-center"
                  >
                    Download Resume
                  </a>
                </div>
             </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4 justify-center h-full"
          >
            {highlights.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 10, borderColor: "rgba(0, 188, 212, 0.5)" }}
                className="glass-card p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 group hover:bg-brand-cyan/5 border border-white/5"
              >
                <div className="shrink-0 p-3 rounded-xl bg-brand-cyan/10 text-brand-cyan text-2xl group-hover:bg-brand-cyan group-hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(0,188,212,0.2)]">
                  {item.icon}
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default About;