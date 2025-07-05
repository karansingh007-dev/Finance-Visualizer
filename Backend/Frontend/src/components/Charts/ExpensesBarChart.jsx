import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


const ExpensesBarChart = ({ transactions }) => {
  const monthlyData = {};

  transactions.forEach(t => {
    const month = new Date(t.date).toLocaleString('default', { month: 'short' });
    monthlyData[month] = (monthlyData[month] || 0) + t.amount;
  });

  const data = Object.entries(monthlyData).map(([month, total]) => ({ month, total }));

  return (
    <div className="chart-container">
      <h2>Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesBarChart;
