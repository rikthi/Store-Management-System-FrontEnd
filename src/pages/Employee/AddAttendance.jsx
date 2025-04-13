import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext.jsx";

export function AddAttendance() {
    const { user } = useAuth(); // Get the logged-in employee details
    const [managerId, setManagerId] = useState(""); // For inputting manager ID
    const [punchInTime, setPunchInTime] = useState("");
    const [punchOutTime, setPunchOutTime] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const attendanceData = {
            employeeId: user.id, // Logged-in employee's ID
            managerId,
            punchInTime,
            punchOutTime,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/attendance", attendanceData);
            if (response.status === 201) {
                setSuccess("Attendance added successfully!");
                // Reset form after successful submission
                setManagerId("");
                setPunchInTime("");
                setPunchOutTime("");
            } else {
                setError("Failed to add attendance.");
            }
        } catch (err) {
            setError("Error adding attendance. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}
        >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content container positioned above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800">Add Attendance</h1>

                {/* Form for Attendance */}
                <form onSubmit={handleSubmit} className="space-y-4 w-80">
                    <div>
                        <label htmlFor="managerId" className="block text-sm font-semibold text-gray-700">Manager ID</label>
                        <input
                            type="text"
                            id="managerId"
                            value={managerId}
                            onChange={(e) => setManagerId(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="punchInTime" className="block text-sm font-semibold text-gray-700">Punch In Time</label>
                        <input
                            type="datetime-local"
                            id="punchInTime"
                            value={punchInTime}
                            onChange={(e) => setPunchInTime(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="punchOutTime" className="block text-sm font-semibold text-gray-700">Punch Out Time</label>
                        <input
                            type="datetime-local"
                            id="punchOutTime"
                            value={punchOutTime}
                            onChange={(e) => setPunchOutTime(e.target.value)}
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Attendance"}
                    </button>
                </form>

                {/* Error & Success Messages */}
                {error && <p className="mt-4 text-red-500">{error}</p>}
                {success && <p className="mt-4 text-green-500">{success}</p>}
            </div>
        </div>
    );
}
