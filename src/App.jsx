import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LoginPage} from "./pages/LoginPage";
import { WebsiteTitle } from './pages/WebsiteTitle.jsx';
import {RegistrationPage} from "./pages/RegistrationPage";
import {SupervisorHome} from "./pages/SupervisorHome";
import {ManagerHome} from "./pages/Manager/ManagerHome.jsx";
import {HourlyEmployeeHome} from "./pages/HourlyEmployeeHome.jsx";
import {SalariedEmployeeHome} from "./pages/SalariedEmployeeHome.jsx";
import {CustomerHome} from "./pages/CustomerHome";
import {AddCustomer} from "./pages/Employee/AddCustomer";
import {CreateReceipt} from "./pages/Employee/CreateReceipt.jsx";
import "./index.css";
import {AuthProvider} from "./pages/AuthContext.jsx";

function App() {
    return (
        <AuthProvider>
        <div>
            <WebsiteTitle />
        <Router>
            <div className="min-h-screen bg-gray-100 text-gray-900">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />
                    <Route path="/supervisor" element={<SupervisorHome />} />
                    <Route path="/manager" element={<ManagerHome />} />
                    <Route path="/Hemployee" element={<HourlyEmployeeHome />} />
                    <Route path="/Semployee" element={<SalariedEmployeeHome />} />
                    <Route path="/customer" element={<CustomerHome />} />
                    <Route path="/Employee/AddCustomer" element={<AddCustomer />} />
                    <Route path="/Employee/CreateReceipt" element={<CreateReceipt />} />
                </Routes>
            </div>
        </Router>
        </div>
        </AuthProvider>
    );
}
export default App;