const App = () => {
  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      
      {/* 1. Background stays full screen (outside the container) */}
      <ParticlesBackground />
      <CustomCursor />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
        
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