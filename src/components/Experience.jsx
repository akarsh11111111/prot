import React, { useEffect } from 'react';

function Experience() {
  useEffect(() => {
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineContainer && timelineItems.length) {
      timelineItems.forEach((item, index) => {
        if (index === 0) return;

        const connector = document.createElement('div');
        connector.className = 'timeline-connector';
        connector.style.position = 'absolute';
        connector.style.width = '2px';
        connector.style.backgroundColor = '#64FFDA';
        connector.style.opacity = '0.3';
        connector.style.left = window.innerWidth < 768 ? '16px' : '24px';
        connector.style.top = `${index * 100 - 50}px`;
        connector.style.bottom = `${(timelineItems.length - index) * 100}px`;
        connector.style.zIndex = '0';

        item.insertBefore(connector, item.firstChild);
      });

      timelineItems.forEach((item) => {
        const marker = document.createElement('div');
        marker.className = 'timeline-marker';
        marker.style.position = 'absolute';
        marker.style.width = window.innerWidth < 768 ? '12px' : '16px';
        marker.style.height = window.innerWidth < 768 ? '12px' : '16px';
        marker.style.borderRadius = '50%';
        marker.style.backgroundColor = '#64FFDA';
        marker.style.left = window.innerWidth < 768 ? '10px' : '17px';
        marker.style.top = '50%';
        marker.style.transform = 'translateY(-50%)';
        marker.style.zIndex = '1';

        item.style.paddingLeft = '48px';
        item.style.position = 'relative';
        item.style.marginBottom = '32px';

        item.insertBefore(marker, item.firstChild);
      });
    }

    const onMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      document.querySelectorAll('.perspective-3d').forEach((el) => {
        el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
      });

      document.querySelectorAll('.timeline-item').forEach((item) => {
        const depth = Number(item.getAttribute('data-depth') || 0.1);
        const moveX = x * 30 * depth;
        const moveY = y * 30 * depth;
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };

    document.addEventListener('mousemove', onMouseMove);

    const transformCard = document.querySelector('.transform-card');
    const onCardMove = (e) => {
      if (!transformCard) return;
      const rect = transformCard.getBoundingClientRect();
      const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
      const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
      transformCard.style.transform = `perspective(1000px) rotateY(${xPercent * 10}deg) rotateX(${yPercent * -10}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    const onCardLeave = () => {
      if (!transformCard) return;
      transformCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
    };

    if (transformCard) {
      transformCard.addEventListener('mousemove', onCardMove);
      transformCard.addEventListener('mouseleave', onCardLeave);
    }

    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
      const delay = icon.style.getPropertyValue('--delay') || '0s';
      icon.style.position = 'absolute';
      icon.style.animation = 'float-icon 4s ease-in-out infinite';
      icon.style.animationDelay = delay;

      if (index === 0) {
        icon.style.top = '30%';
        icon.style.left = '20%';
      } else if (index === 1) {
        icon.style.top = '50%';
        icon.style.right = '20%';
      } else if (index === 2) {
        icon.style.bottom = '30%';
        icon.style.left = '40%';
      } else {
        icon.style.top = '40%';
        icon.style.left = '50%';
      }
    });

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float-icon {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }

      @keyframes particle-float {
        0% { transform: translate3d(0, 0, 0); }
        25% { transform: translate3d(50px, 60px, 0); }
        50% { transform: translate3d(-60px, 80px, 0); }
        75% { transform: translate3d(-70px, -50px, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
    `;
    document.head.appendChild(style);

    const particlesContainer = document.getElementById('experience-particles');
    if (particlesContainer && particlesContainer.children.length === 0) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1;

        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `rgba(100, 255, 218, ${Math.random() * 0.1 + 0.05})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `particle-float ${Math.random() * 20 + 10}s linear infinite`;

        particlesContainer.appendChild(particle);
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    timelineItems.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(item);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (transformCard) {
        transformCard.removeEventListener('mousemove', onCardMove);
        transformCard.removeEventListener('mouseleave', onCardLeave);
      }
      timelineItems.forEach((item) => observer.unobserve(item));
      document.head.removeChild(style);
    };
  }, []);

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      period: '2021 - Present',
      points: [
        'Led development of a blockchain-based supply chain solution that increased transparency by 40%',
        'Optimized data processing algorithms, reducing computational complexity by O(n²) to O(n log n)',
        'Mentored junior developers in modern web development practices and blockchain fundamentals',
      ],
      tags: ['React', 'Node.js', 'Solidity', 'Web3', 'C++'],
      depth: 0.1,
    },
    {
      title: 'Blockchain Developer',
      company: 'Decentralized Systems LLC',
      period: '2019 - 2021',
      points: [
        'Developed smart contracts for a decentralized finance platform with $10M+ in TVL',
        'Implemented gas optimization techniques, reducing transaction costs by 35%',
        'Built front-end interfaces for blockchain applications using React and Web3.js',
      ],
      tags: ['Ethereum', 'Solidity', 'Web3.js', 'DeFi', 'JavaScript'],
      depth: 0.2,
    },
    {
      title: 'Full Stack Developer',
      company: 'WebSolutions Co.',
      period: '2017 - 2019',
      points: [
        'Architected and developed RESTful APIs serving 1M+ daily requests',
        'Implemented responsive, mobile-first web applications using modern frameworks',
        'Reduced page load times by 60% through optimization techniques and CDN implementation',
      ],
      tags: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Express'],
      depth: 0.3,
    },
    {
      title: 'Software Engineer Intern',
      company: 'Tech Startup Inc.',
      period: '2016 - 2017',
      points: [
        'Collaborated in agile development teams to deliver features for a SaaS platform',
        'Implemented efficient algorithms for data processing using C++ and Python',
        'Contributed to open source projects in the company\'s technology stack',
      ],
      tags: ['C++', 'Python', 'Git', 'Algorithms', 'Data Structures'],
      depth: 0.4,
    },
  ];

  const highlights = [
    {
      title: 'Blockchain Innovation',
      desc: 'Led development of cutting-edge decentralized applications with significant market impact',
      icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
    },
    {
      title: 'Performance Optimization',
      desc: 'Specialized in creating high-performance applications with optimized algorithms and data structures',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Team Leadership',
      desc: 'Mentored junior developers and led cross-functional teams to deliver successful projects',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-neutral-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="experience-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">Professional Experience</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
          <p className="text-gray-300 mt-4 text-center max-w-2xl">A journey through my professional career and achievements</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/5 perspective-3d">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="transform-card w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl bg-neutral-800 relative group">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8ZXhwZXJpZW5jZSUyMHByb2Zlc3Npb25hbHxlbnwwfDB8fHwxNzQzMTY5MzA1fDA&ixlib=rb-4.0.3&q=80&w=1080?q=80"
                    alt="Professional Software Engineer at Work"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/500x600';
                    }}
                    width="6000"
                    height="4000"
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {['0s', '0.2s', '0.4s'].map((delay, i) => (
                      <div key={delay} className="floating-icon" style={{ '--delay': delay }}>
                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                          <svg className="w-6 h-6 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />}
                            {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />}
                            {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />}
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-[#64FFDA] text-sm"></span>
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white">Professional Growth</h3>
                    <p className="text-gray-300">My journey has been centered around building innovative solutions across various technology stacks, including cutting-edge blockchain applications and optimized algorithms.</p>

                    <div className="pt-4 flex space-x-3">
                      <div className="experience-stat">
                        <div className="text-3xl font-bold text-[#64FFDA]">5+</div>
                        <p className="text-gray-400 text-sm">Years Experience</p>
                      </div>
                      <div className="experience-stat">
                        <div className="text-3xl font-bold text-[#64FFDA]">20+</div>
                        <p className="text-gray-400 text-sm">Projects</p>
                      </div>
                      <div className="experience-stat">
                        <div className="text-3xl font-bold text-[#64FFDA]">10+</div>
                        <p className="text-gray-400 text-sm">Technologies</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-[#64FFDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64FFDA]/20 to-[#64FFDA]/10 rounded-xl blur opacity-0 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 relative z-10">
            <div className="timeline-container perspective-3d">
              {experiences.map((exp) => (
                <div key={exp.title} className="timeline-item" data-depth={exp.depth}>
                  <div className="timeline-content bg-neutral-800 rounded-lg p-6 shadow-lg hover:shadow-[0_0_30px_rgba(100,255,218,0.1)] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-[#64FFDA]">{exp.company}</p>
                      </div>
                      <span className="bg-neutral-700 text-white text-sm px-3 py-1 rounded-full">{exp.period}</span>
                    </div>

                    <ul className="space-y-2 text-gray-300">
                      {exp.points.map((point) => (
                        <li key={point} className="flex items-start space-x-3">
                          <svg className="w-5 h-5 text-[#64FFDA] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0" />
                          </svg>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-neutral-700 text-[#64FFDA] text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto">
          <div className="relative bg-neutral-800 rounded-xl p-8 shadow-xl overflow-hidden perspective-3d">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Career Highlights</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {highlights.map((item) => (
                  <div key={item.title} className="p-4 bg-neutral-900/50 rounded-lg hover:bg-neutral-700 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-[#64FFDA]/10 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <a href="#contact" className="px-8 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium inline-flex items-center group">
                  Discuss Your Project
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
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

export default Experience;
