import React, { useEffect, useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      id="header"
      className={`fixed w-full z-50 transition-all duration-300 bg-neutral-900/80 backdrop-blur-lg ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4'
      }`}
    >
      <nav className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl z-10">
            <span className="text-[#64FFDA]">Akarsh</span> <span className="text-white">Vidyarthi</span>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-gray-300 hover:text-[#64FFDA] transition-colors duration-300 font-medium relative group">
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#64FFDA] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <div>
              <a href="#contact" className="px-4 py-2 border border-[#64FFDA] text-[#64FFDA] rounded hover:bg-[#64FFDA]/10 transition-all duration-300">
                Get In Touch
              </a>
            </div>
          </div>

          <button
            aria-label="Toggle menu"
            type="button"
            className="lg:hidden z-10 text-gray-200 hover:text-white focus:outline-none"
            id="menu-toggle"
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isMenuOpen ? 'hidden' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" id="menu-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${isMenuOpen ? '' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" id="close-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            id="mobile-menu"
            className={`fixed inset-0 lg:hidden bg-neutral-900/95 backdrop-blur-lg flex flex-col justify-center items-center transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <ul className="flex flex-col space-y-8 items-center">
              {navItems.map((item) => (
                <li key={`mobile-${item.id}`}>
                  <a href={`#${item.id}`} className="text-xl text-gray-300 hover:text-[#64FFDA] transition-colors duration-300 mobile-link" onClick={closeMenu}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-6">
                <a href="#contact" className="px-6 py-3 border border-[#64FFDA] text-[#64FFDA] rounded hover:bg-[#64FFDA]/10 transition-all duration-300" onClick={closeMenu}>
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
