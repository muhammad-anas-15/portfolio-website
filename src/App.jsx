import React from 'react'
import Navbar from './components/Navbar'
import Home from './sections/Home/Home'
import Skills from './sections/Skills/Skills'
import Contact from './sections/Contact/Contact'
import ParticlesBackground from './components/ParticlesBackground'
import About from './sections/About/About'
import CustomCursor from './components/CustomCursor'
import TechStack from './sections/TechStack/TeckStack'
import ExperienceSection from './sections/Experience/Experience'
import ProjectSection from './sections/Project/Projects'
import Education from './sections/Education/Education'

const App = () => {
  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      
      {/* 1. Background stays full screen (outside the container) */}
      <ParticlesBackground />
      <CustomCursor />

      {/* 2. Main Container:
           - max-w-7xl: Stops the site from getting too wide (simulates your 80% zoom view)
           - mx-auto: Centers the site
           - pt-28: Pushes content down so Navbar doesn't cover it
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
        
        {/* Navbar is here, but we might need to fix its width inside its own file too */}
        <Navbar />
        
        <Home />
        <About />
        <TechStack />
        <ExperienceSection />
        <ProjectSection />
        <Education/>
        <Skills />
        <Contact />
      </div>
      
    </div>
  )
}

export default App