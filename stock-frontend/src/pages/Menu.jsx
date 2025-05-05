import { useState, useEffect } from "react";
import { FaCartPlus } from "react-icons/fa";

const Menu = () => {
  // Sample data for menu items (can be replaced with data from an API)
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic cheese pizza with tomato sauce and basil.",
      price: 299.00,
      category: "food",
    },
    {
      id: 2,
      name: "Veg Burger",
      description: "Grilled veggie patty with lettuce and tomato.",
      price: 149.00,
      category: "food",
    },
    {
      id: 3,
      name: "Cold Coffee",
      description: "Chilled coffee with cream and ice.",
      price: 99.00,
      category: "drink",
    },
    {
      id: 4,
      name: "Butter Chicken",
      description: "Creamy chicken curry served with naan.",
      price: 349.00,
      category: "food",
    },
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden potato fries.",
      price: 89.00,
      category: "food",
    },
  ]);

  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  // Add item to the order
  const addToOrder = (menuItem) => {
    const updatedOrder = [...order, menuItem];
    setOrder(updatedOrder);
    setTotal(total + menuItem.price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Menu</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {order.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>₹{item.price}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        ) : (
          <p>No items added to the order yet.</p>
        )}
      </div>
    </div>
  );
};

export default Menu;
