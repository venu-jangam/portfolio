import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Linkedin, Mail, MapPin, 
  ChevronRight, GraduationCap, 
  Briefcase, Rocket, Cpu, Award, Send 
} from 'lucide-react';

// Interactive Constellation Background for Light Theme
const ConstellationBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;

        // Interaction with mouse
        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            this.x -= dx / 20;
            this.y -= dy / 20;
          }
        }
      }
      draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          if (distance < (canvas.width / 10) * (canvas.height / 10)) {
            let opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const categories = [
    { 
      id: 'space', 
      label: 'Space & ISRU', 
      icon: <Rocket size={24} />,
      bgClass: 'bg-space-sketch'
    },
    { 
      id: 'robotics', 
      label: 'Robotics', 
      icon: <Cpu size={24} />,
      bgClass: 'bg-rover-sketch'
    },
    { 
      id: 'engineering', 
      label: 'Engineering', 
      icon: <Award size={24} />,
      bgClass: 'bg-engineering-sketch'
    },
  ];

  const projects = {
    space: [
      {
        title: "Mechanical & Jr. Systems Engineer",
        org: "Space Copy, Canada",
        period: "10/2024 - Present",
        description: "Systems Engineering for ISRU technologies for Additive Manufacturing on the Moon and extreme environments. Progressed from Intern to Mechanical Engineer to Jr. Systems Engineer.",
        link: "https://www.spacecopy.com/",
        image: "./ISU Printer.png",
        skills: "CAD, structural analysis, System engineering documentation: FFBD, ConOps, PBS"
      },
      {
        title: "Student Researcher (Lunar Regolith)",
        org: "",
        period: "12/2025 - Present",
        description: "Study of lunar regolith & DEM analysis on lunar regolith simulant to study behavioral properties for future missions.",
        link: "#",
        skills: "DEM simulations, EDEM software"
      }
    ],
    robotics: [
      {
        title: "Lead Mechanical Engineer",
        org: "International Space University Team Project, France",
        period: "10/2025 - Present",
        description: "Design, prototyping & analysis of Rover, Drone, Entry Descent & Landing Vehicle, Payload Deployment mechanisms for Mars mission.",
        link: "#"
      },
      {
        title: "Researcher - Robotics",
        org: "Robotics Research Lab (RRL), India",
        period: "04/2022 - 06/2025",
        description: "Design, prototyping, and manufacturing of ready-to-function parts for human-sized robots.",
        link: "https://rrlgcoeara.in/",
        image: "./Researcher RRL.png",
        skills: "CAD, FEM analysis, manufacturing, AIT, team management, sponsorship, mentoring"
      }
    ],
    engineering: [
      {
        title: "Project Student",
        org: "PQM Lab, IUCAA",
        period: "01/2024 - 04/2025",
        description: "Designed and implemented high precision optical mountings for advanced astronomical instrumentation.",
        link: "#"
      },
      {
        title: "Team Lead & Founder",
        org: "Team Astrophile, GCOEARA",
        period: "04/2023 - 06/2025",
        description: "Led a team of engineering students in designing and competing in various aerospace and astronomy competitions.",
        link: "https://www.linkedin.com/in/venu-jangam"
      }
    ]
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-500 ${darkMode ? 'dark text-white bg-space-900' : 'text-gray-900 bg-gray-50'}`}>
      
      {/* Background Elements */}
      {darkMode ? (
        <div className="fixed inset-0 z-0 stars-bg opacity-40 pointer-events-none"></div>
      ) : (
        <ConstellationBackground />
      )}
      
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent to-gray-100/50 dark:to-space-900/50 pointer-events-none"></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold tracking-tighter"
          >
            VJ.
          </motion.div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-8 text-sm font-medium">
              <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
              <a href="#education" className="hover:text-blue-500 transition-colors">Education</a>
              <a href="#experience" className="hover:text-blue-500 transition-colors">Experience</a>
              <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-white dark:bg-space-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-110 transition-all active:scale-95"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="relative z-10 container mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-white dark:bg-space-800 border-4 border-white dark:border-gray-700 shadow-2xl overflow-hidden mb-10 transition-transform duration-500 flex items-center justify-center group"
        >
          <img 
            src="./Venu.jpeg" 
            alt="Venu Jangam" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full flex-col items-center justify-center text-gray-400 bg-gray-100 dark:bg-space-800">
             <Rocket size={40} className="mx-auto mb-2 text-blue-500" />
             <p className="text-xs font-mono px-4">Upload Venu.jpeg to repo</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Venu Jangam
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light mb-10 leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis px-4 w-full max-w-full">
            Mechanical & Space Engineer <span className="text-blue-500 font-normal">|</span> Space Resources & Space Technologies
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="https://www.linkedin.com/in/venu-jangam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all hover:-translate-y-1">
            <Linkedin size={20} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a href="mailto:venujangam.fr@gmail.com" className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-space-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
            <Mail size={20} className="text-gray-600 dark:text-gray-400" />
            <span className="font-medium">Email Me</span>
          </a>
        </motion.div>
      </header>

      {/* Education Section */}
      <section id="education" className="relative z-10 py-24 bg-white/50 dark:bg-space-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <GraduationCap size={32} />
            </div>
            <h2 className="text-4xl font-bold">Education</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-space-800 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/20 dark:shadow-none"
            >
              <div className="text-blue-500 font-mono text-sm mb-2">09/2025 - Present</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Masters of Space Studies</h3>
                <a href="https://www.isunet.edu/" target="_blank" rel="noopener noreferrer" className="shrink-0 ml-4 hover:scale-110 transition-transform">
                  <img src="https://logo.clearbit.com/isunet.edu" alt="ISU Logo" className="w-10 h-10 rounded-full bg-white object-contain p-1 border border-gray-200" onError={(e) => e.target.style.display='none'} />
                </a>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Space Engineering & Applications</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} />
                <span>International Space University (ISU), France</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white dark:bg-space-800 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/20 dark:shadow-none"
            >
              <div className="text-blue-500 font-mono text-sm mb-2">06/2021 - 06/2025</div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Bachelor of Engineering</h3>
                <a href="https://www.gcoeara.ac.in/" target="_blank" rel="noopener noreferrer" className="shrink-0 ml-4 hover:scale-110 transition-transform">
                  <img src="https://logo.clearbit.com/gcoeara.ac.in" alt="GCOEARA Logo" className="w-10 h-10 rounded-full bg-white object-contain p-1 border border-gray-200" onError={(e) => e.target.style.display='none'} />
                </a>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Mechanical Engineering</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} />
                <span>Government College of Engineering and Research, Pune, India</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience & Projects Section - Vertical Layout */}
      <section id="experience" className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500">
              <Briefcase size={32} />
            </div>
            <h2 className="text-4xl font-bold">Experience & Projects</h2>
          </div>

          <div className="space-y-24">
            {categories.map((category) => (
              <div key={category.id} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-space-800 text-gray-700 dark:text-gray-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{category.label}</h3>
                </div>

                {/* Background Sketch Container */}
                <div className={`absolute inset-0 z-0 opacity-5 dark:opacity-10 pointer-events-none ${category.bgClass} bg-no-repeat bg-center bg-cover rounded-3xl`}></div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                  {projects[category.id].map((project, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group relative p-8 rounded-3xl bg-white/80 dark:bg-space-800/80 backdrop-blur-md border border-gray-100/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <div className="text-xs font-mono text-blue-500 mb-3">{project.period}</div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{project.title}</h4>
                      {project.org && <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{project.org}</p>}
                      
                      {project.image && (
                        <div className="w-full h-48 mb-4 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 bg-gray-100 dark:bg-space-900">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                        </div>
                      )}
                      
                      <p className={`text-gray-600 dark:text-gray-300 text-sm leading-relaxed ${project.skills ? 'mb-4' : 'mb-12'}`}>
                        {project.description}
                      </p>
                      
                      {project.skills && (
                        <div className="mb-12 border-t border-gray-100 dark:border-gray-700 pt-4">
                          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Skills: </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{project.skills}</span>
                        </div>
                      )}
                      
                      {project.link !== "#" && (
                        <a 
                          href={project.link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-8 left-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:gap-3 transition-all"
                        >
                          {project.isGallery ? 'View Gallery' : 'View Link'}
                          <ChevronRight size={14} />
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 mb-20">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="p-8 md:p-12 rounded-[2rem] bg-white dark:bg-space-800 border border-gray-200 dark:border-gray-700 shadow-xl relative">
            <form 
              action="mailto:venujangam.fr@gmail.com" 
              method="post" 
              encType="text/plain"
              className="relative z-10 space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  name="name"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-space-900 border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  name="email"
                  className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-space-900 border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                  required
                />
              </div>
              <textarea 
                placeholder="Message" 
                name="message"
                rows="4"
                className="w-full px-6 py-4 rounded-xl bg-gray-50 dark:bg-space-900 border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white"
                required
              ></textarea>
              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20"
              >
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-12 text-center text-sm text-gray-500 border-t border-gray-200/50 dark:border-gray-800/50">
        <p>© {new Date().getFullYear()} Venu Jangam. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;
