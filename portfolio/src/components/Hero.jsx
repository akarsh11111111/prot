import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const perspectiveElements = document.querySelectorAll('.perspective-element');

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      perspectiveElements.forEach((element) => {
        const depth = element.getAttribute('data-depth') || 0.1;
        const moveX = x * 100 * depth;
        const moveY = y * 100 * depth;
        element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) perspective(1000px)`;
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    const rotateElements = document.querySelectorAll('.rotate-y-element');

    rotateElements.forEach((element) => {
      const onElementMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = x / rect.width - 0.5;
        const yPercent = y / rect.height - 0.5;

        element.style.transform = `perspective(1000px) rotateY(${xPercent * 10}deg) rotateX(${yPercent * -10}deg) scale3d(1.05, 1.05, 1.05)`;
      };

      const onElementMouseLeave = () => {
        element.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
      };

      element.addEventListener('mousemove', onElementMouseMove);
      element.addEventListener('mouseleave', onElementMouseLeave);
    });

    const particlesContainer = document.getElementById('particles-js');

    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 1;

      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `rgba(100, 255, 218, ${Math.random() * 0.5})`;
      particle.style.borderRadius = '50%';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.transform = `translateZ(${Math.random() * 100}px)`;
      particle.style.animation = `particleFloat ${Math.random() * 10 + 10}s linear infinite`;

      particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes particleFloat {
        0%   { transform: translate3d(0, 0, 0); }
        25%  { transform: translate3d(50px, 60px, 30px); }
        50%  { transform: translate3d(-60px, 80px, -40px); }
        75%  { transform: translate3d(-70px, -50px, 40px); }
        100% { transform: translate3d(0, 0, 0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen bg-neutral-900 overflow-hidden">
      {/* 3D Particles Background */}
      <div id="particles-js" className="absolute inset-0 z-0"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div className="w-full md:w-1/2 text-white pt-24 md:pt-0">
          <div className="space-y-4 transform translate-z-0 perspective-element" data-depth="0.2">
            <p className="text-[#64FFDA] tracking-wider">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Akarsh <span className="text-[#64FFDA]">Vidyarthi</span>
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300">
              I build exceptional digital experiences.
            </h2>
            <p className="text-gray-400 max-w-lg">
              I'm a software engineer specializing in building innovative solutions using DSA,
              C++, Web Development, Web3, and Blockchain technologies.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-[#64FFDA] text-neutral-900 rounded hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 font-medium"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-[#64FFDA] text-[#64FFDA] rounded hover:bg-[#64FFDA]/10 transition-all duration-300 transform hover:-translate-y-1 font-medium"
              >
                Contact Me
              </a>
            </div>

            <div className="pt-8 flex items-center space-x-4">
              <a href="https://github.com/akarsh11111111" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0 perspective-element" data-depth="0.5">
          <div className="relative w-full max-w-md mx-auto transform transition-all duration-700 rotate-y-element">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r from-neutral-800 to-neutral-900 p-2">
              <img
                src="/1.jpg"
                alt="Akarsh Vidyarthi - Software Engineer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/500x600';
                }}
                className="w-full h-[600px] object-cover rounded transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neutral-900/40 flex items-end">
                <div className="p-4 w-full backdrop-blur-sm bg-neutral-900/70">
                  <h3 className="text-[#64FFDA] font-bold">Akarsh Vidyarthi</h3>
                  <p className="text-white text-sm">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA]/20 to-[#64FFDA]/10 rounded-lg blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <p className="text-[#64FFDA] mb-2 text-sm">Scroll Down</p>
        <svg className="w-6 h-6 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;