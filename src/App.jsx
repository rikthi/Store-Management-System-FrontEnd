import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import { WebsiteTitle } from './pages/WebsiteTitle.jsx';
import {RegistrationPage} from "./pages/RegistrationPage";
import {SupervisorHome} from "./pages/SupervisorHome";
import {ManagerHome} from "./pages/ManagerHome";
import {HourlyEmployeeHome} from "./pages/HourlyEmployeeHome.jsx";
import {SalariedEmployeeHome} from "./pages/SalariedEmployeeHome.jsx";
import {CustomerHome} from "./pages/CustomerHome";
import "./index.css";

function App() {
    return (
        <div>
            <WebsiteTitle />
        <Router>
            <div className="min-h-screen bg-gray-100 text-gray-900">
                <Routes>
                    <Route path="/" element={<SalariedEmployeeHome />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/supervisor" element={<SupervisorHome />} />
                    <Route path="/manager" element={<ManagerHome />} />
                    <Route path="/employee" element={<HourlyEmployeeHome />} />
                    <Route path="/employee" element={<SalariedEmployeeHome />} />
                    <Route path="/customer" element={<CustomerHome />} />
                </Routes>
            </div>
        </Router>
        </div>
    );
}
export default App;