import React, { useEffect, useMemo, useState } from 'react';

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: 'DeFi Lending Platform',
        category: 'blockchain',
        badge: 'Blockchain',
        image:
          'https://images.unsplash.com/photo-1559523182-a284c3fb7cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8cHJvamVjdHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2NDc0M3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80',
        short: 'A decentralized finance platform enabling peer-to-peer lending using smart contracts and blockchain technology.',
        tech: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
        description:
          'A decentralized finance platform enabling peer-to-peer lending and borrowing using smart contracts and blockchain technology. The platform employs automated interest rate mechanisms and collateral management systems to ensure stability and security.',
        challenges: [
          'Implementing secure smart contracts with comprehensive audit procedures',
          'Developing complex financial algorithms for interest rate calculations',
          'Creating a gas-efficient system for on-chain transactions',
          'Building a responsive UI that displays real-time blockchain data',
        ],
        features: [
          'Automated interest rate adjustments based on supply and demand',
          'Multi-collateral lending with liquidation protection',
          'Flash loan capabilities for advanced users',
          'Governance token for protocol decision-making',
          'Analytics dashboard for portfolio management',
        ],
        date: 'December 2022',
        role: 'Lead Blockchain Developer',
      },
      {
        id: 2,
        title: 'Modern E-commerce Platform',
        category: 'web',
        badge: 'Web Development',
        image:
          'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8cHJvamVjdHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2NDc0M3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80',
        short: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard.',
        tech: ['React', 'Node.js', 'MongoDB', 'Redux'],
        description:
          'A full-stack e-commerce solution with real-time inventory management, payment processing, and analytics dashboard. The platform features a microservices architecture for scalability and reliable performance under high traffic conditions.',
        challenges: [
          'Designing a scalable architecture to handle traffic spikes during promotions',
          'Implementing real-time inventory updates across distributed systems',
          'Optimizing database queries for fast product search and filtering',
          'Ensuring secure payment processing and user data protection',
        ],
        features: [
          'Advanced search with filtering and sorting capabilities',
          'Real-time inventory management across multiple warehouses',
          'Secure payment gateway integration with multiple providers',
          'Customer account management with order history',
          'Admin dashboard with sales analytics and reporting',
        ],
        date: 'August 2022',
        role: 'Full Stack Developer',
      },
      {
        id: 3,
        title: 'Algorithm Visualization Tool',
        category: 'algorithms',
        badge: 'Algorithms',
        image:
          'https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8cHJvamVjdHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2NDc0M3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80',
        short: 'An interactive platform to visualize complex algorithms in real-time, designed for educational purposes.',
        tech: ['C++', 'JavaScript', 'Three.js', 'WebGL'],
        description:
          'An interactive platform to visualize complex algorithms in real-time, designed for educational purposes. This tool helps students and developers understand algorithm behavior through dynamic visualization and step-by-step execution.',
        challenges: [
          'Creating smooth animations that accurately represent algorithm operations',
          'Implementing a flexible system to visualize different algorithm types',
          'Optimizing performance for complex algorithms with large datasets',
          'Designing an intuitive interface for educational purposes',
        ],
        features: [
          'Interactive visualization of sorting, searching, and graph algorithms',
          'Step-by-step execution with speed controls',
          'Custom input options for testing different scenarios',
          'Algorithm comparison tool to analyze efficiency differences',
          'Code view showing the actual implementation alongside visualization',
        ],
        date: 'May 2022',
        role: 'Algorithm Engineer & Frontend Developer',
      },
      {
        id: 4,
        title: 'NFT Marketplace',
        category: 'blockchain',
        badge: 'Blockchain',
        image:
          'https://images.unsplash.com/photo-1559523182-a284c3fb7cff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8cHJvamVjdHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2NDc0M3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80',
        short: 'A decentralized NFT marketplace enabling creation, buying, and selling of digital assets with royalty distributions.',
        tech: ['Solidity', 'IPFS', 'React', 'Ethers.js'],
        description:
          'A decentralized NFT marketplace enabling creation, buying, and selling of digital assets with royalty distributions. The platform supports multiple blockchain networks and integrates with popular wallets for a seamless user experience.',
        challenges: [
          'Developing cross-chain compatibility for NFT transfers',
          'Implementing an efficient metadata storage system using IPFS',
          'Creating a secure auction system for NFT sales',
          'Building a responsive UI that handles blockchain transaction states',
        ],
        features: [
          'NFT minting with customizable royalty settings',
          'Auction and fixed-price sale options',
          'Creator verification and profile system',
          'Detailed transaction history and analytics',
          'Integration with multiple wallet providers',
        ],
        date: 'February 2023',
        role: 'Blockchain Developer & UI Designer',
      },
      {
        id: 5,
        title: 'AI-Powered Content Platform',
        category: 'web',
        badge: 'Web Development',
        image:
          'https://images.unsplash.com/photo-1551434678-e076c223a692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8cHJvamVjdHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2NDc0M3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80',
        short: 'A SaaS platform leveraging AI to generate and optimize content for marketing, with analytics and A/B testing.',
        tech: ['Next.js', 'Python', 'TensorFlow', 'AWS'],
        description:
          'A SaaS platform leveraging AI to generate and optimize content for marketing, with analytics and A/B testing capabilities. The platform uses advanced machine learning models to create engaging content tailored to specific audience segments.',
        challenges: [
          'Integrating and fine-tuning multiple AI models for content generation',
          'Developing a reliable content scoring system based on engagement metrics',
          'Building a scalable architecture for processing large language models',
          'Creating an intuitive interface for non-technical marketing professionals',
        ],
        features: [
          'AI-powered content generation for multiple formats and channels',
          'Content performance analytics with actionable insights',
          'Automated A/B testing for headline and copy optimization',
          'SEO analysis and recommendations',
          'Content calendar with scheduling and publishing automation',
        ],
        date: 'November 2022',
        role: 'Machine Learning Engineer & Frontend Developer',
      },
      {
        id: 6,
        title: 'Pathfinding Visualizer',
        category: 'algorithms',
        badge: 'Algorithms',
        image:
          'https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8Mnx8cHJvamVjdHMlMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzE2NDc0M3ww&ixlib=rb-4.0.3&q=80&w=1080?q=80',
        short: 'An interactive tool for visualizing various pathfinding algorithms such as Dijkstra, A*, and BFS with customizable maps.',
        tech: ['C++', 'JavaScript', 'Canvas API', 'Data Structures'],
        description:
          'An interactive tool for visualizing various pathfinding algorithms such as Dijkstra, A*, and BFS with customizable maps and obstacles. The application demonstrates algorithm efficiency and behavior in different scenarios.',
        challenges: [
          'Implementing efficient pathfinding algorithms for real-time visualization',
          'Creating an interactive grid system with customizable obstacles',
          'Developing clear visual representations of algorithm behavior',
          'Optimizing performance for large grid sizes and complex maps',
        ],
        features: [
          'Multiple algorithm implementations including Dijkstra, A*, BFS, and DFS',
          'Interactive grid with drawing tools for custom maps',
          'Step-by-step visualization with adjustable speed',
          'Algorithm comparison mode to run multiple algorithms simultaneously',
          'Maze generation algorithms for testing scenarios',
        ],
        date: 'April 2022',
        role: 'Algorithm Developer',
      },
    ],
    []
  );

  useEffect(() => {
    const particlesContainer = document.getElementById('projects-particles');
    if (!particlesContainer || particlesContainer.children.length > 0) return;

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
      particle.style.animation = `particle-float ${Math.random() * 20 + 10}s linear infinite`;
      particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes particle-float {
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

  const visibleProjects =
    activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  const current = selectedProject || projects[0];

  return (
    <section id="projects" className="py-24 bg-neutral-800 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_10%_50%,rgba(100,255,218,0.03)_0%,rgba(10,25,47,0.01)_70%)]"></div>
        <div id="projects-particles" className="absolute inset-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-2">Featured Projects</h2>
          <div className="w-24 h-1 bg-[#64FFDA] rounded-full"></div>
          <p className="text-gray-300 mt-4 text-center max-w-2xl">Innovative solutions crafted with modern technologies</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            ['all', 'All Projects'],
            ['web', 'Web Development'],
            ['blockchain', 'Blockchain'],
            ['algorithms', 'Algorithms'],
          ].map(([key, label]) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                activeFilter === key
                  ? 'bg-neutral-700 text-[#64FFDA]'
                  : 'bg-neutral-900 text-gray-300 hover:bg-neutral-700'
              }`}
              onClick={() => setActiveFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
          {visibleProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="bg-neutral-900 rounded-xl overflow-hidden shadow-xl hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-all duration-500 transform hover:-translate-y-2 group">
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/400x300';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-neutral-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#64FFDA]">
                    {project.badge}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.short}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-1 bg-neutral-800 text-xs text-[#64FFDA] rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300" aria-label="View Code">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                      </a>
                      <a href="#" className="text-gray-400 hover:text-[#64FFDA] transition-colors duration-300" aria-label="Preview Project">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <button
                      className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-[#64FFDA] rounded-md transition-colors duration-300 text-sm flex items-center"
                      onClick={() => setSelectedProject(project)}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-block px-8 py-3 bg-[#64FFDA] text-neutral-900 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 font-medium">
            View All Projects
          </a>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
          <div className="bg-neutral-800 rounded-xl p-6 md:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setSelectedProject(null)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <img src={current.image} alt={current.title} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-white mt-6 mb-3">{current.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {current.tech.map((t) => (
                    <span key={t} className="px-2 py-1 bg-neutral-700 text-xs text-[#64FFDA] rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#64FFDA] mb-2">Project Overview</h3>
                    <p className="text-gray-300">{current.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#64FFDA] mb-2">Technical Challenges</h3>
                    <ul className="space-y-2 text-gray-300 list-disc pl-5">
                      {current.challenges.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#64FFDA] mb-2">Key Features</h3>
                    <ul className="space-y-2 text-gray-300 list-disc pl-5">
                      {current.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-neutral-900 p-5 rounded-lg shadow-inner">
                  <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Category</p>
                      <p className="text-[#64FFDA]">{current.badge}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Technologies</p>
                      <div className="text-white">{current.tech.join(', ')}</div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Completion Date</p>
                      <p className="text-white">{current.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Role</p>
                      <p className="text-white">{current.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Projects;
