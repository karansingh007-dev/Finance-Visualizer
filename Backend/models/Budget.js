// models/Budget.js
const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // Example: '2025-04'
    required: true,
  },
});

module.exports = mongoose.model('Budget', BudgetSchema);
