import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function AddNewItem() {
    const { category } = useParams();
    const navigate = useNavigate();

    const [itemData, setItemData] = useState({
        category: category || "",
        id:"",
        name: "",
        quantity: "",
        price: "",
        discountPrice: "",
        manufacturedDate: "",
        expiredDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItemData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        const { quantity, price, discountPrice } = itemData;

        if (quantity < 0 || price < 0 || discountPrice < 0) {
            setError("Quantity, price, and discount price cannot be negative.");
            setLoading(false);
            return;
        }

        try {
            await axios.post(`http://localhost:8081/items/create`, itemData);
            setSuccess("Item added successfully!");
            setTimeout(() => navigate("/ViewCategories"), 1500);
        } catch (err) {
            setError("Failed to add item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
             style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Item</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={itemData.category}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-200"
                        />
                    </div>

                    {[
                        { label: "Name", name: "name", type: "text" },
                        { label: "Quantity", name: "quantity", type: "number", min: 0 },
                        { label: "Price", name: "price", type: "number", min: 0 },
                        { label: "Discount Price", name: "discountPrice", type: "number", min: 0 },
                        { label: "Manufactured Date", name: "manufacturedDate", type: "date" },
                        { label: "Expired Date", name: "expiredDate", type: "date" },
                    ].map(({ label, name, type, min }) => (
                        <div key={name}>
                            <label className="block text-sm font-semibold mb-1">{label}</label>
                            <input
                                type={type}
                                name={name}
                                min={min}
                                value={itemData[name]}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                    >
                        {loading ? "Submitting..." : "Add Item"}
                    </button>
                </form>

                {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
