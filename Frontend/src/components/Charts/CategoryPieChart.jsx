import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
];

const CategoryPieChart = ({ transactions = [] }) => {
  // Safety check for empty or invalid data
  if (!transactions || transactions.length === 0) {
    return (
      <div className="chart-container">
        <h2>Category Breakdown</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const categoryData = {};

  transactions.forEach((t) => {
    if (t.category && t.amount) {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    }
  });

  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Category Breakdown</h2>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No valid data
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h2>Category Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
