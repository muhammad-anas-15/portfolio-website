import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

// Import Resume from assets
import resumePDF from "../../assets/Resume.pdf"; 

const Home = () => {
  const roles = useMemo(() => ["Full Stack Engineer", "Software Developer"], []);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const socials = [
    { Icon: FaEnvelope, label: "Email", href: "mailto:muhammadannas.2356@gmail.com" },
    { Icon: FaLinkedin, label: "Linkedin", href: "https://www.linkedin.com/in/muhammad-anaspk/" },
    { Icon: FaGithub, label: "Github", href: "https://github.com/muhammad-anas-15" },
  ];

  // Glow variants
  const glowVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.2,
      y: -3,
      filter: "drop-shadow(0 0 8px rgba(0, 188, 212, 0.9)) drop-shadow(0 0 18px rgba(140, 70, 255, 0.8))",
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
  };

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="home" className="w-full min-h-screen relative bg-black/30 backdrop-blur-sm overflow-hidden flex items-center">

      {/* Background Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-32 w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px] 
          rounded-full bg-linear-to-r from-brand-purple via-brand-teal to-brand-cyan 
          opacity-30 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse">
        </div>

        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw]
          h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
          rounded-full bg-linear-to-r from-brand-purple via-brand-teal to-brand-cyan
          opacity-30 blur-[100px] sm:blur-[130px] md:blur-[150px] animate-pulse delay-500">
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 lg:pt-0 flex flex-col justify-center text-center lg:text-left flex-grow">

        {/* Typewriter Text */}
        <motion.div
          className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-semibold"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span>{roles[index].substring(0, subIndex)}</span>
          <span className="inline-block w-0.5 ml-1 bg-white animate-pulse" style={{ height: "1em" }}></span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
          font-bold text-transparent bg-clip-text 
          bg-linear-to-r from-brand-cyan via-brand-teal to-brand-purple leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hello I'm <br />
          <span className="text-white font-bold text-5xl sm:text-6xl lg:text-8xl">
            Muhammad Anas
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Turning complex ideas into seamless, high-impact web experiences—building modern, scalable, and lightning-fast applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#projects" className="btn-primary text-lg">
            View My Work
          </a>

          {/* VIEW RESUME BUTTON (Opens in New Tab) */}
          <a 
            href={resumePDF} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 hover:border-brand-cyan transition-all text-center"
          >
             View Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              href={href}
              key={label}
              target={label === "Email" ? "_self" : "_blank"}
              rel={label === "Email" ? "" : "noopener noreferrer"}
              aria-label={label}
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 hover:text-brand-cyan transition-colors"
            >
              <Icon />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Home;