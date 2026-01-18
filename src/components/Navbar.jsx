import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  // 1. ADDED: Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // 2. MODIFIED: Only hide navbar if the MENU IS CLOSED (!isOpen)
      // This prevents the close button from vanishing if the user scrolls while the menu is open
      if (!isOpen && currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]); // Added isOpen dependency

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Tech Stack", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 mx-auto w-full max-w-[1280px] z-50
      transition-all duration-300 transform
      ${
        /* FIX 1: Always keep navbar visible if menu is OPEN (|| isOpen) */
        showNavbar || isOpen ? "translate-y-0" : "-translate-y-full"
      }
      ${
        /* FIX 2: Keep background transparent if menu is OPEN so items aren't hidden behind a black bar */
        isScrolled && !isOpen
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-1 cursor-pointer z-50 relative">
          <Link to="home" smooth={true} duration={500} offset={-80}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white font-heading hover:text-gray-200 transition-colors whitespace-nowrap">
              Muhammad <span className="font-light text-gray-400">Anas</span>
            </h3>
          </Link>
        </div>

        {/* DESKTOP MENU (Unchanged) */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                activeClass="text-brand-cyan font-bold"
                className="relative text-base font-medium text-gray-300 hover:text-white transition-colors cursor-pointer group tracking-wide uppercase whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CONNECT BUTTON (Unchanged) */}
        <div className="hidden lg:block">
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-50}
            className="btn-primary cursor-pointer text-sm lg:text-base whitespace-nowrap"
          >
            Connect With Me
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <div
          className="lg:hidden text-3xl text-white cursor-pointer hover:text-brand-purple transition-colors z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* MOBILE MENU (FIXED SECTION) */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-start 
        pt-28 pb-10 gap-6 h-screen overflow-y-auto transition-transform duration-500 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-semibold text-gray-400 hover:text-brand-cyan transition-all cursor-pointer"
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="contact"
          smooth={true}
          duration={500}
          offset={-50}
          onClick={() => setIsOpen(false)}
          className="btn-primary mt-4"
        >
          Connect With Me
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;