import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesOverview = () => {
  const [salesData, setSalesData] = useState({ totalEarnings: 0, recentTransactions: [] });

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/sales', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSalesData(response.data);
    } catch (err) {
      console.error('Error fetching sales data:', err.response?.data || err.message);
    }
  };

  return (
    <div className="sales-overview">
      <h2 className="text-2xl font-bold mb-4">Sales Overview</h2>
      <p className="text-lg mb-6">Total Earnings: ${salesData.totalEarnings}</p>
      <h3 className="text-lg font-bold mb-2">Recent Transactions:</h3>
      <ul className="transaction-list">
        {salesData.recentTransactions.map((transaction, index) => (
          <li key={index} className="mb-4 p-4 border border-gray-300 rounded">
            <p>Product: {transaction.productName}</p>
            <p>Amount: ${transaction.amount}</p>
            <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesOverview;