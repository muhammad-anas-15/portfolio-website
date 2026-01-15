import React from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';
import msgInImg from '../../assets/msgIn_Img.jpeg';
import GenimaImg from '../../assets/Genima_img.jpg';
import Realstateimg from '../../assets/realstate.jpg';

const projectsData = [
  {
    title: "MsgIn",
    // UPDATED: Added unique category
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
    title: "Genima",
    // UPDATED: Added unique category
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
    title: "RealEstate Hub",
    // UPDATED: Added unique category
    category: "Real Estate Platform",
    description: [
      "Modern real estate web application for browsing, filtering, and viewing property listings.",
      "Responsive frontend focused on user experience and smooth navigation.",
      "Integrated dynamic property data with reusable React components."
    ],
    image: Realstateimg,
    tags: ["React.js", "UI Development", "Responsive Design"],
    githubLink: "https://github.com/muhammad-anas-15/real-estate-UI-react"
  }
];

const ProjectSection = () => {
  return (
    <section id="projects" className="relative py-24 min-h-screen bg-black/30 backdrop-blur-sm overflow-hidden">
      
      {/* --- BACKGROUND GLOW --- */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] translate-x-1/2" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] -translate-x-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
          >
            My <span className="text-brand-cyan">Projects</span>
          </motion.h2>
          
          <div className="w-24 h-1.5 bg-linear-to-r from-brand-cyan to-brand-purple rounded-full mx-auto mb-6"></div>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent technical work, turning ideas into functional digital solutions.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={index}
              delay={0.2 * index}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;