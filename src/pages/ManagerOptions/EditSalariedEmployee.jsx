import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export function EditSalariedEmployee() {
    const { user } = useAuth();
    const { employeeId } = useParams();

    const [employee, setEmployee] = useState(null);
    const [salary, setSalary] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchSalariedEmployee = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8081/${user.storeId}/employees/getSalariedEmployee`, {
                    params: { employeeId }
                });
                const data = response.data;
                const emp = data.employee;
                emp.dateOfBirth = emp.dateOfBirth?.slice(0, 10) || "";

                setEmployee(emp);
                setSalary(data.salary);
            } catch (err) {
                setError("Failed to fetch salaried employee.");
            } finally {
                setLoading(false);
            }
        };
        fetchSalariedEmployee();
    }, [employeeId, user.storeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await axios.put(`http://localhost:8081/${user.storeId}/employees/update/salariedEmployee/${employeeId}`, {
                employee: employee,
                salary: parseFloat(salary)
            });
            setSuccess("Salaried employee updated successfully!");
        } catch (err) {
            setError("Failed to update salaried employee.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
             style={{ backgroundImage: "url('../../src/assets/loginBg.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50 -z-10" />
            <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-md w-96">
                <h1 className="text-xl font-bold mb-4 text-gray-800">Edit Salaried Employee</h1>

                {loading && <p className="text-blue-500">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                {employee && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={employee.id} disabled className="w-full p-2 border rounded bg-gray-200" />

                        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
                        <input type="text" name="gender" value={employee.gender} onChange={handleChange} placeholder="Gender" className="w-full p-2 border rounded" required />
                        <input type="tel" name="phoneNumber" value={employee.phoneNumber} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" required />
                        <input type="date" name="dateOfBirth" value={employee.dateOfBirth} onChange={handleChange} className="w-full p-2 border rounded" required />
                        <input type="email" name="emailAddress" value={employee.emailAddress} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
                        <textarea name="address" value={employee.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
                        <input type="number" name="supervisorId" value={employee.supervisorId || ""} onChange={handleChange} placeholder="Supervisor ID" className="w-full p-2 border rounded" />

                        <div>
                            <label className="text-sm font-semibold">Salary</label>
                            <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="w-full p-2 border rounded" required />
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
