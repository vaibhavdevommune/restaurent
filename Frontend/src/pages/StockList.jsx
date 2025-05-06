import { useEffect, useState } from "react";
import axios from "axios";

export default function StockList() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://backend.test/api/stocks") 
      .then((res) => {
        setStocks(res.data);
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching stocks:", err); 
        setLoading(false); 
      });
  }, []); 

  if (loading) {
    return (
      <div className="text-center text-gray-600 py-10">
        Loading stock data...
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock List</h2>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Product Name</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock) => (
                <tr key={stock.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{stock.id}</td>
                  <td className="px-4 py-2">{stock.product_name}</td>
                  <td className="px-4 py-2">{stock.quantity}</td>
                  <td className="px-4 py-2">₹{stock.price}</td>
                  <td className="px-4 py-2">
                    {new Date(stock.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No stock available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
