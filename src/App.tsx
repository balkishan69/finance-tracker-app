import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import { Dashboard } from './components/Dashboard';
import { Navbar } from './components/Navbar';
import { motion } from 'framer-motion';

export default function App() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-4 py-8"
        >
          <Dashboard />
        </motion.main>
      </div>
    </FinanceProvider>
  );
}