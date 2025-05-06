import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import CreateOrderButton from "../components/CreateButton";
import axios from "axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://backend.test/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  };

  const fetchMenuItems = () => {
    axios
      .get("http://backend.test/api/menus")
      .then((res) => setMenuItems(res.data))
      .catch((err) => console.error("Error fetching menu:", err));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithCategoryId = {
      ...formData,
      category_id: formData.category,
    };

    axios
      .post("http://backend.test/api/menus", formDataWithCategoryId)
      .then((res) => {
        setMenuItems([...menuItems, res.data]);
        setShowForm(false);
        setFormData({ name: "", price: "", description: "", category: "" });
        toast.success("Menu item saved successfully!", { autoClose: 1500 });
      })
      .catch(() => {
        toast.error("Failed to save menu item.", { autoClose: 1500 });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#443627",
      cancelButtonColor: "#D98324",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://backend.test/api/menus/${id}`)
          .then(() => {
            setMenuItems(menuItems.filter((item) => item.id !== id));
            toast.success("Menu item deleted successfully!", { autoClose: 1500 });
          })
          .catch(() => {
            toast.error("Failed to delete menu item.", { autoClose: 1500 });
          });
      }
    });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setShowForm(true);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Item Name" },
      { accessorKey: "description", header: "Description" },
      { accessorKey: "category", header: "Category" },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ getValue }) => `₹${getValue()}`,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button onClick={() => handleEdit(row.original)} className="view-btn">
              <FaEdit />
            </button>
            <button onClick={() => handleDelete(row.original.id)} className="delete-btn">
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [menuItems]
  );

  const table = useReactTable({
    data: menuItems,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <CreateOrderButton onClick={() => setShowForm(!showForm)} text="Create New Item" />
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.5 }}
            variants={fadeIn}
            className="bg-white p-6 rounded shadow-md mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">Add/Edit Menu Item</h3>
            <form onSubmit={handleSubmit}>
              {["name", "description", "price"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === "price" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Save Item
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search menu..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        variants={fadeIn}
        className="overflow-x-auto bg-white p-4 rounded shadow-md"
      >
        <table className="w-full table-auto border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <motion.tr
                key={headerGroup.id}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5 }}
                variants={fadeIn}
                className="bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </motion.tr>
            ))}
          </thead>
          <tbody>
            <AnimatePresence>
              {table.getRowModel().rows.map((row) => (
                <motion.tr
                  key={row.id}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.5 }}
                  variants={fadeIn}
                  className="border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Menu;
