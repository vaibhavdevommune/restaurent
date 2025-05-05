import { useState } from "react";
import { FaCartPlus, FaTrash } from "react-icons/fa";

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Margherita Pizza", description: "Classic cheese pizza", price: 299.00 },
    { id: 2, name: "Veg Burger", description: "Grilled veggie patty", price: 149.00 },
    { id: 3, name: "Cold Coffee", description: "Chilled coffee with cream", price: 99.00 },
    { id: 4, name: "Butter Chicken", description: "Creamy chicken curry", price: 349.00 },
    { id: 5, name: "French Fries", description: "Crispy golden fries", price: 89.00 },
  ]);

  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  // Add item to the order
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

  // Remove item from the order
  const removeFromOrder = (itemId) => {
    const updatedOrder = order.filter(item => item.id !== itemId);
    setOrder(updatedOrder);
    calculateTotal(updatedOrder);
  };

  // Calculate total price
  const calculateTotal = (order) => {
    const newTotal = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  // Submit the order (you can add functionality for API submission here)
  const handleOrderSubmit = () => {
    console.log("Order submitted:", order);
    alert("Order submitted successfully!");
    setOrder([]); // Clear the order after submission
    setTotal(0);  // Reset total after submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Customer Menu</h2>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">₹{item.price}</span>
              <button
                onClick={() => addToOrder(item)}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              >
                <FaCartPlus />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-8 bg-white p-6 rounded shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Your Order</h3>
        {order.length > 0 ? (
          <div>
            <ul className="space-y-2">
              {order.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>₹{item.price * item.quantity}</span>
                  <button
                    onClick={() => removeFromOrder(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <button
              onClick={handleOrderSubmit}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Place Order
            </button>
          </div>
        ) : (
          <p>No items added to the order yet.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerMenu;
