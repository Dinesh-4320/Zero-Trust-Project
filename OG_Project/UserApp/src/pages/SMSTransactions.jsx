import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/ui/Header";
import NavBar from "../components/NavBar";
import { API_URLS } from "../apiUrls";

const SMSTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem("authToken"); // Get authToken from Redux

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(API_URLS.GET_SMS_TRANSACTIONS, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTransactions(response.data);  // Assume response.data is the SMS transactions
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch SMS transactions.");
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [authToken]);

  return (
    <div className="max-w-7xl mx-auto z-20 ">
      <NavBar />
      <Header />
      <div className="p-4">
        {loading ? (
          <p>Loading SMS transactions...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(transactions).map((smsKey) => {
              const sms = transactions[smsKey];
              return (
                <div key={smsKey} className="p-4 border rounded shadow-sm">
                  <p><strong>Sender:</strong> {sms.sender}</p>
                  <p><strong>Message:</strong> {sms.message}</p>
                  <p><strong>Timestamp:</strong> {new Date(sms.timestamp).toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SMSTransactions;
