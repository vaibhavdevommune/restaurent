import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import OrderMenu from "../pages/OrderMenu";
import Menu from "../pages/MenuItems";
import CustomerMenu from "../pages/CustomerMenu";
import SalesReport from "../pages/SalesReport";
import Category from "../pages/Category";

export default function MainBar() {
  return (
    <main className="flex-1 bg-[#F4F4F4] p-6 font-dmSans rounded mainbar">
      <div className="max-w-screen-xl mx-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderMenu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/customers" element={<CustomerMenu />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </main>
  );
}
