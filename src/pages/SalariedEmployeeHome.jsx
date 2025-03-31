import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext.js"; // Import AuthContext

export function HourlyEmployeeHome() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get the logged-in user's details
    const [personalDetails, setPersonalDetails] = useState(null);
    const [payScale, setPayScale] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    //  Fetch Personal Details from API
    const fetchPersonalDetails = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`http://localhost:8080/api/employees/details`, {
                params: { username: user.username } // Pass username in query params
            });
            setPersonalDetails(response.data);
        } catch (err) {
            setError(err.message("Failed to fetch personal details"));
        } finally {
            setLoading(false);
        }
    };

    //  Fetch Pay Scale from API
    const fetchSalary = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`http://localhost:8080/api/employees/pay-scale`, {
                params: { username: user.username }
            });
            setPayScale(response.data);
        } catch (err) {
            setError(err.message("Failed to fetch pay scale"));
        } finally {
            setLoading(false);
        }
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
                <h1 className="text-3xl font-bold text-gray-800">Hourly Employee Dashboard</h1>

                {/* Buttons */}
                <div className="space-y-4 w-80">
                    <button onClick={fetchPersonalDetails} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                        View Personal Information
                    </button>
                    <button onClick={fetchSalary} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
                        View Salary
                    </button>
                    <button onClick={() => navigate("/Employee/AddAttendance")} className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
                        Enter Attendance
                    </button>
                    <button onClick={() => navigate("/Employee/AddCustomer")} className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition">
                        Add a Customer
                    </button>
                    <button onClick={() => navigate("/Employee/CreateReceipt")} className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
                        Create Receipt
                    </button>
                </div>

                {/* Loading & Error Handling */}
                {loading && <p className="text-blue-500 mt-4">Loading...</p>}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/* Display Personal Details */}
                {personalDetails && (
                    <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
                        <p><strong>Name:</strong> {personalDetails.name}</p>
                        <p><strong>Email:</strong> {personalDetails.email}</p>
                        <p><strong>Phone:</strong> {personalDetails.phone}</p>
                    </div>
                )}

                {/* Display Pay Scale */}
                {payScale && (
                    <div className="mt-6 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Pay Scale</h2>
                        <p><strong>Hourly Rate:</strong> ${payScale.hourlyRate}</p>
                        <p><strong>Weekly Hours:</strong> {payScale.weeklyHours} hrs</p>
                        <p><strong>Overtime Rate:</strong> ${payScale.overtimeRate}</p>
                    </div>
                )}
            </div>
        </div>
    );
}