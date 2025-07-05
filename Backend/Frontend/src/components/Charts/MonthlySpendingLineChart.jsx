import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MonthlySpendingLineChart = ({ transactions }) => {
  const dailyTotals = {};

  transactions.forEach((t) => {
    const day = new Date(t.date).toLocaleDateString("default", {
      day: "numeric",
      month: "short",
    });
    dailyTotals[day] = (dailyTotals[day] || 0) + t.amount;
  });

  const data = Object.entries(dailyTotals).map(([date, amount]) => ({
    date,
    amount,
  }));

  return (
    <div className="chart-container">
      <h2 className="text-lg font-semibold mb-4">Spending Over the Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySpendingLineChart;
// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const MonthlySpendingLineChart = ({ transactions }) => {
//   const dailyTotals = {};

//   transactions.forEach((t) => {
//     const day = new Date(t.date).toLocaleDateString("default", {
//       day: "numeric",
//       month: "short",
//     });
//     dailyTotals[day] = (dailyTotals[day] || 0) + t.amount;
//   });

//   const data = Object.entries(dailyTotals).map(([date, amount]) => ({
//     date,
//     amount,
//   }));

//   return (
//     <div className="chart-container">
//       <h2 className="text-lg font-semibold mb-4">Spending Over the Month</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="amount"
//             stroke="#8884d8"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default MonthlySpendingLineChart;
