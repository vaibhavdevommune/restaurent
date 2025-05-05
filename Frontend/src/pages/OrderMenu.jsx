import { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const OrderMenu = () => {
  const [orders, setOrders] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer_name: "",
    table_number: "",
    menu_item: "",
    quantity: 1,
  });

  useEffect(() => {
    axios
      .get("http://stock-backend.test/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const toggleOrderForm = () => {
    setShowOrderForm(!showOrderForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    axios
      .post("http://stock-backend.test/api/orders", newOrder)
      .then((response) => {
        setOrders([...orders, response.data]);
        setShowOrderForm(false); 
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  const handleDeleteOrder = (id) => {
    axios
      .delete(`http://stock-backend.test/api/orders/${id}`)
      .then(() => {
        setOrders(orders.filter((order) => order.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
      });
  };

  const handleEditOrder = (order) => {
    setNewOrder(order);
    setShowOrderForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <button
          onClick={toggleOrderForm}
          className="flex items-center text-white bg-blue-500 p-2 rounded hover:bg-blue-600"
        >
          <FaPlus className="mr-2" />
          Create New Order
        </button>
      </div>

      {showOrderForm && (
        <div className="bg-white p-6 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Order</h3>
          <form onSubmit={handleSubmitOrder}>
            <div className="mb-4">
              <label className="block text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customer_name"
                value={newOrder.customer_name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Table Number</label>
              <input
                type="text"
                name="table_number"
                value={newOrder.table_number}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter table number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Select Menu Item</label>
              <select
                name="menu_item"
                value={newOrder.menu_item}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select a menu item</option>
                <option value="1">Margherita Pizza</option>
                <option value="2">Veg Burger</option>
                <option value="3">Butter Chicken</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={newOrder.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter quantity"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Add to Order
            </button>
          </form>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">All Orders</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer Name</th>
              <th className="py-2 px-4 text-left">Table No.</th>
              <th className="py-2 px-4 text-left">Total Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer_name}</td>
                  <td className="py-2 px-4">{order.table_number}</td>
                  <td className="py-2 px-4">₹{order.total_amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        order.status === "Completed"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderMenu;
