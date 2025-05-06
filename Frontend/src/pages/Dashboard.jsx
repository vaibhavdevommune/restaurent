import React from "react";
import { motion } from "framer-motion";  // Import framer-motion
import SalesReport from "./SalesReport";
import OrderReport from "./OrderReport";
import InventoryReport from "./InventoryReport";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Restaurant Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {/* Sales Report with Animation */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <SalesReport />
        </motion.div>

        {/* Inventory Report with Animation */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InventoryReport />
        </motion.div>

        {/* Order Report with Animation */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <OrderReport />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
