const BASE_URL = "https://finance-visualizer-c3fj.vercel.app";


// Basic fetch wrapper
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Transaction API
export const transactionAPI = {
  getAll: () => makeRequest("/transactions"),

  create: (transaction) =>
    makeRequest("/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
    }),

  update: (id, transaction) =>
    makeRequest(`/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(transaction),
    }),

  delete: (id) =>
    makeRequest(`/transactions/${id}`, {
      method: "DELETE",
    }),
};

// Budget API
export const budgetAPI = {
  getAll: () => makeRequest("/budgets"),

  createOrUpdate: (budget) =>
    makeRequest("/budgets", {
      method: "POST",
      body: JSON.stringify(budget),
    }),

  delete: (id) =>
    makeRequest(`/budgets/${id}`, {
      method: "DELETE",
    }),
};
