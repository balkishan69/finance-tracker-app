import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Wallet, Trophy, Flame } from 'lucide-react';
import { AddTransaction } from './AddTransaction';
import { BudgetSetting } from './BudgetSetting';
import { TransactionList } from './TransactionList';
import { BudgetProgress } from './BudgetProgress';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  const { state } = useFinance();
  const { transactions, achievements, streak } = state;

  const chartData = {
    labels: transactions.slice(-7).map(t => new Date(t.date).toLocaleDateString()),
    datasets: [{
      label: 'Spending',
      data: transactions.slice(-7).map(t => t.amount),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Wallet className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Total Spent</h3>
              <p className="text-2xl font-bold">
                ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold">Achievements</h3>
              <p className="text-2xl font-bold">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Flame className="w-8 h-8 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold">Saving Streak</h3>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AddTransaction />
        <BudgetSetting />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Spending Trend</h3>
          <Line data={chartData} />
        </div>
        <BudgetProgress />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TransactionList />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}