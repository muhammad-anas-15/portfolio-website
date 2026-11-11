import Background from "./components/Background";
import ChromaHalo from "./components/ChromaHalo";
import SmoothScroll from "./components/SmoothScroll";
import MotionFX from "./components/MotionFX";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AskAI from "./components/AskAI";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";

const App = () => (
  <div className="relative min-h-screen overflow-x-clip bg-ink">
    <SmoothScroll />
    <Background />
    <ChromaHalo />
    <Navbar />
    <main className="relative z-10">
      <Hero />
      <About />
      <Expertise />
      <TechStack />
      <Experience />
      <Projects />
      <Education />
      <Contact />
    </main>
    <div className="relative z-10">
      <Footer />
    </div>
    <AskAI />
    {/* last, so it sees every section's DOM */}
    <MotionFX />
  </div>
);

export default App;
