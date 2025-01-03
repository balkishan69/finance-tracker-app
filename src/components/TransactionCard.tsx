import React from 'react';
import { Transaction } from '../types';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { getCategoryIcon } from '../utils/categoryIcons';

interface Props {
  transaction: Transaction;
  index: number;
}

export function TransactionCard({ transaction, index }: Props) {
  const Icon = getCategoryIcon(transaction.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg
                 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="font-semibold dark:text-white">{transaction.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(transaction.date), 'MMM d, yyyy')} • {transaction.category}
          </p>
        </div>
      </div>
      <motion.p 
        className="text-lg font-semibold dark:text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        ${transaction.amount.toFixed(2)}
      </motion.p>
    </motion.div>
  );
}