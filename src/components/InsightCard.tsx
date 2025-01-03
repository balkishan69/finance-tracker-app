import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export function InsightCard() {
  const { state } = useFinance();
  
  const getMonthlySpending = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    return state.transactions
      .filter(t => new Date(t.date) >= monthStart)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const monthlySpending = getMonthlySpending();
  const previousMonthlyAverage = state.transactions
    .reduce((sum, t) => sum + t.amount, 0) / 
    (state.transactions.length ? state.transactions.length : 1);

  const spendingTrend = monthlySpending - previousMonthlyAverage;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Monthly Insights</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">Current Month Spending</p>
          <p className="font-semibold dark:text-white">${monthlySpending.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center gap-2">
          {spendingTrend > 0 ? (
            <TrendingUp className="w-5 h-5 text-red-500" />
          ) : (
            <TrendingDown className="w-5 h-5 text-green-500" />
          )}
          <p className={`text-sm ${spendingTrend > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {Math.abs(spendingTrend).toFixed(2)}% {spendingTrend > 0 ? 'higher' : 'lower'} than average
          </p>
        </div>

        {spendingTrend > 20 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900 rounded-md"
          >
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-200">
              Spending is significantly higher than usual. Consider reviewing your expenses.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}