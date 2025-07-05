// import React from "react";
// import {
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   Radar,
//   Legend,
//   ResponsiveContainer,
//   Tooltip,
// } from "recharts";

// const CategoryRadarChart = ({ transactions, budgets }) => {
//   const actuals = {};

//   transactions.forEach((t) => {
//     actuals[t.category] = (actuals[t.category] || 0) + t.amount;
//   });

//   const data = Object.keys(budgets).map((cat) => ({
//     category: cat,
//     Budget: budgets[cat],
//     Actual: actuals[cat] || 0,
//   }));

//   return (
//     <div className="chart-container">
//       <h2 className="text-lg font-semibold mb-4">Budget vs Actual (Radar)</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <RadarChart outerRadius={150} data={data}>
//           <PolarGrid />
//           <PolarAngleAxis dataKey="category" />
//           <Tooltip />
//           <Radar
//             name="Budget"
//             dataKey="Budget"
//             stroke="#8884d8"
//             fill="#8884d8"
//             fillOpacity={0.6}
//           />
//           <Radar
//             name="Actual"
//             dataKey="Actual"
//             stroke="#82ca9d"
//             fill="#82ca9d"
//             fillOpacity={0.6}
//           />
//           <Legend />
//         </RadarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CategoryRadarChart;
import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CategoryRadarChart = ({ transactions, budgets }) => {
  const actuals = {};

  transactions.forEach((t) => {
    actuals[t.category] = (actuals[t.category] || 0) + t.amount;
  });

  const data = Object.keys(budgets).map((cat) => ({
    category: cat,
    Budget: budgets[cat],
    Actual: actuals[cat] || 0,
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        🧭 Budget vs Actual (Radar)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={data}>
          <PolarGrid />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: "#334155" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              borderRadius: 8,
              color: "#fff",
            }}
          />
          <Radar
            name="Budget"
            dataKey="Budget"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.5}
          />
          <Radar
            name="Actual"
            dataKey="Actual"
            stroke="#f59e0b"
            fill="#fbbf24"
            fillOpacity={0.5}
          />
          <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: 12 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryRadarChart;
