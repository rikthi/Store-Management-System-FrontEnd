import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

export function ViewReceipts() {
    const { user } = useAuth(); // Get customer ID from AuthContext
    const [receipts, setReceipts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReceipts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/${user.storeId}/receipts/customer`, {
                    params: { customerId: user.userID },
                });
                setReceipts(response.data);
            } catch (err) {
                setError("Failed to fetch receipts.");
            }
        };

        fetchReceipts();
    }, [user]);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-start bg-cover bg-center py-12 px-4"
            style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
            <div className="relative z-10 w-full max-w-3xl">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Your Receipts</h1>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="space-y-4">
                    {receipts.map((receipt) => (
                        <div
                            key={receipt.receiptId}
                            className="bg-white rounded-lg p-6 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                        >
                            <p><strong>Receipt ID:</strong> {receipt.receiptId}</p>
                            <p><strong>Customer ID:</strong> {receipt.customerId}</p>
                            <p><strong>Employee ID:</strong> {receipt.employeeId}</p>
                            <p><strong>Total Price:</strong> ${receipt.totalPrice}</p>
                            <p><strong>Card Number:</strong> **** **** **** {receipt.cardNumber.slice(-4)}</p>
                            <p><strong>Date:</strong> {receipt.date}</p>
                        </div>
                    ))}

                    {receipts.length === 0 && (
                        <p className="text-center text-white">No receipts found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
