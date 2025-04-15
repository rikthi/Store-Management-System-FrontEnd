import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ViewEmployees() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8081/employees");
            setEmployees(response.data);
            setFilteredEmployees(response.data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        let temp = employees;

        if (searchTerm) {
            temp = temp.filter((emp) =>
                emp.id.toString().includes(searchTerm)
            );
        }

        setFilteredEmployees(temp);
    }, [searchTerm, employees]);

    const handleViewDetails = (employeeId) => {
        navigate(`/ManagerOptions/EditEmployee/${employeeId}`);
    };

    return (
        <div
            className="relative flex flex-col items-center justify-start min-h-screen bg-cover bg-center p-10"
            style={{ backgroundImage: "url('../src/assets/loginBg.jpg')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />

            <h1 className="text-3xl font-bold text-white mb-6">View Employees</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search by Employee ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 mb-6 border rounded w-1/2"
            />

            {/* Employee table */}
            <div className="w-full max-w-6xl overflow-x-auto bg-white bg-opacity-90 p-4 rounded shadow">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Gender</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Date of Birth</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Supervisor ID</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">{emp.id}</td>
                            <td className="px-4 py-2">{emp.name}</td>
                            <td className="px-4 py-2">{emp.gender}</td>
                            <td className="px-4 py-2">{emp.phoneNumber}</td>
                            <td className="px-4 py-2">{emp.emailAddress}</td>
                            <td className="px-4 py-2">{emp.dateOfBirth || "N/A"}</td>
                            <td className="px-4 py-2">{emp.address}</td>
                            <td className="px-4 py-2">{emp.supervisorId ?? "N/A"}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleViewDetails(emp.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                        <tr>
                            <td colSpan="9" className="text-center py-4 text-gray-500">
                                No employees found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
