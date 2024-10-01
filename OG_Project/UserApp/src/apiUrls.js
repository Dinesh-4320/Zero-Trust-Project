const BASE_URL = "http://localhost:5001";

export const API_URLS = {
  // User Routes
  GET_USER_PROFILE: `${BASE_URL}/user/profile`,       // Get logged-in user's profile
  UPDATE_USER_PROFILE: `${BASE_URL}/user/profile`,    // Update logged-in user's profile
  GET_TRANSACTIONS: `${BASE_URL}/user/transactions`,  // Get all transactions for the logged-in user
  ADD_TRANSACTION: `${BASE_URL}/user/transactions`,   // Add a new transaction for the user
  DELETE_TRANSACTION: (transactionId) => `${BASE_URL}/user/transactions/${transactionId}`,  // Delete a specific transaction by ID
  UPDATE_TRANSACTION: (transactionId) => `${BASE_URL}/user/transactions/${transactionId}`,  // Update a specific transaction by ID
  GET_AUDITORS: `${BASE_URL}/user/auditors`,          // Get list of auditors
  SHARE_TRANSACTION: `${BASE_URL}/user/transactions/share`, // Share transactions with an auditor
  REVOKE_ACCESS: `${BASE_URL}/user/transactions/revoke`, // Revoke access to shared transactions
  GET_USER_TRANSACTIONS: `${BASE_URL}/user/user-transactions`, // Get transactions shared with the logged-in user
};
