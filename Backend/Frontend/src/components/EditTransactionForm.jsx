import React, { useState, useEffect } from 'react';
import { categories } from '../utils/categories';


const EditTransactionForm = ({ onEdit, editingTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Food');

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setDescription(editingTransaction.description);
      setDate(editingTransaction.date);
      setCategory(editingTransaction.category);
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ amount: parseFloat(amount), description, date, category, id: editingTransaction.id });
  };

  return (
  <>
    <h2>Edit Transaction</h2>
    <form onSubmit={handleSubmit} className="transaction-form">
      
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
     
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => <option key={cat}>{cat}</option>)}
            </select>
      <button className= 'button' type="submit">Update Transaction</button>
      <button className= 'cancelbtn' type="submit">Cancel</button>
    </form>
    </>
  );
};

export default EditTransactionForm;