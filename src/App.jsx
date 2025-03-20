import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {SupervisorHome} from "./pages/SupervisorHome";
import {ManagerHome} from "./pages/ManagerHome";
import {EmployeeHome} from "./pages/EmployeeHome";
import {CustomerHome} from "./pages/CustomerHome";
import "./index.css"; // Import TailwindCSS styles

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100 text-gray-900">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/supervisor" element={<SupervisorHome />} />
                    <Route path="/manager" element={<ManagerHome />} />
                    <Route path="/employee" element={<EmployeeHome />} />
                    <Route path="/customer" element={<CustomerHome />} />
                </Routes>
            </div>
        </Router>
    );
}
export default App;