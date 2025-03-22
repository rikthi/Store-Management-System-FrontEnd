import React, { useState } from "react";

export function SalariedEmployeeHome() {
    const [receipts, setReceipts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Simulated customer ID (In real implementation, get this from auth)
    const customerId = 123;

    // Fetch receipts from API
    const fetchReceipts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:5000/api/receipts/${customerId}`);
            if (!response.ok) throw new Error("Failed to fetch receipts");

            const data = await response.json();
            setReceipts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetching Personal Details from API
    const fetchPersonalDetails = async () => {

    };


    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            {/* Overlay with 50% opacity */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content container positioned above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
                <h1 className="text-3xl font-bold text-white">Hourly Employee Dashboard</h1>

                {/* Buttons */}
                <div className="space-y-4 w-80">
                    <button onClick={fetchPersonalDetails} className="btn-primary">
                        View Personal Information
                    </button>
                    <button onClick={fetchReceipts} className="btn-primary">
                        View Pay Scale
                    </button>
                    <button onClick={fetchReceipts} className="btn-primary">
                        Enter Attendance
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