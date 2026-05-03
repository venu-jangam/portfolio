import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Github, Linkedin, Mail, MapPin } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-500 ${darkMode ? 'dark text-white' : 'text-gray-900 bg-gray-50 moon-bg'}`}>
      
      {/* Background Elements */}
      {darkMode && (
        <div className="absolute inset-0 z-0 stars-bg opacity-40 pointer-events-none"></div>
      )}
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-space-900 pointer-events-none"></div>

      {/* Navigation / Theme Toggle */}
      <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-xl font-bold tracking-tighter">
          VJ.
        </div>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm hover:scale-105 transition-transform"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 pt-12 pb-24 flex flex-col items-center text-center">
        
        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gray-200 dark:bg-space-800 border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden mb-8 flex items-center justify-center relative"
        >
          {/* We'll use an image tag assuming the image will be provided */}
          {/* <img src="/Profile Venu.png" alt="Venu Jangam" className="w-full h-full object-cover" /> */}
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-xs text-center p-4">
            <span>[Profile Picture]</span>
            <span className="mt-1">Profile Venu.png</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          Venu Jangam
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl font-light mb-8"
        >
          Mechanical & Systems Engineer | Space Tech & Robotics
        </motion.h2>

        {/* Contact Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a href="https://linkedin.com/in/Linkedin-Venu-Jangam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-space-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <Linkedin size={18} className="text-blue-600" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a href="mailto:venu.jangam@community.isunet.edu" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-space-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <Mail size={18} className="text-red-500" />
            <span className="text-sm font-medium">ISU Email</span>
          </a>
          <a href="mailto:venujangam.fr@gmail.com" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-space-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <Mail size={18} className="text-gray-700 dark:text-gray-300" />
            <span className="text-sm font-medium">Personal Email</span>
          </a>
        </motion.div>

      </main>
    </div>
  );
}

export default App;
