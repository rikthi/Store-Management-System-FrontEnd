import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext.jsx";

export function StoreDetails() {
    const { user } = useAuth();
    const [store, setStore] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/${user.storeId}/store/getDetails`);
                setStore(response.data);
            } catch (err) {
                setError("Failed to fetch store details.");
            } finally {
                setLoading(false);
            }
        };

        fetchStore();
    }, [user.storeId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
             style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
            <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Store Details</h1>

                {loading && <p className="text-blue-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {store && (
                    <div className="space-y-4 text-gray-800">
                        <div>
                            <strong>Store Name:</strong> {store.name}
                        </div>
                        <div>
                            <strong>Address:</strong> {store.address}
                        </div>
                        <div>
                            <strong>Manager Name:</strong> {store.managerName}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
