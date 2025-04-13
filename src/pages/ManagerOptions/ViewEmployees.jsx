import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ViewEmployees() {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    // Fetch all employees on mount
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/employees");
            setEmployees(response.data);
            setFilteredEmployees(response.data);
        } catch (error) {
            console.error("Failed to fetch employees", error);
        }
    };

    // Search and filter logic
    useEffect(() => {
        let temp = employees;

        if (searchTerm) {
            temp = temp.filter(emp =>
                emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filter === "salaried") {
            temp = temp.filter(emp => emp.type === "salaried");
        } else if (filter === "hourly") {
            temp = temp.filter(emp => emp.type === "hourly");
        }

        setFilteredEmployees(temp);
    }, [searchTerm, filter, employees]);

    const handleViewDetails = (employeeId) => {
        navigate(`/employee/${employeeId}`);
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}
        >
            <h1 className="text-3xl font-bold mb-6">View Employees</h1>

            {/* Search & Filter */}
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded w-1/2"
                />
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="all">All</option>
                    <option value="salaried">Salaried Employees</option>
                    <option value="hourly">Hourly Employees</option>
                </select>
            </div>

            {/* Employee Table */}
            <table className="min-w-full bg-white border shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-700">
                <tr>
                    <th className="py-3 px-4">Employee ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Action</th>
                </tr>
                </thead>
                <tbody>
                {filteredEmployees.map((emp) => (
                    <tr key={emp.employeeId} className="border-b">
                        <td className="py-2 px-4">{emp.employeeId}</td>
                        <td className="py-2 px-4">{emp.name}</td>
                        <td className="py-2 px-4 capitalize">{emp.type}</td>
                        <td className="py-2 px-4">{emp.email}</td>
                        <td className="py-2 px-4">
                            <button
                                onClick={() => handleViewDetails(emp.employeeId)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            >
                                View
                            </button>
                        </td>
                    </tr>
                ))}
                {filteredEmployees.length === 0 && (
                    <tr>
                        <td colSpan="5" className="text-center py-4">No employees found.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
