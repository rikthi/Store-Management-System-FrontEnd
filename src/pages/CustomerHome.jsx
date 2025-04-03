import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";

export function CustomerHome() {
    const { user } = useAuth();
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch receipts from API using axios
    const fetchReceipts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("http://localhost:8080/api/receipts", {
                params: { username: user.username }
            });

            setReceipts(response.data);
        } catch (err) {
            setError("");
        } finally {
            setLoading(false);
        }
    };

    // Fetch personal details (future implementation)
    const fetchPersonalDetails = async () => {
        // Placeholder for fetching personal details
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content container positioned above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>

                {/* Buttons */}
                <div className="space-y-4 w-80">
                    <button onClick={fetchPersonalDetails} className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                        View Personal Information
                    </button>
                    <button onClick={fetchReceipts} className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                        View Receipts
                    </button>
                </div>

                {/* Loading & Error Handling */}
                {loading && <p className="text-blue-500 mt-4">Loading...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Display Receipts */}
                {receipts.length > 0 && (
                    <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Your Receipts</h2>
                        <ul className="space-y-2">
                            {receipts.map((receipt) => (
                                <li key={receipt.id} className="border p-2 rounded bg-gray-50">
                                    Receipt #{receipt.id} - Total: ${receipt.total}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
