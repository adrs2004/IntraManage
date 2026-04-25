import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function ActivityTimeline() {
    const [teamStatus, setTeamStatus] = useState([]);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await API.get("/activity/team");
            setTeamStatus(res.data.teamStatus);
            setLogs(res.data.logs);
        } catch (err) {
            console.error("Failed to fetch activity data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // Auto refresh every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'online': return { dot: 'bg-green-500 animate-pulse', text: 'text-green-600', bg: 'bg-green-50' };
            case 'idle': return { dot: 'bg-yellow-400', text: 'text-yellow-600', bg: 'bg-yellow-50' };
            default: return { dot: 'bg-gray-400', text: 'text-gray-500', bg: 'bg-gray-50' };
        }
    };

    const formatTime = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-4 max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Activity Timeline</h1>
                    <p className="text-gray-500 mt-2 text-lg">Monitor real-time team presence and recent project updates.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Live Team Status */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-6 overflow-hidden">
                            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 border-b border-teal-100 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center">
                                    <span className="relative flex h-3 w-3 mr-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-600"></span>
                                    </span>
                                    Team Presence
                                </h2>
                                <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-1 rounded-full">{teamStatus.length} Online</span>
                            </div>
                            
                            <div className="p-4">
                                {teamStatus.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-sm text-gray-500">No interns assigned to your projects yet.</p>
                                    </div>
                                ) : (
                                    <ul className="space-y-3">
                                        {teamStatus.map(intern => {
                                            const statusStyle = getStatusStyle(intern.status);
                                            return (
                                                <li key={intern._id} className={`flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-gray-100 transition-all ${statusStyle.bg}`}>
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 font-bold mr-3 border border-gray-100">
                                                            {intern.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-sm">{intern.name}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {intern.status === 'online' ? 'Active now' : `Last seen: ${intern.lastActiveAt ? formatTime(intern.lastActiveAt) : 'Never'}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className={`w-3 h-3 rounded-full shadow-sm mb-1 ${statusStyle.dot}`}></span>
                                                        <span className={`text-[10px] font-extrabold uppercase tracking-wider ${statusStyle.text}`}>{intern.status}</span>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activity Feed */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mr-3 text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Recent Activity Feed</h2>
                            </div>
                            
                            <div className="p-6">
                                {logs.length === 0 ? (
                                    <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                                        <svg className="mx-auto h-12 w-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        <p className="text-sm text-gray-500 font-medium">No recent activity found.</p>
                                    </div>
                                ) : (
                                    <div className="relative pl-4 border-l-2 border-teal-100 space-y-8 py-2">
                                        {logs.map((log, idx) => (
                                            <div key={log._id} className="relative group">
                                                {/* Timeline dot */}
                                                <div className="absolute -left-[21px] mt-1.5 w-3 h-3 bg-white border-2 border-teal-500 rounded-full group-hover:bg-teal-500 transition-colors shadow-sm"></div>
                                                
                                                <div className="ml-6 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md hover:border-teal-200 transition-all">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <p className="text-sm">
                                                            <span className="font-bold text-gray-900">{log.user?.name || "Unknown User"}</span>
                                                        </p>
                                                        <span className="text-xs font-semibold text-gray-400 bg-white px-2 py-1 rounded shadow-sm border border-gray-100">
                                                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">{log.action}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default ActivityTimeline;