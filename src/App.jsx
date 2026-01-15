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
    <div className="relative bg-black min-h-screen">
      
      {/* GLOBAL BACKGROUND */}
      <ParticlesBackground />

      {/* CUSTOM CURSOR */}
      <CustomCursor />

      {/* PAGE CONTENT */}
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
  )
}

export default App
