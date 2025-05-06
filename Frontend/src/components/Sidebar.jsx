import { Link, useLocation } from "react-router-dom";
import { FaHome,FaAsterisk, FaShoppingCart, FaUtensils, FaUser, FaChartBar } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard", icon: <FaHome /> },
    { to: "/orders", label: "Orders", icon: <FaShoppingCart /> },
    { to: "/category", label: "Category", icon: <FaAsterisk /> },
    { to: "/menu", label: "Menu", icon: <FaUtensils /> },
    { to: "/customers", label: "Customers", icon: <FaUser /> },
    { to: "/sales", label: "Sales Report", icon: <FaChartBar /> },
  ];

  return (
    <div className="w-64 sidebar bg-[#443627] text-white p-6 space-y-6 font-dmSans">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#FFB280]">Restaurant CRM</h2>
        {/* Mobile Hamburger Icon */}
        <button className="text-white md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <ul className="space-y-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center gap-4 p-2 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#FFB280] text-[#424242] font-medium"
                    : "text-[#D1D5DB] hover:bg-[#3E4A59] hover:text-[#FFB280]"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-base">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}