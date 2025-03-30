import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useAuth } from "./AuthContext.jsx";

export function CustomerHome() {
    const { user } = useAuth(); // Get user info from context
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch receipts from API using axios
    const fetchReceipts = async () => {
        setLoading(true);
        setError("");

        try {
            // Use axios to make the GET request with the username
            const response = await axios.get(`http://localhost:8080/api/receipts`, {
                params: {
                    username: user.username // Pass the username as a query parameter
                }
            });

            setReceipts(response.data); // Set the receipts data from the response
        } catch (err) {
            setError(err.message("Not Connected to Database")); // Set error message if the request fails
        } finally {
            setLoading(false); // Stop the loading spinner
        }
    };

    // Fetching Personal Details from API (function for future use)
    const fetchPersonalDetails = async () => {
        // Implementation for fetching personal details (if needed)
    };

    return (
        <div
            className="page-background"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            {/* Overlay with 50% opacity */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content container positioned above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                <h1 className="text-3xl font-bold text-white">Customer Dashboard</h1>

                {/* Buttons */}
                <div className="space-y-4 w-80">
                    <button onClick={fetchPersonalDetails} className="btn-primary">
                        View Personal Information
                    </button>
                    <button onClick={fetchReceipts} className="btn-primary">
                        View Receipts
                    </button>
                </div>

                {/* Loading & Error Handling */}
                {loading && <p className="mt-4 text-blue-300">Loading receipts...</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}

                {/* Receipts List */}
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
