import React, { useState, useEffect } from "react";

const InventoryReport = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      const data = [
        { itemName: "Margherita Pizza", stock: 20 },
        { itemName: "Veg Burger", stock: 15 },
        { itemName: "Cold Coffee", stock: 50 },
      ];
      
      setStocks(data);
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Inventory Report</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Item</th>
            <th className="px-4 py-2 text-left">Stock Level</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{stock.itemName}</td>
              <td className="px-4 py-2">{stock.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryReport;
