import React, { useState } from "react";
import axios from "axios";

export function AddEmployee() {
    const [employeeData, setEmployeeData] = useState({
        id: "",
        name:"",
        gender:"Male",
        phoneNumber:"",
        dateOfBirth: "",
        emailAddress:"",
        address:"",
        supervisor: ""

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
// Clear success or error message after 3 seconds
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess("");
            setError("");
        }, 3000); // 3 seconds

        return () => clearTimeout(timer); // cleanup
    }, [success, error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = {};
            for (const key in employeeData) {
                payload[key] = employeeData[key]?.toString() || "";
            }
            setSuccess("Employee added successfully!");
            setEmployeeData({
                id: "",
                name: "",
                gender: "",
                phoneNumber: "",
                dateOfBirth: "",
                emailAddress: "",
                address: "",
                supervisor: ""
            });
            console.log(employeeData);
            await axios.post("http://localhost:8081/employees/create", employeeData);


        } catch (err) {
            setError("Error adding employee. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}
        >


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

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={employeeData.dateOfBirth}
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
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
                        <label htmlFor="emailAddress" className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            value={employeeData.emailAddress}
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
                    {/* Supervisor ID */}
                    <div>
                        <label htmlFor="supervisor" className="block text-sm font-semibold text-gray-700">Supervisor Id</label>
                        <input
                            type="number"
                            id="supervisor"
                            name="supervisor"
                            value={employeeData.supervisor}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
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
