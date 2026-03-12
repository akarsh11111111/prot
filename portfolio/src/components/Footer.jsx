import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      newsletterEmail: '',
    },
  });

  useEffect(() => {
    const particlesContainer = document.getElementById('footer-particles');
    if (particlesContainer && particlesContainer.children.length === 0) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 1;
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `rgba(100, 255, 218, ${Math.random() * 0.2})`;
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `footer-particle-float ${Math.random() * 20 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
      }
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes footer-particle-float {
        0% { transform: translate3d(0, 0, 0); }
        25% { transform: translate3d(40px, 60px, 0); }
        50% { transform: translate3d(-50px, 70px, 0); }
        75% { transform: translate3d(-60px, -40px, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }

      @keyframes footer-bounce-once {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }

      .footer-bounce-once {
        animation: footer-bounce-once 0.45s ease-in-out;
      }
    `;
    document.head.appendChild(style);

    const tiltElements = Array.from(document.querySelectorAll('.footer-tilt'));
    const cleanupFns = [];

    tiltElements.forEach((element) => {
      const handleMove = (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
      };

      const handleLeave = () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      };

      element.addEventListener('mousemove', handleMove);
      element.addEventListener('mouseleave', handleLeave);

      cleanupFns.push(() => {
        element.removeEventListener('mousemove', handleMove);
        element.removeEventListener('mouseleave', handleLeave);
      });
    });

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      cleanupFns.forEach((fn) => fn());
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (newsletterStatus !== 'success') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setNewsletterStatus('idle');
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [newsletterStatus]);

  const handleAnchorClick = (e, href) => {
    if (!href.startsWith('#')) {
      return;
    }

    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bounceIcon = (e) => {
    const el = e.currentTarget;
    el.classList.remove('footer-bounce-once');
    window.requestAnimationFrame(() => {
      el.classList.add('footer-bounce-once');
    });
  };

  const handleNewsletterSubmit = (values) => {
    const subscriptionPayload = {
      email: values.newsletterEmail,
      subscribedAt: new Date().toISOString(),
    };

    console.log('Newsletter subscription payload:', subscriptionPayload);
    setNewsletterStatus('success');
    reset();
  };

  const handleNewsletterInvalid = (formErrors) => {
    console.error('Newsletter form validation failed:', {
      errors: formErrors,
      attemptedEmail: watch('newsletterEmail') || '',
    });

    setNewsletterStatus('error');
  };

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'Blockchain Solutions',
    'Smart Contracts',
    'Algorithm Optimization',
    'UI/UX Design',
    'Technical Consulting',
  ];

  return (
    <footer id="footer" className="bg-neutral-900 pt-16 pb-8 relative z-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="footer-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="[perspective:1000px]">
            <div className="footer-tilt transform transition-all duration-500">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Akarsh <span className="text-[#64FFDA]">Vidyarthi</span></h2>
              </div>

              <p className="text-gray-400 mb-6">Building exceptional digital experiences with cutting-edge technologies</p>

              <div className="flex space-x-4">
                <a href="https://github.com/akarsh11111111" target="_blank" rel="noreferrer" onMouseEnter={bounceIcon} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-[#64FFDA] hover:text-neutral-900 transition-all duration-300" aria-label="GitHub">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" onMouseEnter={bounceIcon} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-[#64FFDA] hover:text-neutral-900 transition-all duration-300" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noreferrer" onMouseEnter={bounceIcon} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-[#64FFDA] hover:text-neutral-900 transition-all duration-300" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noreferrer" onMouseEnter={bounceIcon} className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 hover:bg-[#64FFDA] hover:text-neutral-900 transition-all duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="[perspective:1000px]">
            <div className="footer-tilt transform transition-all duration-500">
              <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>

              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href} className="group">
                    <a href={link.href} onClick={(e) => handleAnchorClick(e, link.href)} className="text-gray-400 hover:text-[#64FFDA] transition-all duration-300 flex items-center group-hover:translate-x-1 transform">
                      <svg className="w-4 h-4 mr-2 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="[perspective:1000px]">
            <div className="footer-tilt transform transition-all duration-500">
              <h3 className="text-white text-lg font-semibold mb-6">Services</h3>

              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="group">
                    <a href="#" className="text-gray-400 hover:text-[#64FFDA] transition-all duration-300 flex items-center group-hover:translate-x-1 transform" onClick={(e) => e.preventDefault()}>
                      <svg className="w-4 h-4 mr-2 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="[perspective:1000px]">
            <div className="footer-tilt transform transition-all duration-500">
              <h3 className="text-white text-lg font-semibold mb-6">Stay Updated</h3>

              <p className="text-gray-400 mb-4">Subscribe to my newsletter for tech insights and project updates</p>

              <form className="space-y-3" onSubmit={handleSubmit(handleNewsletterSubmit, handleNewsletterInvalid)} noValidate>
                <div className="relative">
                  <input
                    type="email"
                    id="newsletter-email"
                    placeholder="Your email"
                    {...register('newsletterEmail', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#64FFDA] focus:border-transparent text-white"
                  />
                </div>

                {errors.newsletterEmail && (
                  <div className="mt-2 p-2 bg-red-500/20 text-red-400 text-sm rounded-md">{errors.newsletterEmail.message}</div>
                )}

                <button type="submit" disabled={isSubmitting} className="w-full px-4 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>

                <p className="text-xs text-gray-500">
                  Form state: {isDirty ? 'Dirty' : 'Pristine'} | {isValid ? 'Valid' : 'Invalid'} | {isSubmitted ? 'Submitted' : 'Not submitted'}
                </p>

                {newsletterStatus === 'success' && (
                  <div className="mt-4 p-2 bg-green-500/20 text-green-500 text-sm rounded-md">Thank you for subscribing!</div>
                )}
                {newsletterStatus === 'error' && (
                  <div className="mt-4 p-2 bg-red-500/20 text-red-400 text-sm rounded-md">Please fix the highlighted field and try again.</div>
                )}
              </form>

              <div className="mt-6">
                <p className="text-gray-400 text-sm">By subscribing, you agree to our <a href="#" className="text-[#64FFDA] hover:underline" onClick={(e) => e.preventDefault()}>Privacy Policy</a></p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">&copy; 2023 Akarsh Vidyarthi. All rights reserved.</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 text-sm">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 text-sm">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300 text-sm">Sitemap</a>
          </div>
        </div>

        <button
          id="back-to-top"
          type="button"
          onClick={handleBackToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-[#64FFDA] text-neutral-900 rounded-full flex items-center justify-center shadow-lg z-50 transform hover:scale-110 hover:rotate-6 transition-all duration-300 ${
            showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;