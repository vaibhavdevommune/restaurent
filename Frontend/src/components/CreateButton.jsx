import React from "react";
import { FaPlus } from "react-icons/fa";

const CreateOrderButton = ({ onClick, text = "Create New Order" }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center text-white bg-[#443627] transition duration-300 cursor-pointer ease-in-out p-2 rounded-sm hover:bg-[#D98324]"
    >
      <FaPlus className="mr-2" />
      {text}
    </button>
  );
};

export default CreateOrderButton;
