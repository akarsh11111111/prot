import React from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/skills.jsx';
import Experience from './components/experience.jsx';
import Projects from './components/projects.jsx';
import TechStack from './components/techstack.jsx';
import Testimonials from './components/testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1 relative h-full">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <TechStack />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;