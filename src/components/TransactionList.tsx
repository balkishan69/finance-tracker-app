import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { format } from 'date-fns';

export function TransactionList() {
  const { state } = useFinance();
  const { transactions } = state;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          transactions.slice().reverse().map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-semibold">{transaction.description}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(transaction.date), 'MMM d, yyyy')} • {transaction.category}
                </p>
              </div>
              <p className="text-lg font-semibold">${transaction.amount.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}