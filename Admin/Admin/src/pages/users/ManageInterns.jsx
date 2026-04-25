import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function ManageInterns() {
    const [interns, setInterns] = useState([]);

    const fetchInterns = async () => {
        try {
            const res = await API.get("/admin/interns");
            setInterns(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchInterns();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this intern?")) return;
        try {
            await API.delete(`/admin/users/${id}`);
            fetchInterns();
        } catch (err) {
            alert("Failed to delete intern");
        }
    };

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Interns</h1>
                    <p className="text-gray-500 mt-2 text-lg">View and manage all interns registered in the system.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800">Registered Interns</h2>
                        <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">{interns.length} Total</span>
                    </div>
                    
                    <div className="p-6 bg-gray-50/30">
                        {interns.length === 0 ? (
                            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
                                <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className="text-gray-500 font-medium text-lg">No interns found.</p>
                                <p className="text-gray-400 mt-1">Interns will appear here once they register.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {interns.map((intern) => (
                                    <div key={intern._id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 hover:border-purple-200 transition-all duration-300 overflow-hidden group">
                                        <div className="h-2 bg-gradient-to-r from-purple-400 to-indigo-500"></div>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-50 to-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 font-bold text-xl mr-4 group-hover:scale-110 transition-transform">
                                                        {intern.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 text-lg truncate w-32 sm:w-auto" title={intern.name}>{intern.name}</h3>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                                            Intern
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                    <span className="truncate" title={intern.email}>{intern.email}</span>
                                                </div>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                                                    <span>EMP ID: {intern.empId || "N/A"}</span>
                                                </div>
                                            </div>

                                            <div className="mt-6">
                                                <button 
                                                    onClick={() => handleDelete(intern._id)}
                                                    className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-transparent rounded-lg hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    Revoke Access
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ManageInterns;