import React, { useState, useEffect } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      // Example data (replace with API call)
      const data = [
        { date: "2025-05-01", totalSales: 5000 },
        { date: "2025-05-02", totalSales: 6000 },
        { date: "2025-05-03", totalSales: 4500 },
      ];
      
      setSalesData(data);
      setTotalSales(data.reduce((acc, item) => acc + item.totalSales, 0));
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Sales Report</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Total Sales (₹)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{sale.date}</td>
              <td className="px-4 py-2">₹{sale.totalSales}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xl font-semibold">Total Sales: ₹{totalSales}</div>
    </div>
  );
};

export default SalesReport;