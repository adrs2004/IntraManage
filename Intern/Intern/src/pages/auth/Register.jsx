import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import Lottie from "lottie-react";
import adminAnimation from "../../animations/signup.json";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        empId: "",
        email: "",
        password: "",
        passcode: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            await API.post("/auth/register", {
                ...form,
                role: "intern",
            });

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.msg || "Register failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left side with illustration */}
            <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
                <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply opacity-30"></div>
                <div className="absolute right-20 bottom-0 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply opacity-30"></div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-[-80%] w-64 h-64 bg-sky-200 rotate-45 opacity-30"></div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center p-12">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Intern Portal</h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Register for intern access to join projects and start collaborating.
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
                        <div className="absolute -left-6 -top-4 w-12 h-12 bg-blue-500 rounded-full mix-blend-multiply opacity-20"></div>
                        <div className="absolute -right-6 -bottom-4 w-12 h-12 bg-cyan-500 rounded-full mix-blend-multiply opacity-20"></div>
                        <div className="relative text-center">
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className="h-1.5 flex">
                            <div className="w-1/3 bg-blue-500"></div>
                            <div className="w-1/3 bg-cyan-500"></div>
                            <div className="w-1/3 bg-sky-500"></div>
                        </div>

                        <div className="p-8">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium border border-red-200 text-center">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleRegister} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Intern Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                                    <input
                                        type="text"
                                        name="empId"
                                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors"
                                        value={form.empId}
                                        onChange={handleChange}
                                        required
                                        placeholder="EMP-1234"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="intern@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Passcode</label>
                                    <input
                                        type="text"
                                        name="passcode"
                                        className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-transparent transition-colors"
                                        value={form.passcode}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter project passcode"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                            }`}
                                    >
                                        {loading ? "Registering..." : "Register Intern"}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-8">
                                <div className="mt-6">
                                    <Link
                                        to="/login"
                                        className="w-full flex justify-center py-2.5 px-4 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    >
                                        Login to existing intern account
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

export default Register;