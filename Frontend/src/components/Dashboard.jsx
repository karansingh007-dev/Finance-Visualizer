
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
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load transactions and budgets from API
  useEffect(() => {
    async function fetchData() {
      try {
        const txData = await transactionAPI.getAll();
        const budgetData = await budgetAPI.getAll();

        setTransactions(txData);

        const budgetObj = {};
        budgetData.forEach((b) => {
          budgetObj[b.category] = b.amount;
        });
        setBudgets(budgetObj);
      } catch (err) {
        setError("Could not load data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Add transaction
  const addTransaction = async (data) => {
    const newTx = await transactionAPI.create(data);
    setTransactions([...transactions, newTx]);
  };

  // Update transaction
  const updateTransaction = async (data) => {
    const updated = await transactionAPI.update(data._id, data);
    setTransactions(
      transactions.map((t) => (t._id === data._id ? updated : t))
    );
    setEditing(null);
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    await transactionAPI.delete(id);
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  // Save budget
  const saveBudget = async (b) => {
    await budgetAPI.createOrUpdate(b);
    setBudgets({ ...budgets, [b.category]: b.amount });
  };

  // Delete budget
  const deleteBudget = (category) => {
    const copy = { ...budgets };
    delete copy[category];
    setBudgets(copy);
  };

  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  const categories = transactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  const budgetList = Object.entries(budgets).map(([category, amount]) => ({
    category,
    amount,
    _id: category,
  }));

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Money Tracker</h1>

      {/* Summary */}
      <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
        <Box title="Total Spent" value={`₹${total}`} color="red" />
        <Box
          title="Categories"
          value={Object.keys(categories).length}
          color="green"
        />
        <Box title="Transactions" value={transactions.length} color="blue" />
      </div>

      {/* Budget */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <BudgetForm onSaveBudget={saveBudget} existingBudgets={budgetList} />
        <BudgetList budgets={budgetList} onDeleteBudget={deleteBudget} />
      </div>

      {/* Transaction Form */}
      <div
        style={{ background: "white", padding: "20px", marginBottom: "20px" }}
      >
        {editing ? (
          <EditTransactionForm
            editingTransaction={editing}
            onEdit={updateTransaction}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <TransactionForm onAdd={addTransaction} />
        )}
      </div>

      {/* Transaction List & Recent */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={setEditing}
        />
        <div style={{ flex: 1, background: "#f9f9f9", padding: "20px" }}>
          <h3>Recent Transactions</h3>
          {recent.map((t) => (
            <div key={t._id} style={{ marginBottom: "10px" }}>
              <strong>{t.description}</strong> - ₹{t.amount} ({t.category})
              <br />
              <small>{new Date(t.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <ExpensesBarChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>

      <BudgetComparisonChart budgets={budgetList} transactions={transactions} />
    </div>
  );
};

// Simple box for summary display
const Box = ({ title, value, color }) => (
  <div
    style={{
      flex: 1,
      padding: "10px",
      background: "white",
      textAlign: "center",
    }}
  >
    <h4>{title}</h4>
    <p style={{ fontSize: "24px", color }}>{value}</p>
  </div>
);

export default Dashboard;

