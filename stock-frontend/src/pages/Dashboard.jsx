import React from "react";
import SalesReport from "./SalesReport";
import OrderReport from "./OrderReport";
import InventoryReport from "./InventoryReport";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Restaurant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <SalesReport />
        </div>       

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <InventoryReport />
        </div>

         <div className="bg-white p-6 rounded-lg shadow-lg">
          <OrderReport />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
