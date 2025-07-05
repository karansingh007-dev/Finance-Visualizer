// Frontend/src/components/BudgetList.jsx
import React from "react";

const BudgetList = ({ budgets, onDeleteBudget }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Current Budgets
      </h3>
      {budgets.length === 0 ? (
        <p className="text-gray-500">No budgets set yet</p>
      ) : (
        <div className="space-y-2">
          {budgets.map((budget) => (
            <div
              key={budget._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <div>
                <p className="font-medium">{budget.category}</p>
                <p className="text-sm text-gray-500">{budget.month}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold text-green-600">
                  ₹{budget.amount}
                </span>
                <button
                  onClick={() => onDeleteBudget(budget._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetList;
