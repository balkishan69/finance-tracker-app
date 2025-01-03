import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Transaction, Budget, Achievement, FinanceState } from '../types';
import { isFirstDayOfMonth, startOfMonth, isSameMonth } from 'date-fns';

type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_BUDGET'; payload: Budget }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'UPDATE_STREAK'; payload: number }
  | { type: 'SET_SAVINGS_GOAL'; payload: number }
  | { type: 'RESET_MONTHLY_DATA' }
  | { type: 'LOAD_SAVED_STATE'; payload: Partial<FinanceState> };

type FinanceContextType = {
  state: FinanceState;
  dispatch: React.Dispatch<Action>;
};

const initialState: FinanceState = {
  transactions: [],
  budgets: [],
  achievements: [
    {
      id: 'first-save',
      title: 'First Save',
      description: 'Made your first transaction',
      icon: '🌟',
      unlocked: false,
    },
    {
      id: 'budget-master',
      title: 'Budget Master',
      description: 'Stayed under budget for a month',
      icon: '👑',
      unlocked: false,
    },
  ],
  streak: 0,
  lastResetDate: startOfMonth(new Date()).toISOString(),
};

const FinanceContext = createContext<FinanceContextType>({
  state: initialState,
  dispatch: () => null,
});

function financeReducer(state: FinanceState, action: Action): FinanceState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budgets: [...state.budgets.filter(b => b.category !== action.payload.category), action.payload],
      };
    case 'UNLOCK_ACHIEVEMENT':
      return {
        ...state,
        achievements: state.achievements.map(a =>
          a.id === action.payload ? { ...a, unlocked: true } : a
        ),
      };
    case 'UPDATE_STREAK':
      return {
        ...state,
        streak: action.payload,
      };
    case 'SET_SAVINGS_GOAL':
      return {
        ...state,
        savingsGoal: action.payload,
      };
    case 'RESET_MONTHLY_DATA':
      return {
        ...state,
        transactions: [],
        budgets: [],
        lastResetDate: startOfMonth(new Date()).toISOString(),
      };
    case 'LOAD_SAVED_STATE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  // Load saved state on initial mount
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedState = localStorage.getItem('financeState');
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          const lastResetDate = new Date(parsedState.lastResetDate);
          const currentMonth = startOfMonth(new Date());

          // Check if we need to reset monthly data
          if (!isSameMonth(lastResetDate, currentMonth)) {
            dispatch({ type: 'RESET_MONTHLY_DATA' });
          } else {
            dispatch({ type: 'LOAD_SAVED_STATE', payload: parsedState });
          }
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    };

    loadSavedState();
  }, []);

  // Save state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('financeState', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }, [state]);

  // Check for monthly reset
  useEffect(() => {
    const checkMonthlyReset = () => {
      const lastReset = new Date(state.lastResetDate);
      const currentMonth = startOfMonth(new Date());

      if (!isSameMonth(lastReset, currentMonth)) {
        dispatch({ type: 'RESET_MONTHLY_DATA' });
      }
    };

    // Check on mount and set up daily check
    checkMonthlyReset();
    const interval = setInterval(checkMonthlyReset, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [state.lastResetDate]);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);