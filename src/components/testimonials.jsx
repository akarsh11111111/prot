import React, { useEffect, useMemo, useState } from 'react';

function Testimonials() {
  const testimonials = useMemo(
    () => [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CTO, TechInnovate',
        project: 'Enterprise Blockchain Solution',
        text: 'Akarsh developed our blockchain solution with exceptional skill. His deep understanding of both front-end and back-end technologies enabled him to create a secure, scalable platform that exceeded our expectations.',
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'Lead Developer, FinTech Solutions',
        project: 'Financial Analytics Engine',
        text: 'Akarsh\'s algorithm optimization skills are incredible. He refactored our data processing system, reducing computation time by 70%. His proficiency in C++ and data structures solved complex performance issues.',
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Product Manager, E-commerce Platform',
        project: 'E-commerce Platform Redesign',
        text: 'His 3D UI implementations and attention to user experience resulted in a 40% increase in user engagement and a 25% boost in conversion rates. He delivers exceptional results.',
      },
      {
        id: 4,
        name: 'David Patel',
        role: 'Founder, Web3 Startup',
        project: 'NFT Marketplace Development',
        text: 'Akarsh\'s blockchain expertise was instrumental in launching our NFT marketplace. His smart contract development skills and security-first approach ensured our platform was robust from day one.',
      },
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const particlesContainer = document.getElementById('testimonial-particles');
    if (particlesContainer && particlesContainer.children.length === 0) {
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1;
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `rgba(100,255,218,${Math.random() * 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `testimonial-particle-float ${Math.random() * 20 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
      }
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes testimonial-particle-float {
        0% { transform: translate3d(0, 0, 0); }
        25% { transform: translate3d(50px, 60px, 0); }
        50% { transform: translate3d(-60px, 80px, 0); }
        75% { transform: translate3d(-70px, -50px, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
    `;
    document.head.appendChild(style);

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= testimonials.length ? 1 : prev + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, [testimonials.length]);

  const current = testimonials[currentSlide - 1];

  return (
    <section id="testimonials" className="py-24 bg-neutral-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="testimonial-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">Client Testimonials</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
          <p className="text-gray-300 mt-4 text-center max-w-2xl">What people say about working with me</p>
        </div>

        <div className="relative perspective-3d max-w-6xl mx-auto">
          <div className="bg-neutral-900 rounded-xl p-8 shadow-xl hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-all duration-500">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center">
                <svg className="w-12 h-12 text-[#64FFDA]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>

              <div className="flex-1 -mt-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{current.name}</h3>
                    <p className="text-[#64FFDA]">{current.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>

                <p className="text-gray-300 mt-6 leading-relaxed">"{current.text}"</p>

                <div className="mt-6 pt-6 border-t border-neutral-700">
                  <p className="text-gray-400 text-sm">Project: <span className="text-[#64FFDA]">{current.project}</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((item) => (
              <button
                key={item.id}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentSlide === item.id ? 'bg-[#64FFDA]' : 'bg-neutral-700'}`}
                onClick={() => setCurrentSlide(item.id)}
                aria-label={`View testimonial ${item.id}`}
              ></button>
            ))}
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 z-10">
            <button
              className="p-2 rounded-full bg-neutral-800 text-white hover:bg-[#64FFDA] hover:text-neutral-900 transition-colors duration-300"
              onClick={() => setCurrentSlide((prev) => (prev <= 1 ? testimonials.length : prev - 1))}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="p-2 rounded-full bg-neutral-800 text-white hover:bg-[#64FFDA] hover:text-neutral-900 transition-colors duration-300"
              onClick={() => setCurrentSlide((prev) => (prev >= testimonials.length ? 1 : prev + 1))}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-20 max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-white text-center mb-10">Trusted By</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
            {['TechInnovate', 'FinTech Solutions', 'Web3 Ventures', 'DataSphere Inc.'].map((logo) => (
              <div key={logo} className="bg-neutral-900 p-6 rounded-lg hover:bg-neutral-800 transition-colors duration-300 flex items-center justify-center h-24">
                <div className="text-[#64FFDA] font-bold text-xl">{logo}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 max-w-4xl mx-auto text-center">
          <div className="bg-neutral-900 rounded-xl p-10 shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to bring your ideas to life?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Let's collaborate to create exceptional digital experiences with innovative technology solutions.</p>
              <a href="#contact" className="px-8 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium inline-flex items-center group transform hover:-translate-y-1">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
