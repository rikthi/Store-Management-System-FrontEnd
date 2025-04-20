import React, { useState } from "react";
import axios from "axios";

export function AddInventory() {
    const [inventoryData, setInventoryData] = useState({
        id: "",
        category: "",
        minStock: "",
        maxStock: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInventoryData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setError("");

        const { category, minStock, maxStock } = inventoryData;
        const min = Number(minStock);
        const max = Number(maxStock);

        if (min < 0 || max < 0) {
            setError("Stock levels cannot be negative.");
            return;
        }

        if (min > max) {
            setError("Minimum stock cannot be greater than maximum stock.");
            return;
        }

        setLoading(true);
        try {
            await axios.post("http://localhost:8081/inventory/add", {
                id: "",
                category,
                minStock: min,
                maxStock: max
            });
            setSuccess("Inventory category added successfully!");
            setInventoryData({id:"", category: "", minStock: "", maxStock: "" });
        } catch (err) {
            setError("Failed to add inventory category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
             style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Inventory Category</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Category Name</label>
                        <input
                            type="text"
                            name="category"
                            value={inventoryData.category}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Minimum Stock Level</label>
                        <input
                            type="number"
                            name="minStock"
                            value={inventoryData.minStock}
                            min= {0}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Maximum Stock Level</label>
                        <input
                            type="number"
                            name="maxStock"
                            value={inventoryData.maxStock}
                            min= {0}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                    >
                        {loading ? "Submitting..." : "Add Inventory"}
                    </button>
                </form>

                {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
}
