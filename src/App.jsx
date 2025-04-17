import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebsiteTitle } from './pages/WebsiteTitle.jsx';
import {LoginPage} from "./pages/LoginPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {CreateManager} from "./pages/CreateManager";
import {SupervisorHome} from "./pages/SupervisorHome";
import {ManagerHome} from "./pages/ManagerHome.jsx";
import {HourlyEmployeeHome} from "./pages/HourlyEmployeeHome.jsx";
import {SalariedEmployeeHome} from "./pages/SalariedEmployeeHome.jsx";
import {ViewEmployeeInfo} from "./pages/Employee/ViewEmployeeInfo.jsx";
import {CustomerHome} from "./pages/CustomerHome";
import {AddCustomer} from "./pages/Employee/AddCustomer";
import {CreateReceipt} from "./pages/Employee/CreateReceipt.jsx";
import {AddEmployee} from "./pages/ManagerOptions/AddEmployee.jsx";
import {ViewEmployees} from "./pages/ManagerOptions/ViewEmployees.jsx";
import {OrderItem} from "./pages/ManagerOptions/OrderItem.jsx";
import {ViewCategories} from "./pages/ManagerOptions/ViewCategories.jsx";
import {StockReport} from "./pages/ManagerOptions/StockReport";
import {ViewReceipts} from "./pages/Customer/ViewReceipts.jsx";
import {ViewCustomerInfo} from "./pages/Customer/ViewCustomerInfo.jsx";
import {EditEmployee} from "./pages/ManagerOptions/EditEmployee.jsx";
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
                    <Route path="/Register" element={<RegistrationPage />} />
                    <Route path="/CreateManager" element={<CreateManager />} />
                    <Route path="/Supervisor" element={<SupervisorHome />} />
                    <Route path="/ManagerHome" element={<ManagerHome />} />
                    <Route path="/Hourlyemployee" element={<HourlyEmployeeHome />} />
                    <Route path="/Salariedemployee" element={<SalariedEmployeeHome />} />
                    <Route path="/CustomerHome" element={<CustomerHome />} />
                    <Route path="/Employee/AddCustomer" element={<AddCustomer />} />
                    <Route path="/Employee/CreateReceipt" element={<CreateReceipt />} />
                    <Route path="/Employee/ViewEmployeeInfo" element={<ViewEmployeeInfo />} />
                    <Route path="/ManagerOptions/AddEmployee" element={<AddEmployee />} />
                    <Route path="/ManagerOptions/ViewEmployees" element={<ViewEmployees />} />
                    <Route path="/ManagerOptions/EditEmployee/:employeeId" element={<EditEmployee />} />
                    <Route path="/ManagerOptions/OrderItem" element={<OrderItem />} />
                    <Route path="/ManagerOptions/ViewCategories" element={<ViewCategories />} />
                    <Route path="/ManagerOptions/StockReport" element={<StockReport />} />
                    <Route path="/Customer/ViewReceipts" element={<ViewReceipts/>} />
                    <Route path="/Customer/ViewCustomerInfo" element={<ViewCustomerInfo />} />
                </Routes>
            </div>
        </Router>
        </div>
        </AuthProvider>
    );
}
export default App;