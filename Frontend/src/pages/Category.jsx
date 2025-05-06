import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateOrderButton from "../components/CreateButton";
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

// Fade-in animation for form and table container
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Slide-in animation for table rows
const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
};

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios
            .get("http://backend.test/api/categories")
            .then((response) => setCategories(response.data))
            .catch((error) => {
                console.error("Error fetching categories:", error);
                toast.error("Failed to fetch categories.");
            });
    };

    const handleAddCategory = (e) => {
        e.preventDefault();

        if (!newCategory) {
            toast.error("Please enter a category name.");
            return;
        }

        axios
            .post("http://backend.test/api/categories", { name: newCategory })
            .then((response) => {
                setCategories([...categories, response.data]);
                setNewCategory("");
                setShowForm(false);
                toast.success("Category added successfully!");
            })
            .catch((error) => {
                console.error("Error adding category:", error);
                toast.error("Failed to add category.");
            });
    };

    const handleDeleteCategory = (id) => {
        axios
            .delete(`http://backend.test/api/categories/${id}`)
            .then(() => {
                setCategories(categories.filter((category) => category.id !== id));
                toast.success("Category deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting category:", error);
                toast.error("Failed to delete category.");
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer />
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5 }}
                variants={fadeIn}
                className="flex justify-between items-center mb-6"
            >
                <h2 className="text-2xl font-bold">Category Management</h2>
                <CreateOrderButton
                    onClick={() => setShowForm(!showForm)}
                    text={showForm ? "Cancel" : "Add New Category"}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                />
            </motion.div>

            {/* Animate the Form for Adding Categories */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-6 rounded shadow-md mb-6"
                    >
                        <form onSubmit={handleAddCategory}>
                            <div className="mb-4">
                                <div className="flex items-center gap-4">
                                    <label className="block text-gray-700 text-nowrap">Category Name</label>
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                                >
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animate the Categories Table */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="overflow-x-auto bg-white p-4 rounded shadow-md"
            >
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left">Category Name</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {categories.map((category) => (
                                <motion.tr
                                    key={category.id}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: 30 }}
                                    variants={slideIn}
                                    className="border-b"
                                >
                                    <td className="px-4 py-2">{category.name}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="delete-btn"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={2} className="text-center py-4 text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default CategoryManagement;
