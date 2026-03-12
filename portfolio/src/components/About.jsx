import React, { useEffect } from 'react';

function About() {
  // Adjust these two values to control the profile image size.
  const ABOUT_IMAGE_WIDTH = '100%';
  const ABOUT_IMAGE_HEIGHT = '520px';

  useEffect(() => {
    const floatingShapes = document.getElementById('floating-shapes');
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['#64FFDA20', '#0A192F30', '#F9731620'];

    for (let i = 0; i < 15; i++) {
      const shape = document.createElement('div');
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      const size = Math.random() * 80 + 20;

      shape.className = 'absolute rounded-lg bg-opacity-20';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.transform = `translateZ(${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;
      shape.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;

      if (shapeType === 'triangle') {
        shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      }

      floatingShapes.appendChild(shape);
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0%   { transform: translate3d(0, 0, 0) rotate(0deg); }
        25%  { transform: translate3d(50px, 60px, 30px) rotate(90deg); }
        50%  { transform: translate3d(-60px, 80px, -40px) rotate(180deg); }
        75%  { transform: translate3d(-70px, -50px, 40px) rotate(270deg); }
        100% { transform: translate3d(0, 0, 0) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    const card = document.querySelector('.tilt-card');
    if (card) {
      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const xPercent = (e.clientX - rect.left) / rect.width - 0.5;
        const yPercent = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${xPercent * 10}deg) rotateX(${yPercent * -10}deg) scale3d(1.05, 1.05, 1.05)`;
      };
      const onMouseLeave = () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
      };
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    }

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
    });

    const checkScroll = () => {
      animatedElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    checkScroll();

    const aboutSection = document.getElementById('about');
    const onSectionMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      document.querySelectorAll('.perspective-3d').forEach(el => {
        el.style.transform = `translate3d(${x * 30}px, ${y * 30}px, 0)`;
      });
    };
    aboutSection.addEventListener('mousemove', onSectionMouseMove);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('load', checkScroll);
      aboutSection.removeEventListener('mousemove', onSectionMouseMove);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="about" className="relative py-24 bg-neutral-900 overflow-hidden">
      {/* 3D background element */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.02)_90%)]"></div>
        {/* 3D floating shapes */}
        <div id="floating-shapes" className="w-full h-full absolute"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* 3D Card with Image */}
          <div className="lg:w-2/5 w-full perspective-3d">
            <div className="tilt-card w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl bg-neutral-800 transform transition-all duration-500">
              <div className="relative">
                <img
                  src="/2.jpg"
                  alt="Akarsh Vidyarthi - Software Engineer"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/500x600'; }}
                  width="5048"
                  height="3370"
                  style={{ width: ABOUT_IMAGE_WIDTH, height: ABOUT_IMAGE_HEIGHT }}
                  className="object-cover transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-6">
                  <h3 className="text-[#64FFDA] text-xl font-bold">Akarsh Vidyarthi</h3>
                  <p className="text-white text-sm">Software Engineer</p>
                </div>
                {/* 3D hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#64FFDA]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6 bg-neutral-800">
                <div className="flex justify-between mb-4">
                  <span className="text-[#64FFDA] text-sm"></span>
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">Software Engineer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-300">India</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">akarsh@example.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Text Content */}
          <div className="lg:w-3/5 w-full mt-12 lg:mt-0">
            <div className="perspective-3d">
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed animate-on-scroll">
                  I'm a passionate <span className="text-[#64FFDA] font-semibold">Software Engineer</span> with extensive experience in building innovative solutions across various technology stacks. My journey in technology has been driven by a curiosity to solve complex problems and create exceptional digital experiences.
                </p>

                <p className="text-lg leading-relaxed animate-on-scroll">
                  I specialize in <span className="text-[#64FFDA] font-semibold">Data Structures &amp; Algorithms</span>, <span className="text-[#64FFDA] font-semibold">C++</span>, <span className="text-[#64FFDA] font-semibold">Web Development</span>, <span className="text-[#64FFDA] font-semibold">Web3</span>, and <span className="text-[#64FFDA] font-semibold">Blockchain Technologies</span>, allowing me to build everything from high-performance applications to decentralized solutions.
                </p>

                <div className="animate-on-scroll">
                  <h3 className="text-2xl font-bold text-white mb-4">My Approach</h3>
                  <ul className="space-y-3">
                    {[
                      'I solve complex problems with elegant, efficient solutions',
                      'I build scalable applications with best practices in mind',
                      'I continuously learn and adapt to new technologies',
                      'I collaborate effectively with teams to deliver outstanding results',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-[#64FFDA] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 flex flex-wrap gap-3 animate-on-scroll">
                  {['C++', 'JavaScript', 'React', 'Node.js', 'Blockchain', 'Solidity', 'Data Structures', 'Algorithms'].map((tag) => (
                    <span key={tag} className="px-4 py-2 bg-neutral-800 text-[#64FFDA] rounded-full">{tag}</span>
                  ))}
                </div>

                <div className="pt-8 animate-on-scroll">
                  <a href="#contact" className="px-8 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium inline-flex items-center group">
                    Let's Connect
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;