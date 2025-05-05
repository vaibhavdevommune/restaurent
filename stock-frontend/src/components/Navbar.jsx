import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // You can fetch the user's name here from localStorage, context, or API
    const name = localStorage.getItem("userName") || "User"; // Replace with dynamic logic
    setUserName(name);
  }, []);

  return (
    <header className="h-16 bg-[#443627] text-white flex items-center justify-end px-6 font-dmSans">
      {/* <h1 className="text-xl font-semibold text-[#FFB280]">Stock Management</h1> */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-[#A29B93]">Hello, {userName}</span>
        <FaUserCircle size={30} className="text-[#FFB280] hover:text-[#A29B93] cursor-pointer transition-colors duration-200" />
      </div>
    </header>
  );
}
