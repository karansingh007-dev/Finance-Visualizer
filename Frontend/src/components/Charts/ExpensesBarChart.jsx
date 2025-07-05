import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpensesBarChart = ({ transactions = [] }) => {
  // Safety check for empty or invalid data
  if (!transactions || transactions.length === 0) {
    return (
      <div className="chart-container">
        <h2>Monthly Spending</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const monthlyData = {};

  transactions.forEach((t) => {
    if (t.date && t.amount) {
      const month = new Date(t.date).toLocaleString("default", {
        month: "short",
      });
      monthlyData[month] = (monthlyData[month] || 0) + t.amount;
    }
  });

  const data = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total,
  }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Monthly Spending</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No valid data
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Monthly Spending</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesBarChart;
