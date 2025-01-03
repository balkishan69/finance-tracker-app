import React, { useState } from 'react';
import { Category } from '../types';
import { useFinance } from '../context/FinanceContext';

export function BudgetSetting() {
  const { dispatch } = useFinance();
  const [category, setCategory] = useState<Category>('food');
  const [limit, setLimit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'SET_BUDGET',
      payload: {
        category,
        limit: parseFloat(limit),
      },
    });
    setLimit('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Set Budget</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="budgetCategory" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="budgetCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
            <option value="transportation">Transportation</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
            Monthly Limit ($)
          </label>
          <input
            type="number"
            id="limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
            step="0.01"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Set Budget
        </button>
      </div>
    </form>
  );
}