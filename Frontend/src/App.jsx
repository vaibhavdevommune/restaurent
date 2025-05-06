import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Mainbar from "./components/Mainbar";
import Dashboard from "./pages/Dashboard";
import OrderMenu from "./pages/OrderMenu";
import Menu from "./pages/MenuItems";
import CustomerMenu from "./pages/CustomerMenu";
import SalesReport from "./pages/SalesReport";

export default function App() {
  return (
    <BrowserRouter> {/* Wrap your routes with BrowserRouter */}
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar />
          <Mainbar/>
        </div>
      </div>
    </BrowserRouter>
  );
}
