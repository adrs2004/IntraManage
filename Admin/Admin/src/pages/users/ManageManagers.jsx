import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function ManageManagers() {
    const [form, setForm] = useState({ email: "", uniqueCode: "" });
    const [msg, setMsg] = useState(null);
    const [managers, setManagers] = useState([]);

    const fetchManagers = async () => {
        try {
            const res = await API.get("/admin/managers");
            setManagers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchManagers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleInvite = async () => {
        try {
            const res = await API.post("/auth/invite-manager", form);
            setMsg({ type: "success", text: res.data.msg });
            setForm({ email: "", uniqueCode: "" });
        } catch (err) {
            setMsg({ type: "error", text: err.response?.data?.msg || err.response?.data?.error || "Failed to invite manager" });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this manager?")) return;
        try {
            await API.delete(`/admin/users/${id}`);
            fetchManagers();
        } catch (err) {
            alert("Failed to delete manager");
        }
    };

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manage Managers</h1>
                    <p className="text-gray-500 mt-2 text-lg">Invite new management staff and oversee existing manager accounts.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Invite Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 text-purple-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">Invite Manager</h2>
                            </div>
                            
                            {msg && (
                                <div className={`p-4 mb-6 text-sm rounded-lg border flex items-start ${msg.type === "success" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                                    <svg className={`w-5 h-5 mr-2 shrink-0 ${msg.type === 'success' ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {msg.type === 'success' ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>}
                                    </svg>
                                    <span>{msg.text}</span>
                                </div>
                            )}

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Manager Email</label>
                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="manager@example.com"
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-3 transition-colors"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Assign Unique Code</label>
                                    <input
                                        name="uniqueCode"
                                        value={form.uniqueCode}
                                        onChange={handleChange}
                                        placeholder="e.g. MGR-2026-X"
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-3 transition-colors font-mono"
                                    />
                                </div>

                                <button 
                                    onClick={handleInvite}
                                    className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-3.5 text-center transition-all shadow-md hover:shadow-lg flex justify-center items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    Send Invitation
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Managers List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h2 className="text-lg font-bold text-gray-800">Active Managers</h2>
                                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">{managers.length} Total</span>
                            </div>
                            
                            <div className="p-6">
                                {managers.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">No managers found.</p>
                                        <p className="text-gray-400 text-sm mt-1">Use the form to invite your first manager.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-4">
                                        {managers.map((mgr) => (
                                            <li key={mgr._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md hover:bg-purple-50/30 transition-all duration-200 group">
                                                <div className="flex items-center mb-3 sm:mb-0">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-sm group-hover:scale-105 transition-transform">
                                                        {mgr.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-lg">{mgr.name}</p>
                                                        <p className="text-sm text-gray-500 flex items-center mt-1">
                                                            <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                            {mgr.email}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => handleDelete(mgr._id)}
                                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-colors flex justify-center items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ManageManagers;