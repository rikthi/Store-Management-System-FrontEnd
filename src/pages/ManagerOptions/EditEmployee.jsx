import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export function EditEmployee() {
    const { user } = useAuth();
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const response = await axios.post(
                    `http://localhost:8081/${user.storeId}/employees/getEmployee`,
                    { params: parseInt(employeeId) }
                );
                const emp = response.data;

                // Ensure proper date format for input[type="date"]
                emp.dateOfBirth = emp.dateOfBirth?.slice(0, 10) || "";

                setEmployee(emp);
            } catch (err) {
                console.error("Error fetching employee:", err);
                setError("Failed to fetch employee details.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [employeeId, user.storeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await axios.put(
                `http://localhost:8081/${user.storeId}/employees/update/${employeeId}`,
                employee
            );
            setSuccess("Employee updated successfully!");
        } catch (err) {
            console.error("Error updating employee:", err);
            setError("Failed to update employee.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
             style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />
            <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-96">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Edit Employee</h1>

                {loading && <p className="text-blue-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                {employee && (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold">Employee ID</label>
                            <input type="text" value={employee.id} disabled className="w-full p-2 border rounded bg-gray-200" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Name</label>
                            <input type="text" name="name" value={employee.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Gender</label>
                            <input type="text" name="gender" value={employee.gender} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Phone Number</label>
                            <input type="tel" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Email Address</label>
                            <input type="email" name="emailAddress" value={employee.emailAddress} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Address</label>
                            <textarea name="address" value={employee.address} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="text-sm font-semibold">Supervisor ID</label>
                            <input type="number" name="supervisorId" value={employee.supervisorId || ""} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Update
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
