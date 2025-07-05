import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BudgetComparisonChart = ({ budgets = [], transactions = [] }) => {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="chart-container">
        <h2>Budget vs Actual</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No budget data
        </div>
      </div>
    );
  }

  const actuals = {};

  transactions.forEach((t) => {
    if (t.category && t.amount) {
      actuals[t.category] = (actuals[t.category] || 0) + t.amount;
    }
  });

  const data = budgets.map((budget) => ({
    category: budget.category,
    Budget: budget.amount,
    Actual: actuals[budget.category] || 0,
  }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Budget vs Actual</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No valid data
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#3b82f6" />
          <Bar dataKey="Actual" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonChart;
