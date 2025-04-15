
import { useNavigate } from "react-router-dom";
export function SupervisorHome() {
    const navigate = useNavigate();


    return (
        <div
            className="page-background"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            {/* Overlay with 50% opacity */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content container positioned above the overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800">Supervisor Dashboard</h1>

                {/* Buttons */}
                <div className="space-y-4 w-80">
                    <button
                        onClick={() => navigate("/Employee/ViewEmployeeInfo")}
                        className="btn-primary"
                    >
                        View Personal Information
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