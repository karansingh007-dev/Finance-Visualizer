# Budget Website - Personal Finance Visualizer

A full-stack web application for tracking personal finances with beautiful visualizations and budget management. Built with React frontend and Node.js backend with MongoDB database.

## 🚀 Features

- 💰 **Transaction Management**: Add, edit, and delete transactions with categories
- 📊 **Interactive Charts**: Multiple chart types for spending analysis
  - Monthly spending line charts
  - Category pie charts
  - Budget comparison charts
  - Expenses bar charts
  - Category radar charts
- 🎯 **Budget Tracking**: Set and monitor budgets by category
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Real-time Updates**: Instant data synchronization between frontend and backend
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React with hooks and modern features
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Beautiful and composable charting library
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing
- **UUID** - Unique identifier generation

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing
- **Dotenv** - Environment variable management
- **Nodemon** - Development server with auto-restart

## 📋 Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 16.20.1 or higher)
2. **MongoDB** installed and running locally
3. **npm** or **yarn** package manager

## 🚀 Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd budget-website
   ```

2. **Install backend dependencies**:

   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**:
   ```bash
   cd ../Frontend
   npm install
   ```

## ⚙️ Configuration

### Backend Environment Setup

Create a `.env` file in the `Backend` directory with the following content:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URL

**Note**:

- Make sure MongoDB is running on your local machine
- If you're using a different MongoDB setup (like MongoDB Atlas), update the `MONGO_URI` accordingly
- The database will be created automatically when you first run the application

## 🏃‍♂️ Running the Application

### Option 1: Manual Setup (Recommended for Development)

1. **Start the Backend Server**:

   ```bash
   cd Backend
   npm start
   ```

   The backend will run on `http://localhost:5000`

2. **Start the Frontend Server** (in a new terminal):
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Option 2: Development Script

If you have a development script, you can run both servers simultaneously from the root directory.

## 📡 API Endpoints

### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

### Budgets

- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create or update a budget

## 🎯 Usage Guide

### Adding Transactions

1. Navigate to the main dashboard
2. Use the transaction form at the top
3. Fill in:
   - **Amount**: The transaction amount
   - **Description**: Brief description of the transaction
   - **Date**: When the transaction occurred
   - **Category**: Select from predefined categories
4. Click "Add Transaction"

### Managing Transactions

- **View**: All transactions are displayed in a list below the form
- **Edit**: Click the "Edit" button next to any transaction to modify it
- **Delete**: Click the "Delete" button to remove transactions

### Budget Management

- Set monthly budgets for different categories
- Track spending against budgets
- View budget vs actual spending in charts

### Data Visualization

- **Monthly Spending Chart**: Track spending trends over time
- **Category Pie Chart**: See spending distribution by category
- **Budget Comparison**: Compare actual spending vs budget
- **Expenses Bar Chart**: Visualize expenses by category
- **Category Radar Chart**: Multi-dimensional category analysis

## 🏗️ Project Structure

```
budget-website/
├── Backend/
│   ├── index.js              # Main server file
│   ├── models/
│   │   └── Budget.js         # MongoDB budget model
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables (create this)
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts/       # Chart components
│   │   │   │   ├── BudgetComparisonChart.jsx
│   │   │   │   ├── CategoryPieChart.jsx
│   │   │   │   ├── CategoryRadarChart.jsx
│   │   │   │   ├── ExpensesBarChart.jsx
│   │   │   │   └── MonthlySpendingLineChart.jsx
│   │   │   ├── BudgetForm.jsx
│   │   │   ├── BudgetList.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditTransactionForm.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── TransactionForm.jsx
│   │   │   └── TransactionList.jsx
│   │   ├── services/
│   │   │   └── api.js        # API service functions
│   │   ├── utils/
│   │   │   └── categories.js # Category definitions
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # App entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:

   - Ensure MongoDB is running: `mongod`
   - Check if the connection string in `.env` is correct
   - Verify MongoDB is installed and accessible

2. **Port Already in Use**:

   - Backend: Change `PORT` in `.env` file
   - Frontend: Vite will automatically suggest an alternative port

3. **CORS Errors**:

   - The backend is configured with CORS enabled
   - If issues persist, check that the frontend is making requests to the correct backend URL
   - Verify the API base URL in `Frontend/src/services/api.js`

4. **Module Not Found Errors**:

   - Run `npm install` in both `Backend` and `Frontend` directories
   - Clear node_modules and reinstall if necessary:
     ```bash
     rm -rf node_modules package-lock.json
     npm install
     ```

5. **Build Errors**:
   - Ensure all dependencies are installed
   - Check for syntax errors in React components
   - Verify import statements are correct

### Development Tips

- The frontend automatically reloads when you make changes (hot reload)
- The backend uses nodemon for automatic restart on file changes
- Check the browser console and terminal for error messages
- Use the browser's Network tab to debug API calls
- MongoDB Compass can be helpful for database debugging

## 🚀 Deployment

### Frontend Deployment

```bash
cd Frontend
npm run build
```

The built files will be in the `dist` folder, ready for deployment to any static hosting service.

### Backend Deployment

- Deploy to platforms like Heroku, Railway, or Vercel
- Set up environment variables on your hosting platform
- Ensure MongoDB is accessible (use MongoDB Atlas for cloud deployment)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Karan** - _Initial work_

---

⭐ If you find this project helpful, please give it a star!




