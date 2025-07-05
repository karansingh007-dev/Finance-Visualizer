# Budget Website - Personal Finance Visualizer

A full-stack web application for tracking personal finances with beautiful visualizations and budget management.

## Features

- 💰 **Transaction Management**: Add, edit, and delete transactions
- 📊 **Interactive Charts**: Multiple chart types for spending analysis
- 🎯 **Budget Tracking**: Set and monitor budgets by category
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔄 **Real-time Updates**: Instant data synchronization

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Recharts (for data visualization)
- Axios (for API calls)

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 16 or higher)
2. **MongoDB** installed and running locally
3. **npm** or **yarn** package manager

## Installation

1. **Clone the repository** (if not already done):

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

## Configuration

### Backend Environment Setup

Create a `.env` file in the `Backend` directory with the following content:

```env
PORT=5000
MONGO_URI=YOUr_MONGODB_URL
```

**Note**: Make sure MongoDB is running on your local machine. If you're using a different MongoDB setup, update the `MONGO_URI` accordingly.

## Running the Application

### Option 1: Using the Development Script (Recommended)

From the root directory, run:

```bash
node start-dev.js
```

This will start both the backend (port 5000) and frontend (port 5173) servers simultaneously.

### Option 2: Manual Setup

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

## API Endpoints

### Transactions

- `GET /transactions` - Get all transactions
- `POST /transactions` - Create a new transaction
- `PUT /transactions/:id` - Update a transaction
- `DELETE /transactions/:id` - Delete a transaction

### Budgets

- `GET /budgets` - Get all budgets
- `POST /budgets` - Create or update a budget

## Usage

1. **Adding Transactions**: Use the form at the top to add new transactions with amount, description, date, and category.

2. **Viewing Data**: All transactions are displayed in a list below the form.

3. **Editing Transactions**: Click the "Edit" button next to any transaction to modify it.

4. **Deleting Transactions**: Click the "Delete" button to remove transactions.

5. **Charts**: Various charts show spending patterns, category distribution, and budget comparisons.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:

   - Ensure MongoDB is running: `mongod`
   - Check if the connection string in `.env` is correct

2. **Port Already in Use**:

   - Backend: Change `PORT` in `.env` file
   - Frontend: Vite will automatically suggest an alternative port

3. **CORS Errors**:

   - The backend is configured with CORS enabled
   - If issues persist, check that the frontend is making requests to the correct backend URL

4. **Module Not Found Errors**:
   - Run `npm install` in both `Backend` and `Frontend` directories
   - Clear node_modules and reinstall if necessary

### Development Tips

- The frontend automatically reloads when you make changes
- The backend uses nodemon for automatic restart on file changes
- Check the browser console and terminal for error messages
- Use the browser's Network tab to debug API calls

## Project Structure

```
budget-website/
├── Backend/
│   ├── index.js          # Main server file
│   ├── models/           # MongoDB models
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── package.json
├── start-dev.js          # Development startup script
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
