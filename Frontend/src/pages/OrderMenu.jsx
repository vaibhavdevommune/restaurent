import { useState, useEffect } from "react";
import { FaShoppingCart, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateOrderButton from "../components/CreateButton";
import axios from "axios";
import { motion } from "framer-motion";  // Import framer-motion

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
      .get("http://backend.test/api/orders")
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
      .post("http://backend.test/api/orders", newOrder)
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
      .delete(`http://backend.test/api/orders/${id}`)
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-2xl font-bold"
        >
          Order Management
        </motion.h2>
        <CreateOrderButton onClick={toggleOrderForm} text="Create New Order" />
      </div>

      {/* Animate Order Form */}
      {showOrderForm && (
        <motion.div
          className="bg-white p-6 rounded shadow-md mb-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4">Create New Order</h3>
          <form
            onSubmit={handleSubmitOrder}
            className="bg-white shadow-lg rounded-xl p-6 space-y-5 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Create New Order</h2>

            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                name="customer_name"
                value={newOrder.customer_name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none p-3 transition"
                required
              />
            </div>

            {/* Table Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Table Number
              </label>
              <input
                type="text"
                name="table_number"
                value={newOrder.table_number}
                onChange={handleInputChange}
                placeholder="Table #5"
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none p-3 transition"
                required
              />
            </div>

            {/* Select Menu Item */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Menu Item
              </label>
              <select
                name="menu_item"
                value={newOrder.menu_item}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none p-3 transition bg-white"
                required
              >
                <option value="">Choose an item</option>
                <option value="1">Margherita Pizza</option>
                <option value="2">Veg Burger</option>
                <option value="3">Butter Chicken</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={newOrder.quantity}
                onChange={handleInputChange}
                placeholder="e.g. 2"
                className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none p-3 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition shadow"
            >
              Add to Order
            </button>
          </form>
        </motion.div>
      )}

      {/* Animate Orders Table Rows */}
      <motion.div
        className="bg-white p-6 rounded shadow-md"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
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
                <motion.tr
                  key={order.id}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={slideIn}
                  transition={{ duration: 0.5 }}
                >
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customer_name}</td>
                  <td className="py-2 px-4">{order.table_number}</td>
                  <td className="py-2 px-4">₹{order.total_amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded ${order.status === "Completed"
                        ? "bg-green-400 text-white"
                        : "bg-yellow-400 text-white"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditOrder(order)}
                        className="view-btn"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="delete-btn"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
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
      </motion.div>
    </div>
  );
};

export default OrderMenu;
