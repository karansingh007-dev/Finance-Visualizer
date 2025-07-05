import React, { useState, useEffect } from "react";
import TransactionForm from "./TransactionForm";
import EditTransactionForm from "./EditTransactionForm";
import TransactionList from "./TransactionList";
import BudgetForm from "./BudgetForm";
import BudgetList from "./BudgetList";
import ExpensesBarChart from "./Charts/ExpensesBarChart";
import CategoryPieChart from "./Charts/CategoryPieChart";
import BudgetComparisonChart from "./Charts/BudgetComparisonChart";
import { transactionAPI, budgetAPI } from "../services/api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [txData, bdData] = await Promise.all([
        transactionAPI.getAll(),
        budgetAPI.getAll(),
      ]);

      setTransactions(txData);

      const bdObj = {};
      bdData.forEach((b) => {
        bdObj[b.category] = b.amount;
      });
      setBudgets(bdObj);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (data) => {
    try {
      const newTx = await transactionAPI.create(data);
      setTransactions([...transactions, newTx]);
    } catch (err) {
      setError("Failed to add transaction");
    }
  };

  const handleUpdateTransaction = async (data) => {
    try {
      const updated = await transactionAPI.update(data._id, data);
      setTransactions((prev) =>
        prev.map((tx) => (tx._id === data._id ? updated : tx))
      );
      setEditingTransaction(null);
    } catch {
      setError("Failed to update transaction");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch {
      setError("Failed to delete transaction");
    }
  };

  const handleSaveBudget = async (budget) => {
    try {
      await budgetAPI.createOrUpdate(budget);
      setBudgets((prev) => ({ ...prev, [budget.category]: budget.amount }));
    } catch {
      setError("Failed to save budget");
    }
  };

  const handleDeleteBudget = (category) => {
    setBudgets((prev) => {
      const copy = { ...prev };
      delete copy[category];
      return copy;
    });
  };

  const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  const budgetArray = Object.entries(budgets).map(([category, amount]) => ({
    category,
    amount,
    _id: category,
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Money Tracker
      </h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <SummaryCard
          label="Total Spent"
          value={`₹${totalExpenses.toFixed(2)}`}
          color="text-red-600"
        />
        <SummaryCard
          label="Categories"
          value={Object.keys(categoryBreakdown).length}
          color="text-green-600"
        />
        <SummaryCard
          label="Transactions"
          value={transactions.length}
          color="text-blue-600"
        />
      </div>

      {/* Budget Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <BudgetForm
          onSaveBudget={handleSaveBudget}
          existingBudgets={budgetArray}
        />
        <BudgetList budgets={budgetArray} onDeleteBudget={handleDeleteBudget} />
      </div>

      {/* Transaction Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        {editingTransaction ? (
          <EditTransactionForm
            onEdit={handleUpdateTransaction}
            editingTransaction={editingTransaction}
            onCancel={() => setEditingTransaction(null)}
          />
        ) : (
          <TransactionForm onAdd={handleAddTransaction} />
        )}
      </div>

      {/* Transactions and Recent */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
            onEdit={setEditingTransaction}
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-2">
            {recentTransactions.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded"
              >
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">₹{t.amount}</p>
                  <p className="text-xs text-gray-500">{t.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <ExpensesBarChart transactions={transactions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

      {/* Budget vs Expenses Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <BudgetComparisonChart
          budgets={budgetArray}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{label}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Dashboard;
  