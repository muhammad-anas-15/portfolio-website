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
      
      {/* GLOBAL BACKGROUND - Keeps covering full screen */}
      <ParticlesBackground />

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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