import React from 'react';
import ProductManagement from './ProductManagement';
import SalesOverview from './SalesOverview';
import DeliveryTracking from './DeliveryTracking';
import MessagesComponent from './MessagesComponent';

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManagement />
        <SalesOverview />
        <DeliveryTracking />
        <MessagesComponent />
      </div>
    </div>
  );
};

export default SellerDashboard;