import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
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
    <Background />
    <CustomCursor />
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
  </div>
);

export default App;
