import React, { useEffect, useState } from 'react';

function Skills() {
  const [activeTab, setActiveTab] = useState('programming');

  useEffect(() => {
    // Tab switching functionality
    const handleTabClick = (target) => {
      setActiveTab(target);
    };

    // 3D Cube Rotation
    const cube = document.getElementById('skills-cube');
    let rotateX = 0;
    let rotateY = 0;
    let currentFace = 0;
    const faces = ['front', 'right', 'back', 'left', 'top', 'bottom'];

    // Auto rotation for the cube
    function rotateCube() {
      currentFace = (currentFace + 1) % faces.length;

      switch (currentFace) {
        case 0: // front
          rotateX = 0;
          rotateY = 0;
          break;
        case 1: // right
          rotateX = 0;
          rotateY = 90;
          break;
        case 2: // back
          rotateX = 0;
          rotateY = 180;
          break;
        case 3: // left
          rotateX = 0;
          rotateY = -90;
          break;
        case 4: // top
          rotateX = -90;
          rotateY = 0;
          break;
        case 5: // bottom
          rotateX = 90;
          rotateY = 0;
          break;
        default:
          break;
      }

      if (cube) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    }

    // Initial cube setup
    if (cube) {
      cube.style.transformStyle = 'preserve-3d';
      cube.style.transition = 'transform 1.5s ease-in-out';

      // Setup cube faces
      const faces3d = document.querySelectorAll('.cube-face');
      faces3d.forEach((face, index) => {
        face.style.position = 'absolute';
        face.style.width = '100%';
        face.style.height = '100%';
        face.style.backfaceVisibility = 'hidden';
        face.style.borderRadius = '12px';
        face.style.overflow = 'hidden';

        switch (index) {
          case 0: // front
            face.style.transform = 'translateZ(150px)';
            break;
          case 1: // back
            face.style.transform = 'rotateY(180deg) translateZ(150px)';
            break;
          case 2: // right
            face.style.transform = 'rotateY(90deg) translateZ(150px)';
            break;
          case 3: // left
            face.style.transform = 'rotateY(-90deg) translateZ(150px)';
            break;
          case 4: // top
            face.style.transform = 'rotateX(90deg) translateZ(150px)';
            break;
          case 5: // bottom
            face.style.transform = 'rotateX(-90deg) translateZ(150px)';
            break;
          default:
            break;
        }
      });
    }

    // Set cube container style
    const cubeContainer = document.querySelector('.cube-container');
    if (cubeContainer) {
      cubeContainer.style.width = '300px';
      cubeContainer.style.height = '300px';
      cubeContainer.style.perspective = '1000px';
      cubeContainer.style.margin = '0 auto';
    }

    // Animate cube rotation automatically
    let cubeInterval = setInterval(rotateCube, 4000);

    // Pause rotation on hover
    if (cubeContainer) {
      cubeContainer.addEventListener('mouseenter', () => {
        clearInterval(cubeInterval);
      });

      // Resume rotation on mouse leave
      cubeContainer.addEventListener('mouseleave', () => {
        cubeInterval = setInterval(rotateCube, 4000);
      });

      // Interactive cube rotation with mouse
      cubeContainer.addEventListener('mousemove', (e) => {
        const containerRect = cubeContainer.getBoundingClientRect();
        const x = (e.clientX - containerRect.left) / containerRect.width;
        const y = (e.clientY - containerRect.top) / containerRect.height;

        const newRotateY = (x - 0.5) * 60;
        const newRotateX = (y - 0.5) * -60;

        if (cube) {
          cube.style.transform = `rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`;
        }
      });
    }

    // Animate skill progress bars
    const progressBars = document.querySelectorAll('.skill-progress');

    function animateProgressBars() {
      progressBars.forEach((bar) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';

        setTimeout(() => {
          bar.style.transition = 'width 1.5s ease-in-out';
          bar.style.width = targetWidth;
        }, 300);
      });
    }

    // Create floating code particles
    const particlesContainer = document.getElementById('floating-code-particles');
    const codeSnippets = ['{...}', '()', '=>', '[]', '&&', '||', '<>', '===', '++'];

    if (particlesContainer && particlesContainer.children.length === 0) {
      for (let i = 0; i < 30; i++) {
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

      // Add animation keyframes
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
    }

    // Animate skill cards on scroll
    const skillCard = document.querySelector('.skill-card-container');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillCard) {
      observer.observe(skillCard);
    }

    return () => {
      clearInterval(cubeInterval);
      if (skillCard) {
        observer.unobserve(skillCard);
      }
    };
  }, []);

  const skillsData = {
    programming: [
      { name: 'C++', percentage: 95, description: 'Data Structures, Algorithms, OOP, STL' },
      { name: 'Python', percentage: 85, description: 'Data Analysis, Automation, Machine Learning' },
      { name: 'JavaScript', percentage: 90, description: 'ES6+, TypeScript, Functional Programming' },
      { name: 'Java', percentage: 80, description: 'OOP, Design Patterns, Multithreading' },
      { name: 'Solidity', percentage: 85, description: 'Smart Contracts, DApps, ERC Standards' },
    ],
    frontend: [
      { name: 'React.js', percentage: 95, description: 'Hooks, Context API, Redux, Next.js' },
      { name: 'Vue.js', percentage: 80, description: 'Vue 3, Composition API, Vuex, Nuxt.js' },
      { name: 'CSS Frameworks', percentage: 90, description: 'Tailwind CSS, Bootstrap, SASS/SCSS' },
      { name: 'Web Animation', percentage: 85, description: 'GSAP, Three.js, Framer Motion, CSS Animations' },
      { name: 'Responsive Design', percentage: 95, description: 'Mobile-First, Flexbox, Grid, Media Queries' },
    ],
    backend: [
      { name: 'Node.js', percentage: 90, description: 'Express.js, REST APIs, Microservices' },
      { name: 'Databases', percentage: 85, description: 'MongoDB, MySQL, PostgreSQL, Redis' },
      { name: 'API Design', percentage: 90, description: 'REST, GraphQL, Swagger, OAuth' },
      { name: 'Cloud Services', percentage: 80, description: 'AWS, Google Cloud, Azure, Serverless' },
      { name: 'DevOps', percentage: 75, description: 'Docker, CI/CD, Kubernetes, GitHub Actions' },
    ],
    blockchain: [
      { name: 'Smart Contracts', percentage: 90, description: 'Solidity, Security, Optimization, Auditing' },
      { name: 'Ethereum', percentage: 85, description: 'ERC Standards, Gas Optimization, L2 Solutions' },
      { name: 'Web3 Libraries', percentage: 90, description: 'Web3.js, Ethers.js, Hardhat, Truffle' },
      { name: 'DeFi Protocols', percentage: 80, description: 'DEXs, Lending, Yield Farming, AMMs' },
      { name: 'NFTs & Digital Assets', percentage: 85, description: 'ERC-721, ERC-1155, Marketplaces, Metadata' },
    ],
    tools: [
      { name: 'Version Control', percentage: 95, description: 'Git, GitHub, GitLab, Branching Strategies' },
      { name: 'Development Environments', percentage: 90, description: 'VS Code, IntelliJ, Remix, Visual Studio' },
      { name: 'Testing Frameworks', percentage: 85, description: 'Jest, Mocha, Chai, Cypress, Selenium' },
      { name: 'Project Management', percentage: 80, description: 'Jira, Trello, Agile, Scrum, Kanban' },
      { name: 'Design Tools', percentage: 75, description: 'Figma, Adobe XD, Photoshop, Illustrator' },
    ],
  };

  const currentSkills = skillsData[activeTab];

  return (
    <section id="skills" className="relative py-24 bg-neutral-800 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(100,255,218,0.04)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="floating-code-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">Skills & Expertise</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
          <p className="text-gray-300 mt-4 text-center max-w-2xl">Leveraging cutting-edge technologies to build exceptional applications</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Skill Categories */}
          <div className="lg:w-1/2 perspective-3d">
            {/* Skill Category Tabs */}
            <div className="mb-8 flex flex-wrap gap-3 justify-center lg:justify-start" id="skills-tabs">
              {['programming', 'frontend', 'backend', 'blockchain', 'tools'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md transition-all duration-300 skill-tab ${
                    activeTab === tab
                      ? 'bg-neutral-900 text-[#64FFDA]'
                      : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
                  }`}
                  data-tab={tab}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Skill Lists */}
            <div className="bg-neutral-900 rounded-xl p-6 shadow-xl transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] skill-card-container">
              <div className="skill-content">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-white">
                    {activeTab === 'programming' && 'Programming Languages'}
                    {activeTab === 'frontend' && 'Frontend Development'}
                    {activeTab === 'backend' && 'Backend Development'}
                    {activeTab === 'blockchain' && 'Blockchain Development'}
                    {activeTab === 'tools' && 'Development Tools'}
                  </h3>
                  <div className="flex space-x-2">
                    <span className={`w-3 h-3 rounded-full ${activeTab === Object.keys(skillsData)[0] ? 'bg-[#64FFDA]' : 'bg-neutral-700'}`}></span>
                    <span className={`w-3 h-3 rounded-full ${activeTab === Object.keys(skillsData)[1] ? 'bg-[#64FFDA]' : 'bg-neutral-700'}`}></span>
                    <span className={`w-3 h-3 rounded-full ${activeTab === Object.keys(skillsData)[2] ? 'bg-[#64FFDA]' : 'bg-neutral-700'}`}></span>
                  </div>
                </div>

                <div className="space-y-6">
                  {currentSkills.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-[#64FFDA]">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-700 rounded-full h-2.5">
                        <div
                          className="bg-[#64FFDA] h-2.5 rounded-full skill-progress"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-gray-400 text-sm">{skill.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 3D Visual Representation */}
          <div className="lg:w-1/2 perspective-3d">
            <div className="relative h-full flex items-center justify-center">
              {/* 3D Skills Cube */}
              <div className="cube-container">
                <div className="cube" id="skills-cube">
                  {/* Front Face */}
                  <div className="cube-face front">
                    <div className="p-8 flex items-center justify-center h-full">
                      <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8c2tpbGxzJTIwcHJvZmVzc2lvbmFsfGVufDB8MHx8fDE3NDMxNjg3OTZ8MA&ixlib=rb-4.0.3&q=80&w=1080?q=80"
                        alt="Programming and development skills"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/400x400';
                        }}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-neutral-900/50 rounded-xl flex items-center justify-center">
                        <div className="text-center p-6">
                          <h3 className="text-2xl font-bold text-[#64FFDA]">Programming</h3>
                          <p className="text-white mt-2">C++, Python, JavaScript, Solidity</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="cube-face back">
                    <div className="p-8 bg-neutral-800 rounded-xl h-full flex flex-col justify-center items-center">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Blockchain</h3>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center mb-2">
                            <span className="text-[#64FFDA] text-2xl">Ξ</span>
                          </div>
                          <span className="text-white text-sm">Ethereum</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center mb-2">
                            <span className="text-[#64FFDA] text-2xl">⚡</span>
                          </div>
                          <span className="text-white text-sm">Smart Contracts</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center mb-2">
                            <span className="text-[#64FFDA] text-2xl">🔄</span>
                          </div>
                          <span className="text-white text-sm">DeFi</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-neutral-700 flex items-center justify-center mb-2">
                            <span className="text-[#64FFDA] text-2xl">🖼️</span>
                          </div>
                          <span className="text-white text-sm">NFTs</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Face */}
                  <div className="cube-face right">
                    <div className="p-8 bg-neutral-800 rounded-xl h-full flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Frontend</h3>
                      <ul className="space-y-4">
                        {['React.js & Next.js', 'Tailwind CSS', 'Redux & Context API', 'Three.js & GSAP'].map((item, i) => (
                          <li key={i} className="flex items-center space-x-3">
                            <svg className="w-6 h-6 text-[#64FFDA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-white">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Left Face */}
                  <div className="cube-face left">
                    <div className="p-8 bg-neutral-800 rounded-xl h-full flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-[#64FFDA] mb-6">Backend</h3>
                      <ul className="space-y-4">
                        {['Node.js & Express', 'RESTful APIs', 'MongoDB & SQL', 'AWS & Cloud Services'].map((item, i) => (
                          <li key={i} className="flex items-center space-x-3">
                            <svg className="w-6 h-6 text-[#64FFDA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-white">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Top Face */}
                  <div className="cube-face top">
                    <div className="p-8 bg-neutral-800 rounded-xl h-full flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1735200896762-740a563715e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8c2tpbGxzJTIwcHJvZmVzc2lvbmFsfGVufDB8MHx8fDE3NDMxNjg3OTZ8MA&ixlib=rb-4.0.3&q=80&w=1080?q=80"
                        alt="Development tools and environments"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/400x400';
                        }}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-neutral-900/50 rounded-xl flex items-center justify-center">
                        <div className="text-center p-6">
                          <h3 className="text-2xl font-bold text-[#64FFDA]">Tools</h3>
                          <p className="text-white mt-2">Git, VS Code, Testing, CI/CD</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Face */}
                  <div className="cube-face bottom">
                    <div className="p-8 bg-neutral-800 rounded-xl h-full flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-[#64FFDA] mb-4">Algorithm Expertise</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {['Search', 'Sort', 'Graph', 'Dynamic'].map((algo, i) => (
                            <div key={i} className="p-4 bg-neutral-700/50 rounded-lg">
                              <span className="text-white">{algo}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical skills graphic */}
              <div className="absolute bottom-4 right-4 text-gray-500 text-xs">
                <p>happy to see you here 💙 from akarsh </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-20 bg-neutral-900 rounded-xl p-8 shadow-xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Technical Approach</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', title: 'Performance Optimized', desc: 'Building solutions with efficiency and speed as core principles' },
              { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Security Focused', desc: 'Implementing robust security practices in all development work' },
              { icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4', title: 'Scalable Architecture', desc: 'Designing systems that grow and adapt to changing requirements' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#64FFDA]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon}></path>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;

