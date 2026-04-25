import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API from "../../services/api";
import Lottie from "lottie-react";
import adminAnimation from "../../animations/Login.json";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [emailOrEmpId, setEmailOrEmpId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const res = await API.post("/auth/login", {
                emailOrEmpId,
                password,
            });

            if (!res.data.role || res.data.role !== "admin") {
                setError("Unauthorized access");
                setLoading(false);
                return;
            }

            login(res.data);
            navigate("/dashboard");

        } catch (err) {
            setError(err.response?.data?.msg || "Login failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left side with illustration */}
            <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply opacity-30"></div>
                <div className="absolute right-20 bottom-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply opacity-30"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-80%] w-64 h-64 bg-violet-200 rotate-45 opacity-30"></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center p-12">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Portal</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Access the administrative dashboard to manage users, issues, and system settings.
                        </p>
                        <div className="p-4">
                            {Lottie.default ? <Lottie.default animationData={adminAnimation} loop={true} className="w-100 h-100" /> : <Lottie animationData={adminAnimation} loop={true} className="w-100 h-100" />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side with form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    <div className="relative mb-10">
                        <div className="absolute -left-6 -top-4 w-12 h-12 bg-purple-500 rounded-full mix-blend-multiply opacity-20"></div>
                        <div className="absolute -right-6 -bottom-4 w-12 h-12 bg-indigo-500 rounded-full mix-blend-multiply opacity-20"></div>
                        <div className="relative text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Admin <span className="text-purple-600">Login</span>
                            </h1>
                            <p className="text-gray-600">Access your admin dashboard</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-1.5 flex">
                            <div className="w-1/3 bg-purple-500"></div>
                            <div className="w-1/3 bg-indigo-500"></div>
                            <div className="w-1/3 bg-violet-500"></div>
                        </div>

                        <div className="p-8">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium border border-red-200 text-center">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email or EmpID</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                                            value={emailOrEmpId}
                                            onChange={(e) => setEmailOrEmpId(e.target.value)}
                                            required
                                            placeholder="admin@example.com"
                                        />
                                        <div className="absolute right-0 bottom-3 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-purple-500 focus:outline-none bg-transparent transition-colors"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="••••••••"
                                        />
                                        <div className="absolute right-0 bottom-3 text-gray-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${
                                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                                        }`}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing in...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                Sign In
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Restricted access</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        to="/register"
                                        className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                                    >
                                        Request admin access
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;