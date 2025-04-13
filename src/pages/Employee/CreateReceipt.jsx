import React, { useState } from "react";
import axios from "axios";

export function CreateReceipt() {
    const [receipt, setReceipt] = useState({
        customerId: "",
        receiptId: "",
        totalPrice: "",
        date: "",
        cardNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setReceipt({ ...receipt, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // Validation: Total price must not be negative
        if (parseFloat(receipt.totalPrice) < 0) {
            setError("Total price cannot be negative.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/receipts", receipt);
            if (response.status === 201) {
                setSuccess("Receipt added successfully!");
                setReceipt({ customerId: "", receiptId: "", totalPrice: "", date: "", cardNumber: "" });
            } else {
                setError("Failed to add receipt.");
            }
        } catch (err) {
            setError("Error adding receipt. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }} // Correct image path
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Receipt</h1>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    {/* Customer ID */}
                    <input
                        type="text"
                        name="customerId"
                        placeholder="Customer ID"
                        value={receipt.customerId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Receipt ID */}
                    <input
                        type="text"
                        name="receiptId"
                        placeholder="Receipt ID"
                        value={receipt.receiptId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Total Price */}
                    <input
                        type="number"
                        name="totalPrice"
                        placeholder="Total Price"
                        value={receipt.totalPrice}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0" // <-- Prevent negative input in UI
                        required
                    />

                    {/* Date of Transaction */}
                    <input
                        type="date"
                        name="date"
                        value={receipt.date}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Card Number */}
                    <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={receipt.cardNumber}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Add Receipt"}
                    </button>
                </form>

                {/* Success & Error Messages */}
                {success && <p className="text-green-500 mt-4">{success}</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}
