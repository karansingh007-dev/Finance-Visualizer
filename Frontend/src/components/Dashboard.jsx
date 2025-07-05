// import React, { useState, useEffect } from "react";
// import TransactionForm from "./TransactionForm";
// import EditTransactionForm from "./EditTransactionForm";
// import TransactionList from "./TransactionList";
// import BudgetForm from "./BudgetForm";
// import BudgetList from "./BudgetList";
// import ExpensesBarChart from "./Charts/ExpensesBarChart";
// import CategoryPieChart from "./Charts/CategoryPieChart";
// import BudgetComparisonChart from "./Charts/BudgetComparisonChart";
// import { transactionAPI, budgetAPI } from "../services/api";

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [budgets, setBudgets] = useState({});
//   const [editingTransaction, setEditingTransaction] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       setLoading(true);
//       const [txData, bdData] = await Promise.all([
//         transactionAPI.getAll(),
//         budgetAPI.getAll(),
//       ]);

//       setTransactions(txData);

//       const bdObj = {};
//       bdData.forEach((b) => {
//         bdObj[b.category] = b.amount;
//       });
//       setBudgets(bdObj);
//     } catch (err) {
//       setError("Failed to load data");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTransaction = async (data) => {
//     try {
//       const newTx = await transactionAPI.create(data);
//       setTransactions([...transactions, newTx]);
//     } catch (err) {
//       setError("Failed to add transaction");
//     }
//   };

//   const handleUpdateTransaction = async (data) => {
//     try {
//       const updated = await transactionAPI.update(data._id, data);
//       setTransactions((prev) =>
//         prev.map((tx) => (tx._id === data._id ? updated : tx))
//       );
//       setEditingTransaction(null);
//     } catch {
//       setError("Failed to update transaction");
//     }
//   };

//   const handleDeleteTransaction = async (id) => {
//     try {
//       await transactionAPI.delete(id);
//       setTransactions((prev) => prev.filter((tx) => tx._id !== id));
//     } catch {
//       setError("Failed to delete transaction");
//     }
//   };

//   const handleSaveBudget = async (budget) => {
//     try {
//       await budgetAPI.createOrUpdate(budget);
//       setBudgets((prev) => ({ ...prev, [budget.category]: budget.amount }));
//     } catch {
//       setError("Failed to save budget");
//     }
//   };

//   const handleDeleteBudget = (category) => {
//     setBudgets((prev) => {
//       const copy = { ...prev };
//       delete copy[category];
//       return copy;
//     });
//   };

//   const totalExpenses = transactions.reduce((sum, t) => sum + t.amount, 0);

//   const categoryBreakdown = transactions.reduce((acc, t) => {
//     acc[t.category] = (acc[t.category] || 0) + t.amount;
//     return acc;
//   }, {});

//   const recentTransactions = [...transactions]
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 5);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center flex-col gap-4">
//         <p className="text-red-600">{error}</p>
//         <button
//           onClick={loadData}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   const budgetArray = Object.entries(budgets).map(([category, amount]) => ({
//     category,
//     amount,
//     _id: category,
//   }));

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         Money Tracker
//       </h1>

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-3 gap-6 mb-6">
//         <SummaryCard
//           label="Total Spent"
//           value={`₹${totalExpenses.toFixed(2)}`}
//           color="text-red-600"
//         />
//         <SummaryCard
//           label="Categories"
//           value={Object.keys(categoryBreakdown).length}
//           color="text-green-600"
//         />
//         <SummaryCard
//           label="Transactions"
//           value={transactions.length}
//           color="text-blue-600"
//         />
//       </div>

//       {/* Budget Section */}
//       <div className="grid md:grid-cols-2 gap-6 mb-6">
//         <BudgetForm
//           onSaveBudget={handleSaveBudget}
//           existingBudgets={budgetArray}
//         />
//         <BudgetList budgets={budgetArray} onDeleteBudget={handleDeleteBudget} />
//       </div>

//       {/* Transaction Form */}
//       <div className="bg-white p-6 rounded-lg shadow mb-6">
//         {editingTransaction ? (
//           <EditTransactionForm
//             onEdit={handleUpdateTransaction}
//             editingTransaction={editingTransaction}
//             onCancel={() => setEditingTransaction(null)}
//           />
//         ) : (
//           <TransactionForm onAdd={handleAddTransaction} />
//         )}
//       </div>

