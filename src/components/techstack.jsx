import React, { useEffect, useMemo, useRef, useState } from 'react';

function TechStack() {
  const [activeTab, setActiveTab] = useState('all');
  const [cubeFace, setCubeFace] = useState(0);
  const cubeRef = useRef(null);
  const cubeContainerRef = useRef(null);

  const technologies = useMemo(
    () => [
      { name: 'React', category: 'frontend', iconClass: 'react-icon', level: 5 },
      { name: 'Next.js', category: 'frontend', iconClass: 'next-icon', level: 4 },
      { name: 'Tailwind CSS', category: 'frontend', iconClass: 'tailwind-icon', level: 5 },
      { name: 'Three.js', category: 'frontend', iconClass: 'threejs-icon', level: 3 },
      { name: 'Node.js', category: 'backend', iconClass: 'node-icon', level: 4 },
      { name: 'Express.js', category: 'backend', iconClass: 'express-icon', level: 4 },
      { name: 'MongoDB', category: 'backend', iconClass: 'mongodb-icon', level: 4 },
      { name: 'PostgreSQL', category: 'backend', iconClass: 'postgresql-icon', level: 3 },
      { name: 'Ethereum', category: 'blockchain', iconClass: 'ethereum-icon', level: 4 },
      { name: 'Solidity', category: 'blockchain', iconClass: 'solidity-icon', level: 5 },
      { name: 'Web3.js', category: 'blockchain', iconClass: 'web3-icon', level: 4 },
      { name: 'Hardhat', category: 'blockchain', iconClass: 'hardhat-icon', level: 3 },
      { name: 'C++', category: 'languages', iconClass: 'cpp-icon', level: 5 },
      { name: 'JavaScript', category: 'languages', iconClass: 'js-icon', level: 5 },
      { name: 'Python', category: 'languages', iconClass: 'python-icon', level: 4 },
      { name: 'TypeScript', category: 'languages', iconClass: 'typescript-icon', level: 4 },
    ],
    []
  );

  const cubeTransforms = useMemo(
    () => [
      'rotateX(0deg) rotateY(0deg)',
      'rotateX(0deg) rotateY(90deg)',
      'rotateX(0deg) rotateY(180deg)',
      'rotateX(0deg) rotateY(-90deg)',
      'rotateX(-90deg) rotateY(0deg)',
      'rotateX(90deg) rotateY(0deg)',
    ],
    []
  );

  useEffect(() => {
    const particlesContainer = document.getElementById('tech-particles');
    const codeSnippets = ['<>', '{...}', '()', '=>', '[]', '&&', '||', '===', '++'];

    if (particlesContainer && particlesContainer.children.length === 0) {
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 30 + 10;
        const codeIndex = Math.floor(Math.random() * codeSnippets.length);

        particle.className = 'absolute text-[#64FFDA]/20 font-mono';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.fontSize = `${size}px`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        particle.textContent = codeSnippets[codeIndex];
        particle.style.animation = `float-code ${Math.random() * 20 + 10}s linear infinite`;
        particle.style.animationDelay = `${Math.random() * 5}s`;

        particlesContainer.appendChild(particle);
      }
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float-code {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(${Math.random() * 100}px, ${Math.random() * -50}px) rotate(${Math.random() * 360}deg); }
        50% { transform: translate(${Math.random() * -100}px, ${Math.random() * 50}px) rotate(${Math.random() * 360}deg); }
        75% { transform: translate(${Math.random() * 50}px, ${Math.random() * -100}px) rotate(${Math.random() * 360}deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    const techGrid = document.getElementById('tech-grid');
    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (techGrid) {
        techGrid.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    const techCards = Array.from(document.querySelectorAll('.tech-card'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.getAttribute('data-delay') || '0');
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    techCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.setAttribute('data-delay', String(index * 50));
      observer.observe(card);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const techCards = Array.from(document.querySelectorAll('.tech-card'));

    techCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (activeTab === 'all' || category === activeTab) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }, [activeTab]);

  useEffect(() => {
    const cube = cubeRef.current;
    const cubeContainer = cubeContainerRef.current;

    if (!cube || !cubeContainer) {
      return undefined;
    }

    cube.style.transformStyle = 'preserve-3d';
    cube.style.transition = 'transform 1.5s ease-in-out';

    let intervalId = window.setInterval(() => {
      setCubeFace((prev) => (prev + 1) % 6);
    }, 4000);

    const onMouseEnter = () => {
      window.clearInterval(intervalId);
    };

    const onMouseMove = (e) => {
      window.clearInterval(intervalId);
      const rect = cubeContainer.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 180;
      const rotateX = (y - 0.5) * -180;
      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const onMouseLeave = () => {
      intervalId = window.setInterval(() => {
        setCubeFace((prev) => (prev + 1) % 6);
      }, 4000);
    };

    cubeContainer.addEventListener('mouseenter', onMouseEnter);
    cubeContainer.addEventListener('mousemove', onMouseMove);
    cubeContainer.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.clearInterval(intervalId);
      cubeContainer.removeEventListener('mouseenter', onMouseEnter);
      cubeContainer.removeEventListener('mousemove', onMouseMove);
      cubeContainer.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cube = cubeRef.current;
    if (cube) {
      cube.style.transform = cubeTransforms[cubeFace];
    }
  }, [cubeFace, cubeTransforms]);

  const getIconContent = (iconClass) => {
    const iconMap = {
      'react-icon': '⚛️',
      'next-icon': 'N',
      'tailwind-icon': '🌊',
      'threejs-icon': '3D',
      'node-icon': 'N📦',
      'express-icon': 'E❯',
      'mongodb-icon': '🍃',
      'postgresql-icon': '🐘',
      'ethereum-icon': 'Ξ',
      'solidity-icon': 'S',
      'web3-icon': 'W3',
      'hardhat-icon': '👷',
      'cpp-icon': 'C++',
      'js-icon': 'JS',
      'python-icon': '🐍',
      'typescript-icon': 'TS',
      'git-icon': 'G',
      'docker-icon': '🐳',
      'aws-icon': '☁️',
      'cicd-icon': '🔄',
    };

    return iconMap[iconClass] || '?';
  };

  const TechIcon = ({ iconClass }) => (
    <div className={`tech-icon ${iconClass} text-[#64FFDA] text-2xl font-bold`}>{getIconContent(iconClass)}</div>
  );

  return (
    <section id="tech-stack" className="py-24 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="tech-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">Tech Stack</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
          <p className="text-gray-300 mt-4 text-center max-w-2xl">Cutting-edge technologies I use to build exceptional digital experiences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/5 perspective-3d">
            <div className="relative h-full flex items-center justify-center">
              <div ref={cubeContainerRef} className="tech-cube-container w-full max-w-md mx-auto" style={{ width: '300px', height: '300px', perspective: '1000px' }}>
                <div ref={cubeRef} className="tech-cube relative w-full h-full" id="tech-cube">
                  <div className="tech-cube-face front absolute w-full h-full [backface-visibility:hidden]" style={{ transform: 'translateZ(150px)' }}>
                    <img
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8dGVjaC1zdGFjayUyMHByb2Zlc3Npb25hbHxlbnwwfDB8fHwxNzQzMjI2NjE2fDA&ixlib=rb-4.0.3&q=80&w=1080?q=80"
                      alt="Modern development environment with code on screen"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://placehold.co/400x400';
                      }}
                      width="4846"
                      height="3431"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-neutral-900/70 rounded-xl flex items-center justify-center">
                      <div className="text-center p-6">
                        <h3 className="text-2xl font-bold text-[#64FFDA]">Frontend</h3>
                        <p className="text-white mt-2">Building beautiful, responsive interfaces</p>
                      </div>
                    </div>
                  </div>

                  <div className="tech-cube-face back absolute w-full h-full [backface-visibility:hidden]" style={{ transform: 'rotateY(180deg) translateZ(150px)' }}>
                    <div className="bg-neutral-800 rounded-xl h-full flex flex-col justify-center items-center p-8">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Backend</h3>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center"><TechIcon iconClass="node-icon" /><span className="text-white text-sm mt-2">Node.js</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="express-icon" /><span className="text-white text-sm mt-2">Express</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="mongodb-icon" /><span className="text-white text-sm mt-2">MongoDB</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="postgresql-icon" /><span className="text-white text-sm mt-2">PostgreSQL</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="tech-cube-face right absolute w-full h-full [backface-visibility:hidden]" style={{ transform: 'rotateY(90deg) translateZ(150px)' }}>
                    <div className="bg-neutral-800 rounded-xl h-full flex flex-col justify-center p-8">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Programming</h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex flex-col items-center"><TechIcon iconClass="cpp-icon" /><span className="text-white text-sm mt-2">C++</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="js-icon" /><span className="text-white text-sm mt-2">JavaScript</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="python-icon" /><span className="text-white text-sm mt-2">Python</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="typescript-icon" /><span className="text-white text-sm mt-2">TypeScript</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="tech-cube-face left absolute w-full h-full [backface-visibility:hidden]" style={{ transform: 'rotateY(-90deg) translateZ(150px)' }}>
                    <div className="bg-neutral-800 rounded-xl h-full flex flex-col justify-center p-8">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Blockchain</h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex flex-col items-center"><TechIcon iconClass="ethereum-icon" /><span className="text-white text-sm mt-2">Ethereum</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="solidity-icon" /><span className="text-white text-sm mt-2">Solidity</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="web3-icon" /><span className="text-white text-sm mt-2">Web3.js</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="hardhat-icon" /><span className="text-white text-sm mt-2">Hardhat</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="tech-cube-face top absolute w-full h-full [backface-visibility:hidden]" style={{ transform: 'rotateX(90deg) translateZ(150px)' }}>
                    <div className="bg-neutral-800 rounded-xl h-full flex flex-col justify-center items-center p-8">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Frontend</h3>
                      <div className="grid grid-cols-2 gap-6 w-full">
                        <div className="flex flex-col items-center"><TechIcon iconClass="react-icon" /><span className="text-white text-sm mt-2">React</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="next-icon" /><span className="text-white text-sm mt-2">Next.js</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="tailwind-icon" /><span className="text-white text-sm mt-2">Tailwind</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="threejs-icon" /><span className="text-white text-sm mt-2">Three.js</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="tech-cube-face bottom absolute w-full h-full [backface-visibility:hidden]" style={{ transform: 'rotateX(-90deg) translateZ(150px)' }}>
                    <div className="bg-neutral-800 rounded-xl h-full flex flex-col justify-center items-center p-8">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Tools &amp; DevOps</h3>
                      <div className="grid grid-cols-2 gap-6 w-full">
                        <div className="flex flex-col items-center"><TechIcon iconClass="git-icon" /><span className="text-white text-sm mt-2">Git</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="docker-icon" /><span className="text-white text-sm mt-2">Docker</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="aws-icon" /><span className="text-white text-sm mt-2">AWS</span></div>
                        <div className="flex flex-col items-center"><TechIcon iconClass="cicd-icon" /><span className="text-white text-sm mt-2">CI/CD</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                <p>Photo by Ales Nesetril</p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 perspective-3d">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8" id="tech-tabs">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-md transition-all duration-300 tech-tab ${
                  activeTab === 'all' ? 'bg-neutral-700 text-[#64FFDA] active' : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                All Technologies
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('frontend')}
                className={`px-4 py-2 rounded-md transition-all duration-300 tech-tab ${
                  activeTab === 'frontend' ? 'bg-neutral-700 text-[#64FFDA] active' : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                Frontend
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('backend')}
                className={`px-4 py-2 rounded-md transition-all duration-300 tech-tab ${
                  activeTab === 'backend' ? 'bg-neutral-700 text-[#64FFDA] active' : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                Backend
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('blockchain')}
                className={`px-4 py-2 rounded-md transition-all duration-300 tech-tab ${
                  activeTab === 'blockchain' ? 'bg-neutral-700 text-[#64FFDA] active' : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                Blockchain
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('languages')}
                className={`px-4 py-2 rounded-md transition-all duration-300 tech-tab ${
                  activeTab === 'languages' ? 'bg-neutral-700 text-[#64FFDA] active' : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                Languages
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6" id="tech-grid">
              {technologies.map((tech) => (
                <div key={tech.name} className="tech-card" data-category={tech.category}>
                  <div className="bg-neutral-800 rounded-xl p-6 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-all duration-500 transform hover:-translate-y-2 hover:bg-neutral-700 h-full flex flex-col items-center justify-center group">
                    <div className="w-16 h-16 bg-neutral-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-neutral-600 transition-colors duration-300">
                      <TechIcon iconClass={tech.iconClass} />
                    </div>
                    <h3 className="text-white font-medium text-lg text-center">{tech.name}</h3>
                    <div className="mt-2 flex">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={`${tech.name}-${dot}`}
                          className={`w-2 h-2 rounded-full mx-0.5 ${dot <= tech.level ? 'bg-[#64FFDA]' : 'bg-neutral-600'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-neutral-800 rounded-xl p-8 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">My Technical Approach</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-700 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#64FFDA]/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Security First</h4>
                    <p className="text-gray-400 text-sm">Building applications with robust security practices, especially for blockchain projects</p>
                  </div>
                </div>

                <div className="p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-700 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#64FFDA]/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Performance Optimized</h4>
                    <p className="text-gray-400 text-sm">Creating efficient, scalable solutions with best practices in algorithm development</p>
                  </div>
                </div>

                <div className="p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-700 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#64FFDA]/10 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Future Ready</h4>
                    <p className="text-gray-400 text-sm">Embracing cutting-edge technologies to build solutions that stay ahead of the curve</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a href="#contact" className="px-8 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium inline-flex items-center group">
                  Let&apos;s Collaborate
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TechStack;
