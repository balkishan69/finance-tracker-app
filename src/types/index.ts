export type Category = 'food' | 'rent' | 'utilities' | 'entertainment' | 'transportation' | 'other';
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  type: TransactionType;
}

export interface Budget {
  category: Category;
  limit: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  achievements: Achievement[];
  streak: number;
  savingsGoal?: number;
  lastResetDate: string; // Added to track monthly resets
}