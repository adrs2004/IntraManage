import { useState, useEffect } from "react";

import API from "../../services/api";

function ManagerDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/projects/manager-dashboard");
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manager Dashboard</h1>
                        <p className="text-gray-500 mt-2 text-lg">Your high-level overview of projects, interns, and tasks.</p>
                    </div>
                    <div className="flex items-center space-x-2 bg-teal-50 px-4 py-2 rounded-full border border-teal-100 shadow-sm">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
                        </span>
                        <span className="text-sm font-semibold text-teal-700">Live Dashboard</span>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {[
                        { label: "Total Projects", value: stats?.projectCount || 0, icon: "📁", color: "from-green-50 to-teal-50" },
                        { label: "Active Interns", value: stats?.internCount || 0, icon: "🎓", color: "from-teal-50 to-emerald-50" },
                        { label: "Overdue Tasks", value: stats?.overdueTasks || 0, icon: "⚠️", color: "from-red-50 to-orange-50", highlight: true },
                        { label: "Reports Filed", value: stats?.reportsCount || 0, icon: "📈", color: "from-emerald-50 to-cyan-50" },
                    ].map((stat, idx) => (
                        <div key={idx} className={`bg-white p-6 rounded-2xl shadow-sm border ${stat.highlight ? 'border-red-200' : 'border-gray-100'} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}>
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-bl-full -mr-4 -mt-4 opacity-70 group-hover:scale-110 transition-transform duration-500`}></div>
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                                <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{stat.label}</span>
                                <span className={`text-4xl font-extrabold ${stat.highlight && stat.value > 0 ? 'text-red-500' : 'text-gray-800'}`}>{stat.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Welcome Card */}
                <div className="mt-10 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay opacity-10 -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 -ml-10 -mb-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
                        <p className="text-teal-50 max-w-2xl text-lg">
                            Use the sidebar to create new projects, assign roles to interns, manage tasks, and rate performance.
                        </p>
                    </div>
                </div>
            </div>
    );
}

export default ManagerDashboard;