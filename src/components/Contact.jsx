import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Contact() {
  // Adjust image dimensions here as needed.
  const CONTACT_IMAGE_WIDTH = '100%';
  const CONTACT_IMAGE_HEIGHT = '320px';

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      privacy: false,
    },
  });

  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const particlesContainer = document.getElementById('contact-particles');
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
        particle.style.animation = `contact-particle-float ${Math.random() * 20 + 10}s linear infinite`;
        particlesContainer.appendChild(particle);
      }
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes contact-particle-float {
        0% { transform: translate3d(0, 0, 0); }
        25% { transform: translate3d(50px, 60px, 0); }
        50% { transform: translate3d(-60px, 80px, 0); }
        75% { transform: translate3d(-70px, -50px, 0); }
        100% { transform: translate3d(0, 0, 0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const onSubmit = async (values) => {
    const formPayload = {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      privacyAccepted: values.privacy,
      submittedAt: new Date().toISOString(),
    };

    console.log('Contact form submission payload:', formPayload);
    setStatus('idle');
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('success');
    reset();
  };

  const onInvalid = (formErrors) => {
    console.error('Contact form validation failed:', {
      errors: formErrors,
      attemptedPayload: {
        ...getValues(),
        submittedAt: new Date().toISOString(),
      },
    });
    setStatus('error');
  };

  return (
    <section id="contact" className="py-24 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="contact-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">Get In Touch</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
          <p className="text-gray-300 mt-4 text-center max-w-2xl">Let's discuss how we can collaborate on your next project</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="bg-neutral-800 rounded-xl overflow-hidden shadow-xl group">
              <div className="relative" style={{ width: CONTACT_IMAGE_WIDTH, height: CONTACT_IMAGE_HEIGHT }}>
                <img
                  src="/3.jpg"
                  alt="Professional developer ready to collaborate"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400';
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
              </div>

              <div className="p-8">
                <div className="flex justify-between mb-6">
                  <p className="text-sm text-[#64FFDA]"></p>
                  <div className="flex space-x-4">
                    <a href="https://github.com/akarsh11111111" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#64FFDA]">GitHub</a>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#64FFDA]">LinkedIn</a>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#64FFDA]">Twitter</a>
                  </div>
                </div>

                <div className="space-y-6 text-gray-300">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <a href="mailto:vidyarthiakarsh@gmail.com" className="hover:text-[#64FFDA]">vidyarthiakarsh@gmail.com</a>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                    <a href="tel:7903804789" className="hover:text-[#64FFDA]">7903804789</a>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Location</h3>
                    <p>India</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Working Hours</h3>
                    <p>Mon - Fri: 9AM - 6PM IST</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-neutral-700">
                  <h3 className="text-lg font-semibold text-white mb-2">Current Availability</h3>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-gray-300">Available for freelance work and collaborations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-neutral-800 rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    className="block w-full px-3 py-3 border bg-neutral-900 border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                    className="block w-full px-3 py-3 border bg-neutral-900 border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                    placeholder="vidyarthiakarsh@gmail.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: { value: 3, message: 'Subject must be at least 3 characters' },
                    })}
                    className="block w-full px-3 py-3 border bg-neutral-900 border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                    placeholder="Subject of your message"
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-2">{errors.subject.message}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                    className="block w-full px-3 py-3 border bg-neutral-900 border-neutral-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#64FFDA]"
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && <p className="text-red-400 text-sm mt-2">{errors.message.message}</p>}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    {...register('privacy', {
                      required: 'Please accept the privacy policy',
                    })}
                    className="h-4 w-4 text-[#64FFDA] focus:ring-[#64FFDA] border-neutral-700 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-300">
                    I agree to the <a href="#" className="text-[#64FFDA] hover:underline">Privacy Policy</a>
                  </label>
                </div>
                {errors.privacy && <p className="text-red-400 text-sm">{errors.privacy.message}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 font-medium"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-400">
                  Form state: {isDirty ? 'Dirty' : 'Pristine'} | {isValid ? 'Valid' : 'Invalid'} | {isSubmitted ? 'Submitted' : 'Not submitted'}
                </p>
                <p className="text-xs text-gray-500">Characters typed: {watch('message')?.length || 0}</p>
              </form>

              {(status === 'success' || isSubmitSuccessful) && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-md">
                  <p className="text-green-400">Your message has been sent successfully! I'll get back to you soon.</p>
                </div>
              )}

              {status === 'error' && Object.keys(errors).length > 0 && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-md">
                  <p className="text-red-400">Please fix the highlighted fields and try again.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="relative bg-neutral-800 rounded-xl p-6 overflow-hidden shadow-xl">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#64FFDA]/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Find Me Here</h3>
              <div className="h-80 rounded-lg overflow-hidden relative bg-neutral-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(100,255,218,0.05)_0%,rgba(10,25,47,0.1)_70%)]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center">
                  <div className="w-6 h-6 bg-[#64FFDA] rounded-full mx-auto"></div>
                  <div className="mt-2 px-4 py-2 bg-neutral-800 rounded-lg shadow-lg">
                    <p className="text-[#64FFDA] text-sm font-medium">India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;