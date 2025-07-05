import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import ExpensesBarChart from "./Charts/ExpensesBarChart";
import CategoryPieChart from "./Charts/CategoryPieChart";
import BudgetComparisonChart from "./Charts/BudgetComparisonChart";
import EditTransactionForm from "./EditTransactionForm";
import MonthlySpendingLineChart from "./Charts/MonthlySpendingLineChart";
import CategoryRadarChart from "./Charts/CategoryRadarChart";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [budgets, setBudgets] = useState({
    Food: 500,
    Transportation: 300,
    Entertainment: 200,
    Utilities: 400,
    Shopping: 300,
    Healthcare: 250,
    Other: 150,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) {
      setTransactions(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: uuidv4() }]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
    setEditingTransaction(null);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <div className="max-w-6xl mx-auto px-4 py-8 box-shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
          📊 Personal Finance Visualizer
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          {editingTransaction ? (
            <EditTransactionForm
              onEdit={updateTransaction}
              editingTransaction={editingTransaction}
              onCancel={() => setEditingTransaction(null)}
            />
          ) : (
            <TransactionForm onAdd={addTransaction} />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ExpensesBarChart transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CategoryPieChart transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <BudgetComparisonChart
              budgets={budgets}
              transactions={transactions}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MonthlySpendingLineChart transactions={transactions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CategoryRadarChart budgets={budgets} transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
