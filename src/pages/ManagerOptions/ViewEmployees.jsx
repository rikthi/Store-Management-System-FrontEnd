import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export function ViewEmployees() {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("ALL");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/${user.storeId}/employees`);
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        };
        fetchEmployees();
    }, [user]);

    useEffect(() => {
        let temp = employees;

        if (searchTerm) {
            temp = temp.filter((emp) => emp.id.toString().includes(searchTerm));
        }

        if (filterType !== "ALL") {
            temp = temp.filter((emp) => emp.role === filterType);
        }

        setFilteredEmployees(temp);
    }, [searchTerm, employees, filterType]);

    const handleViewDetails = (employeeId, role) => {
        if (role === "SUPERVISOR") {
            navigate(`/ManagerOptions/EditEmployee/${employeeId}`);
        } else if (role === "HOURLY_EMPLOYEE") {
            navigate(`/ManagerOptions/EditHourlyEmployee/${employeeId}`);
        } else if (role === "SALARIED_EMPLOYEE") {
            navigate(`/ManagerOptions/EditSalariedEmployee/${employeeId}`);
        } else {
            navigate(`/ManagerOptions/EditEmployee/${employeeId}`);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-start min-h-screen bg-cover bg-center p-10"
             style={{ backgroundImage: "url('../src/assets/loginBg.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />

            {/* Heading */}
            <h1 className="text-3xl font-bold text-white mt-20 mb-6">View Employees</h1>

            {/* Search + Filter Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6 w-full max-w-6xl">
                <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded w-[60%] min-w-[250px]"
                />

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilterType("SUPERVISOR")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-200"
                    >
                        Supervisors
                    </button>
                    <button
                        onClick={() => setFilterType("HOURLY_EMPLOYEE")}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 hover:scale-105 transition-transform duration-200"
                    >
                        Hourly
                    </button>
                    <button
                        onClick={() => setFilterType("SALARIED_EMPLOYEE")}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-200"
                    >
                        Salaried
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="w-full max-w-6xl overflow-x-auto bg-white bg-opacity-90 p-4 rounded shadow">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Phone</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">DOB</th>
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
                            <td className="px-4 py-2">{emp.role}</td>
                            <td className="px-4 py-2">{emp.phoneNumber}</td>
                            <td className="px-4 py-2">{emp.emailAddress}</td>
                            <td className="px-4 py-2">{emp.dateOfBirth || "N/A"}</td>
                            <td className="px-4 py-2">{emp.address}</td>
                            <td className="px-4 py-2">{emp.supervisorId ?? "N/A"}</td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleViewDetails(emp.id, emp.role)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-800"
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
