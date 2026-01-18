import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  /* Hide on scroll down, show on scroll up (only when menu is closed) */
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 20);

      if (!isOpen && currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Tech Stack", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
  ];

  return (
    <>
      {/* NAVBAR BAR (FULL WIDTH, FIXED) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50
        transition-transform duration-300
        ${showNavbar || isOpen ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled && !isOpen
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* CENTERED CONTENT */}
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* LOGO */}
          <Link to="home" smooth duration={500} offset={-80}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-white hover:text-gray-200 transition-colors whitespace-nowrap cursor-pointer">
              Muhammad <span className="font-light text-gray-400">Anas</span>
            </h3>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-8 xl:gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  spy
                  smooth
                  offset={-100}
                  duration={500}
                  activeClass="text-brand-cyan font-bold"
                  className="relative text-sm font-medium text-gray-300 hover:text-white transition cursor-pointer uppercase tracking-wide"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-brand-cyan transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* DESKTOP CTA */}
          <div className="hidden lg:block">
            <Link
              to="contact"
              smooth
              duration={500}
              offset={-50}
              className="btn-primary cursor-pointer whitespace-nowrap"
            >
              Connect With Me
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-3xl text-white hover:text-brand-purple transition z-50"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl
        flex flex-col items-center justify-center
        px-6 pt-28 pb-12 gap-8
        transition-transform duration-500 lg:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            smooth
            duration={500}
            offset={-80}
            onClick={() => setIsOpen(false)}
            className="text-3xl font-semibold text-gray-400 hover:text-brand-cyan transition cursor-pointer"
          >
            {link.name}
          </Link>
        ))}

        <Link
          to="contact"
          smooth
          duration={500}
          offset={-50}
          onClick={() => setIsOpen(false)}
          className="btn-primary mt-6 w-full max-w-xs text-center"
        >
          Connect With Me
        </Link>
      </div>
    </>
  );
};

export default Navbar;
