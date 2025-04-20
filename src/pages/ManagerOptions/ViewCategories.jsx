import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ViewCategories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8081/categories");
                setCategories(response.data);
                if (response.data.length > 0) {
                    setSelectedCategory(response.data[0]); // Default to first
                }
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;
        const fetchItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8081/items/byCategory`, {
                    params: { category: selectedCategory },
                });
                setItems(response.data);
            } catch (err) {
                console.error("Failed to load items", err);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [selectedCategory]);

    const handleOrder = (itemId) => {
        navigate(`/OrderItem/${itemId}`);
    };

    const handleAddNewItem = () => {
        navigate(`/ManagerOptions/AddNewItem/${selectedCategory}`);
    };

    return (
        <div
            className="flex min-h-screen pt-24 bg-gray-100 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}
        >
        {/* Sidebar */}
            <div className="w-1/5 bg-white bg-opacity-80 shadow-md p-4">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <ul className="space-y-2">
                    {categories.map((category, idx) => (
                        <li
                            key={idx}
                            onClick={() => setSelectedCategory(category)}
                            className={`p-2 rounded cursor-pointer hover:bg-blue-100 ${
                                category === selectedCategory ? "bg-blue-200 font-semibold" : ""
                            }`}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleAddNewItem}
                    className="mt-6 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                    Add New Item
                </button>
            </div>

            {/* Main Content */}
            <div className="w-4/5 p-6">
                <h2 className="text-2xl font-bold mb-4">Items in {selectedCategory}</h2>
                {loading ? (
                    <p>Loading items...</p>
                ) : (
                    <table className="w-full table-auto bg-white bg-opacity-90 rounded shadow">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2">Item ID</th>
                            <th className="p-2">Name</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Stock</th>
                            <th className="p-2">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">${item.price}</td>
                                    <td className="p-2">{item.stock}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleOrder(item.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Order
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No items found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
