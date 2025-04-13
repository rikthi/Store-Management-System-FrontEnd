import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext.jsx"; 

export function AddEmployee() {
    const { user } = useAuth(); // Get the logged-in user details (manager)
    const [employeeData, setEmployeeData] = useState({
        name: "",
        employeeId: "",
        dob: "",
        gender: "male", // Default value
        phoneNumber: "",
        email: "",
        address: "",
        managerId: user.username // ManagerOptions's ID is the logged-in user's ID
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Sending data to backend including managerId
            const response = await axios.post("http://localhost:8080/api/employees", employeeData);
            if (response.status === 201) {
                setSuccess("Employee added successfully!");
                setEmployeeData({
                    name: "",
                    employeeId: "",
                    dob: "",
                    gender: "male",
                    phoneNumber: "",
                    email: "",
                    address: "",
                    managerId: user.username, // Reset managerId to the logged-in user
                });
            } else {
                setError("Failed to add employee.");
            }
        } catch (err) {
            setError("Error adding employee. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url(../../src/assets/loginBg.jpg')" }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content container positioned above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800">Add Employee</h1>

                {/* Form for adding employee */}
                <form onSubmit={handleSubmit} className="space-y-4 w-80">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={employeeData.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Employee ID */}
                    <div>
                        <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700">Employee ID</label>
                        <input
                            type="text"
                            id="employeeId"
                            name="employeeId"
                            value={employeeData.employeeId}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={employeeData.dob}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={employeeData.gender}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={employeeData.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={employeeData.email}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            value={employeeData.address}
                            onChange={handleChange}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Add Employee"}
                    </button>
                </form>

                {/* Error & Success Messages */}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {success && <p className="mt-4 text-green-500">{success}</p>}
            </div>
        </div>
    );
}
