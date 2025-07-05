// const express = require("express");
// const dotEnv = require("dotenv");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.MY_PATH || 5000;

// dotEnv.config();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// mongoose
//   .connect(process.env.MY_MONGO_URI)
//   .then(() => console.log("Database connected"))
//   .catch((error) => console.log("Database error:", error));

// // Transaction model
// const Transaction = mongoose.model(
//   "Transaction",
//   new mongoose.Schema({
//     amount: Number,
//     date: Date,
//     description: String,
//     category: { type: String, required: true },
//   })
// );

// // Budget model
// const Budget = require("./models/Budget");

// // Transaction routes
// app.post("/transactions", async (req, res) => {
//   try {
//     const { amount, date, description, category } = req.body;
//     const transaction = new Transaction({
//       amount,
//       date,
//       description,
//       category,
//     });
//     await transaction.save();
//     res.status(201).json(transaction);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get("/transactions", async (req, res) => {
//   try {
//     const transactions = await Transaction.find().sort({ date: -1 });
//     res.json(transactions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.put("/transactions/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { amount, date, description, category } = req.body;

//     const transaction = await Transaction.findByIdAndUpdate(
//       id,
//       { amount, date, description, category },
//       { new: true }
//     );

//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     res.json(transaction);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.delete("/transactions/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const transaction = await Transaction.findByIdAndDelete(id);

//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }

//     res.json({ message: "Transaction deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Budget routes
// app.post("/budgets", async (req, res) => {
//   try {
//     const { category, amount, month } = req.body;

//     let budget = await Budget.findOne({ category, month });

//     if (budget) {
//       budget.amount = amount;
//       await budget.save();
//     } else {
//       budget = new Budget({ category, amount, month });
//       await budget.save();
//     }

//     res.json(budget);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get("/budgets", async (req, res) => {
//   try {
//     const budgets = await Budget.find().sort({ month: -1 });
//     res.json(budgets);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.delete("/budgets/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const budget = await Budget.findByIdAndDelete(id);

//     if (!budget) {
//       return res.status(404).json({ message: "Budget not found" });
//     }

//     res.json({ message: "Budget deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Home route
// app.get("/", (req, res) => {
//   res.json({ message: "Money Tracker API" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.MY_PATH || 5000;

dotEnv.config();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://finance-visualizer-bz2l.vercel.app",
      "https://finance-visualizer-yiyv.onrender.com",
      "https://finance-visualizer-c3fj.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Database connection
mongoose
  .connect(process.env.MY_MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Database connection error:", error);
    console.error("MY_MONGO_URI is set:", !!process.env.MY_MONGO_URI);
  });

// Transaction model
const Transaction = mongoose.model(
  "Transaction",
  new mongoose.Schema({
    amount: Number,
    date: Date,
    description: String,
    category: { type: String, required: true },
  })
);

// Budget model
const Budget = require("./models/Budget");

// Transaction routes
app.post("/transactions", async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const transaction = new Transaction({
      amount,
      date,
      description,
      category,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, description, category } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { amount, date, description, category },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Budget routes
app.post("/budgets", async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    let budget = await Budget.findOne({ category, month });

    if (budget) {
      budget.amount = amount;
      await budget.save();
    } else {
      budget = new Budget({ category, amount, month });
      await budget.save();
    }

    res.json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/budgets", async (req, res) => {
  try {
    const budgets = await Budget.find().sort({ month: -1 });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/budgets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findByIdAndDelete(id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json({ message: "Budget deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Money Tracker API" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

