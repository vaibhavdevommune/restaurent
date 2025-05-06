import { useState, useEffect } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion"; // <-- Add this

Modal.setAppElement("#root");

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    // Fetch menu items and customers on mount
    const fetchData = async () => {
      try {
        const [menusRes, customersRes] = await Promise.all([
          axios.get("http://backend.test/api/menus"),
          axios.get("http://backend.test/api/customers")
        ]);
        setMenuItems(menusRes.data);
        setCustomers(customersRes.data);
      } catch (error) {
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  const addToOrder = (menuItem) => {
    const updatedOrder = [...order];
    const index = updatedOrder.findIndex(item => item.id === menuItem.id);

    if (index !== -1) {
      updatedOrder[index].quantity += 1;
    } else {
      updatedOrder.push({ ...menuItem, quantity: 1 });
    }

    setOrder(updatedOrder);
    calculateTotal(updatedOrder);
  };

  const removeFromOrder = (itemId) => {
    const updatedOrder = order.filter(item => item.id !== itemId);
    setOrder(updatedOrder);
    calculateTotal(updatedOrder);
  };

  const calculateTotal = (orderList) => {
    const newTotal = orderList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  const handleOrderSubmit = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer before placing the order.");
      return;
    }

    try {
      await axios.post("http://backend.test/api/orders", {
        customer_id: selectedCustomer,
        items: order.map(item => ({
          menu_id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
      toast.success("Order placed successfully!");
      setOrder([]);
      setTotal(0);
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  const handleCreateCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone || !newCustomer.email || !newCustomer.address) {
      toast.warning("All fields are required.");
      return;
    }

    try {
      const res = await axios.post("http://backend.test/api/customers", newCustomer);
      setCustomers([...customers, res.data]);
      setSelectedCustomer(res.data.id);
      setShowCreateCustomerModal(false);
      setShowCustomerModal(false);
      setNewCustomer({ name: "", phone: "", email: "", address: "" });
      toast.success("Customer created successfully!");
    } catch (error) {
      toast.error("Failed to create customer.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <motion.h2
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        className="text-3xl font-bold mb-6"
      >
        Customer Menu
      </motion.h2>

      {/* Customer Select Button */}
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCustomerModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Select / Create Customer
        </motion.button>
        {selectedCustomer && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-green-600 font-medium"
          >
            Selected Customer: {customers.find(c => c.id === selectedCustomer)?.name}
          </motion.p>
        )}
      </div>

      {/* Menu Items */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            variants={fadeIn}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">₹{item.price}</span>
              <button
                onClick={() => addToOrder(item)}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaCartPlus />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded shadow"
      >
        <h3 className="text-2xl font-semibold mb-4">Your Order</h3>
        {order.length > 0 ? (
          <>
            <ul className="mb-4">
              <AnimatePresence>
                {order.map((item) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{item.price * item.quantity}</span>
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={handleOrderSubmit}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Place Order
            </motion.button>
          </>
        ) : (
          <p>No items in order yet.</p>
        )}
      </motion.div>

      {/* 👇 Customer Modal */}
      <Modal
        isOpen={showCustomerModal}
        onRequestClose={() => setShowCustomerModal(false)}
        className="bg-white p-6 rounded shadow-md w-1/3 mx-auto mt-40 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Select Customer</h3>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>
                {cust.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (selectedCustomer) {
                setShowCustomerModal(false);
              } else {
                toast.warning("Please select a customer.");
              }
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Continue
          </button>
          <button
            onClick={() => setShowCreateCustomerModal(true)}
            className="mt-2 text-blue-600 underline w-full"
          >
            + Create New Customer
          </button>
        </motion.div>
      </Modal>

      {/* 👇 Create Customer Modal */}
      <Modal
        isOpen={showCreateCustomerModal}
        onRequestClose={() => setShowCreateCustomerModal(false)}
        className="bg-white p-6 rounded shadow-md w-1/3 mx-auto mt-40 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Add New Customer</h3>
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Address"
            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowCreateCustomerModal(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCustomer}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default CustomerMenu;
