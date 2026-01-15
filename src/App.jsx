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
      
      {/* Background stays full screen */}
      <ParticlesBackground />
      <CustomCursor />

      */}
      <div className="max-w-[1280px] mx-auto px-0 relative z-10 pt-20">
        
        <Navbar />
        
        {/* We wrap content in a div with padding so it aligns with Navbar inner content */}
        <div className="px-4 sm:px-6 lg:px-8">
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
      
    </div>
  )
}

export default App