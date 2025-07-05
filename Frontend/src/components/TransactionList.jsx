import React from "react";

const TransactionList = ({ transactions, onDelete, onEdit }) => (
  <div className="transaction-list">
    <h2 className="text-xl font-semibold mb-4">Transactions</h2>
    {transactions.length === 0 && (
      <p className="text-gray-500 text-center py-4">No transactions yet!</p>
    )}
    <div className="space-y-2">
      {transactions.map((t) => (
        <div
          key={t._id}
          className="flex justify-between items-center p-3 bg-gray-50 rounded"
        >
          <div>
            <span className="font-semibold text-red-600">₹{t.amount}</span>
            <span className="ml-2">{t.description}</span>
            <span className="text-sm text-gray-500 ml-2">
              ({new Date(t.date).toLocaleDateString()})
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
              {t.category}
            </span>
          </div>
          <div className="space-x-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              onClick={() => onEdit(t)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              onClick={() => onDelete(t._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TransactionList;
