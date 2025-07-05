import React,{useEffect,useState} from 'react';
import axios from 'axios';

const TransactionList = ({ transactions, onDelete, onEdit,fetchTransactions }) => (
  <div className="transaction-list">
    <h2>Transactions</h2>
    {transactions.length === 0 && <p>No transactions yet!</p>}
    <ul>
      {transactions.map(t => (
        <li key={t.id}>
          ₹{t.amount} - {t.description} ({new Date(t.date).toLocaleDateString()})
          <button  className="editbtn" onClick={() => onEdit(t)}>Edit</button>
          <button className="deletebtn" onClick={() => onDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

export default TransactionList;
