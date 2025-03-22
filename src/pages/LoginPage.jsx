import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center justify-center h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('src/assets/loginBg.jpg')" }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center bg-opacity-90">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition">
                        Log In
                    </button>
                    <button
                        className="w-full bg-gray-300 text-gray-800 p-3 rounded-lg hover:bg-gray-400 transition"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

