import { useState, useEffect } from "react";
import API from "../../services/api";

function AdminDashboard() {
    const [stats, setStats] = useState({ managers: 0, interns: 0, projects: 0, activeProjects: 0, systemStatus: "Loading..." });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await API.get("/admin/stats");
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats", err);
                setStats(prev => ({ ...prev, systemStatus: "Error" }));
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Overview</h1>
                    <p className="text-gray-500 mt-2 text-lg">Monitor platform statistics and system health.</p>
                </div>
                <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-100 shadow-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
                    </span>
                    <span className="text-sm font-semibold text-purple-700">Live Updates</span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                    { label: "Total Managers ", value: stats.managers, icon: "👥" },
                    { label: "Total Interns", value: stats.interns, icon: "🎓" },
                    { label: "Total Projects", value: stats.projects, icon: "📁" },
                    { label: "Active Projects", value: stats.activeProjects, icon: "🚀" },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-bl-full -mr-4 -mt-4 opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{stat.icon}</div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">{stat.label}</span>
                            <span className="text-4xl font-extrabold text-gray-800">{stat.value}</span>
                        </div>
                    </div>
                ))}

                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl shadow-lg border border-purple-500 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden sm:col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full mix-blend-overlay opacity-10 -ml-8 -mb-8"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                        <div className="text-4xl mb-4">⚙️</div>
                        <span className="text-xs text-purple-200 uppercase tracking-widest font-bold mb-1">System Status</span>
                        <span className="text-2xl font-bold text-white mt-1">{stats.systemStatus}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;