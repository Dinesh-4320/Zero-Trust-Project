const BASE_URL = "https://af67a1e979d104242a0121bc2f5415bb-bfcefccd6df36bbe.elb.us-east-1.amazonaws.com/backend";

export const API_URLS = {
  // Auditor-specific endpoints
  UPDATE_AUDITOR_DETAILS: `${BASE_URL}/auditor/update`,
  GET_AUDITOR_INFO: `${BASE_URL}/auditor/audit-info`,
  GET_TRANSACTION_BY_ID: (transactionId) =>
    `${BASE_URL}/auditor/transactions/${transactionId}`,
};
