import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function RegistrationPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", {
                username, password, email
            });

            const { registrationSuccessful } = response.data; // Get response status

            // Navigate to home page if login is successful
            if (registrationSuccessful) {
                navigate("/");
            } else {
                setError("Login failed. Please check your credentials.");
            }

        } catch (err) {
            setError(err.message("Invalid username or password"));
        }
    };
    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/")}
                        className="text-green-600 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
