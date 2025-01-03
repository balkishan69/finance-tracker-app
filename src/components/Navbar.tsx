import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 shadow-lg backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 
                 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Wallet className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Finance Tracker</h1>
        </motion.div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:shadow-lg 
                   transform transition-all duration-300 ease-in-out
                   hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-yellow-500" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}