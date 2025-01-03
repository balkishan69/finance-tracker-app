import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Category } from '../types';

export function BudgetProgress() {
  const { state } = useFinance();
  const { transactions, budgets } = state;

  const getCategoryTotal = (category: Category) => {
    return transactions
      .filter((t) => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Budget Progress</h3>
      <div className="space-y-4">
        {budgets.map((budget) => {
          const spent = getCategoryTotal(budget.category);
          const percentage = (spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;

          return (
            <div key={budget.category} className="space-y-2">
              <div className="flex justify-between">
                <p className="capitalize">{budget.category}</p>
                <p className={isOverBudget ? 'text-red-500 font-semibold' : ''}>
                  ${spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    isOverBudget ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
        {budgets.length === 0 && (
          <p className="text-gray-500">No budgets set yet</p>
        )}
      </div>
    </div>
  );
}