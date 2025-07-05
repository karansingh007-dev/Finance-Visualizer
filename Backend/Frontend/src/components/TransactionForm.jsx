import React, { useState, useEffect } from "react";
import { categories } from "../utils/categories";
import axios from "axios";

const TransactionForm = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Food");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date) {
      alert("Amount and Date are required!");
      return;
    }
    onAdd({ amount: parseFloat(amount), description, date, category });
    setAmount("");
    setDescription("");
    setDate("");
    setCategory("Food");
  };

  return (
    <>
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button className="button " type="submit">
          Add Transaction
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
