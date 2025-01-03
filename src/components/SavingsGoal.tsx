import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';

export function SavingsGoal() {
  const { state, dispatch } = useFinance();
  const [goal, setGoal] = useState('');
  const [isEditing, setIsEditing] = useState(!state.savingsGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SAVINGS_GOAL', payload: parseFloat(goal) });
    setIsEditing(false);
  };

  const totalSaved = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0) -
    state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const progress = state.savingsGoal ? (totalSaved / state.savingsGoal) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-500" />
          <h3 className="text-lg font-semibold dark:text-white">Savings Goal</h3>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            Edit Goal
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Set your savings goal
            </label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600
                       dark:bg-gray-700 dark:text-white shadow-sm focus:border-purple-500 
                       focus:ring-purple-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md 
                     hover:bg-purple-600 transition-colors"
          >
            Set Goal
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">Current Progress</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <p className="font-semibold dark:text-white">
                ${totalSaved.toFixed(2)} / ${state.savingsGoal?.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-purple-200 dark:bg-purple-900">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap 
                         text-white justify-center bg-purple-500"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}