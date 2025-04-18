import React from "react";
import { useNavigate } from "react-router-dom";

export function ManagerHome() {
    const navigate = useNavigate();

    return (
        <div
            className="page-background"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>

                {/* Buttons */}
                <div className="space-y-4 w-80">
                    <button
                        onClick={() => navigate("/Employee/ViewEmployeeInfo")}
                        className="btn-primary"
                    >
                        View Personal Information
                    </button>

                    <button
                        onClick={() => navigate("/ManagerOptions/OrderItem")}
                        className="btn-primary"
                    >
                        Order Item
                    </button>
                    <button
                        onClick={() => navigate("/ManagerOptions/ViewCategories")}
                        className="btn-primary"
                    >
                        View Categories
                    </button>
                    <button
                        onClick={() => navigate("/ManagerOptions/StockReport")}
                        className="btn-primary"
                    >
                        View Stock Report
                    </button>

                    <button
                        onClick={() => navigate("/ManagerOptions/AddHourlyEmployee")}
                        className="btn-primary"
                    >
                        Add Hourly Employee
                    </button>
                    <button
                        onClick={() => navigate("/ManagerOptions/AddSalariedEmployee")}
                        className="btn-primary"
                    >
                        Add Salaried Employee
                    </button>

                    <button
                        onClick={() => navigate("/ManagerOptions/ViewEmployees")}
                        className="btn-primary"
                    >
                        View Employees
                    </button>
                </div>
            </div>
        </div>
    );
}