//       {/* Transactions and Recent */}
//       <div className="grid md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <TransactionList
//             transactions={transactions}
//             onDelete={handleDeleteTransaction}
//             onEdit={setEditingTransaction}
//           />
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
//           <div className="space-y-2">
//             {recentTransactions.map((t) => (
//               <div
//                 key={t._id}
//                 className="flex justify-between items-center bg-gray-50 p-2 rounded"
//               >
//                 <div>
//                   <p className="font-medium">{t.description}</p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(t.date).toLocaleDateString()}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <p className="font-bold text-red-600">₹{t.amount}</p>
//                   <p className="text-xs text-gray-500">{t.category}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid md:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <ExpensesBarChart transactions={transactions} />
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow">
//           <CategoryPieChart transactions={transactions} />
//         </div>
//       </div>

//       {/* Budget vs Expenses Chart */}
//       <div className="bg-white p-6 rounded-lg shadow">
//         <BudgetComparisonChart
//           budgets={budgetArray}
//           transactions={transactions}
//         />
//       </div>
//     </div>
//   );
// };

// const SummaryCard = ({ label, value, color }) => (
//   <div className="bg-white p-6 rounded-lg shadow text-center">
//     <h3 className="text-lg font-semibold text-gray-800 mb-2">{label}</h3>
//     <p className={`text-3xl font-bold ${color}`}>{value}</p>
//   </div>
// );

// export default Dashboard;
//   import React, { useState, useEffect } from "react";
// import TransactionForm from "./TransactionForm";
// import EditTransactionForm from "./EditTransactionForm";
// import TransactionList from "./TransactionList";
// import BudgetForm from "./BudgetForm";
// import BudgetList from "./BudgetList";
// import ExpensesBarChart from "./Charts/ExpensesBarChart";
// import CategoryPieChart from "./Charts/CategoryPieChart";
// import BudgetComparisonChart from "./Charts/BudgetComparisonChart";
// import { transactionAPI, budgetAPI } from "../services/api";

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [budgets, setBudgets] = useState({});
//   const [editing, setEditing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Load transactions and budgets from API
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const txData = await transactionAPI.getAll();
//         const budgetData = await budgetAPI.getAll();

//         setTransactions(txData);

//         const budgetObj = {};
//         budgetData.forEach((b) => {
//           budgetObj[b.category] = b.amount;
//         });
//         setBudgets(budgetObj);
//       } catch (err) {
//         setError("Could not load data.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   // Add transaction
//   const addTransaction = async (data) => {
//     const newTx = await transactionAPI.create(data);
//     setTransactions([...transactions, newTx]);
//   };

//   // Update transaction
//   const updateTransaction = async (data) => {
//     const updated = await transactionAPI.update(data._id, data);
//     setTransactions(
//       transactions.map((t) => (t._id === data._id ? updated : t))
//     );
//     setEditing(null);
//   };

//   // Delete transaction
//   const deleteTransaction = async (id) => {
//     await transactionAPI.delete(id);
//     setTransactions(transactions.filter((t) => t._id !== id));
//   };

//   // Save budget
//   const saveBudget = async (b) => {
//     await budgetAPI.createOrUpdate(b);
//     setBudgets({ ...budgets, [b.category]: b.amount });
//   };

//   // Delete budget
//   const deleteBudget = (category) => {
//     const copy = { ...budgets };
//     delete copy[category];
//     setBudgets(copy);
//   };

//   const total = transactions.reduce((sum, t) => sum + t.amount, 0);
//   const categories = transactions.reduce((acc, t) => {
//     acc[t.category] = (acc[t.category] || 0) + t.amount;
//     return acc;
//   }, {});
//   const recent = [...transactions]
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 5);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
//   if (error)
//     return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

//   const budgetList = Object.entries(budgets).map(([category, amount]) => ({
//     category,
//     amount,
//     _id: category,
//   }));

//   return (
//     <div style={{ padding: "20px", maxWidth: "1100px", margin: "auto" }}>
//       <h1 style={{ textAlign: "center" }}>Money Tracker</h1>

//       {/* Summary */}
//       <div style={{ display: "flex", gap: "20px", margin: "20px 0" }}>
//         <Box title="Total Spent" value={`₹${total}`} color="red" />
//         <Box
//           title="Categories"
//           value={Object.keys(categories).length}
//           color="green"
//         />
//         <Box title="Transactions" value={transactions.length} color="blue" />
//       </div>

//       {/* Budget */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <BudgetForm onSaveBudget={saveBudget} existingBudgets={budgetList} />
//         <BudgetList budgets={budgetList} onDeleteBudget={deleteBudget} />
//       </div>

//       {/* Transaction Form */}
//       <div
//         style={{ background: "white", padding: "20px", marginBottom: "20px" }}
//       >
//         {editing ? (
//           <EditTransactionForm
//             editingTransaction={editing}
//             onEdit={updateTransaction}
//             onCancel={() => setEditing(null)}
//           />
//         ) : (
//           <TransactionForm onAdd={addTransaction} />
//         )}
//       </div>

//       {/* Transaction List & Recent */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <TransactionList
//           transactions={transactions}
//           onDelete={deleteTransaction}
//           onEdit={setEditing}
//         />
//         <div style={{ flex: 1, background: "#f9f9f9", padding: "20px" }}>
//           <h3>Recent Transactions</h3>
//           {recent.map((t) => (
//             <div key={t._id} style={{ marginBottom: "10px" }}>
//               <strong>{t.description}</strong> - ₹{t.amount} ({t.category})
//               <br />
//               <small>{new Date(t.date).toLocaleDateString()}</small>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Charts */}
//       <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
//         <ExpensesBarChart transactions={transactions} />
//         <CategoryPieChart transactions={transactions} />
//       </div>

//       <BudgetComparisonChart budgets={budgetList} transactions={transactions} />
//     </div>
//   );
// };

// // Simple box for summary display
// const Box = ({ title, value, color }) => (
//   <div
//     style={{
//       flex: 1,
//       padding: "10px",
//       background: "white",
//       textAlign: "center",
//     }}
//   >
//     <h4>{title}</h4>
//     <p style={{ fontSize: "24px", color }}>{value}</p>
//   </div>
// );

// export default Dashboard;
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

  useEffect(() => {
    async function fetchData() {
      try {
        const tx = await transactionAPI.getAll();
        const bd = await budgetAPI.getAll();

        setTransactions(tx);

        const budgetObj = {};
        bd.forEach((b) => {
          budgetObj[b.category] = b.amount;
        });
        setBudgets(budgetObj);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const addTransaction = async (data) => {
    const newTx = await transactionAPI.create(data);
    setTransactions([...transactions, newTx]);
  };

  const updateTransaction = async (data) => {
    const updated = await transactionAPI.update(data._id, data);
    setTransactions(transactions.map((t) => (t._id === data._id ? updated : t)));
    setEditing(null);
  };

  const deleteTransaction = async (id) => {
    await transactionAPI.delete(id);
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  const saveBudget = async (b) => {
    await budgetAPI.createOrUpdate(b);
    setBudgets({ ...budgets, [b.category]: b.amount });
  };

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

  const budgetList = Object.entries(budgets).map(([category, amount]) => ({
    category,
    amount,
    _id: category,
  }));

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-blue-600">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Money Tracker
      </h1>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <SummaryCard title="Total Spent" value={`₹${total}`} color="text-red-600" />
        <SummaryCard title="Categories" value={Object.keys(categories).length} color="text-green-600" />
        <SummaryCard title="Transactions" value={transactions.length} color="text-blue-600" />
      </div>

      {/* Budget Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <BudgetForm onSaveBudget={saveBudget} existingBudgets={budgetList} />
        <BudgetList budgets={budgetList} onDeleteBudget={deleteBudget} />
      </div>

      {/* Transaction Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
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

      {/* Transaction List and Recent */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
            onEdit={setEditing}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {recent.map((t) => (
              <div
                key={t._id}
                className="flex justify-between items-center bg-gray-100 p-3 rounded"
              >
                <div>
                  <p className="font-medium">{t.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-semibold">₹{t.amount}</p>
                  <p className="text-xs text-gray-500">{t.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <ExpensesBarChart transactions={transactions} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <CategoryPieChart transactions={transactions} />
        </div>
      </div>

      {/* Budget Comparison Chart */}
      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <BudgetComparisonChart budgets={budgetList} transactions={transactions} />
      </div>
    </div>
  );
};

// Summary Card Component
const SummaryCard = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center">
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Dashboard;

