import { useState, useEffect } from "react";
import API from "../../services/api";

function InternDashboard() {
    const [projectData, setProjectData] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [performance, setPerformance] = useState(null);
    const [loading, setLoading] = useState(true);

    const [progressText, setProgressText] = useState("");

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [projRes, tasksRes, perfRes] = await Promise.all([
                    API.get("/projects/my-project").catch(() => ({ data: null })),
                    API.get("/tasks/my-tasks").catch(() => ({ data: [] })),
                    API.get("/performance/my-performance").catch(() => ({ data: null }))
                ]);

                if (projRes.data) setProjectData(projRes.data);
                if (tasksRes.data) setTasks(tasksRes.data);
                if (perfRes.data && perfRes.data.msg !== "No performance report yet.") {
                    setPerformance(perfRes.data);
                }
            } catch (err) {
                console.error("Failed to fetch dashboard data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const handleSubmitProgress = async () => {
        if (!progressText || !projectData) return;
        try {
            await API.post("/reports", {
                projectId: projectData.project._id,
                progress: progressText,
                timeSpent: 8,
                delayedTasks: 0
            });

            // Log activity
            await API.post("/activity", { action: "Edited daily progress", status: "online" });

            alert("Progress submitted!");
            setProgressText("");
        } catch (err) {
            alert("Failed to submit progress");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Workspace</h1>
                <p className="text-gray-500 mt-2 text-lg">Manage your tasks, track your project details, and submit daily progress.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column (Project & Progress) */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Assigned Project */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-bl-full -mr-10 -mt-10 opacity-70 group-hover:scale-110 transition-transform duration-500"></div>
                        
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between relative z-10">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3">📁</span>
                                Assigned Project
                            </h2>
                            {projectData && (
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active</span>
                            )}
                        </div>

                        <div className="p-6 relative z-10">
                            {projectData ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Project Name</p>
                                        <p className="text-2xl font-bold text-gray-900">{projectData.project.name}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">My Role</p>
                                            <p className="text-lg font-bold text-blue-700">{projectData.role || "Pending"}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Manager</p>
                                            <p className="text-lg font-bold text-gray-800">{projectData.project.manager?.name}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Project Deadline</p>
                                                <p className="text-md font-bold text-gray-800">{new Date(projectData.project.dueDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-xl border border-gray-100">📅</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
                                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                    </div>
                                    <p className="text-gray-500 font-medium text-lg">Not Assigned Yet</p>
                                    <p className="text-gray-400 mt-1">Wait for your manager to invite you to a project.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Progress Submission */}
                    {projectData && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <span className="w-8 h-8 rounded bg-cyan-100 text-cyan-600 flex items-center justify-center mr-3">📝</span>
                                    Submit Daily Progress
                                </h2>
                            </div>
                            <div className="p-6 bg-gray-50/30">
                                <div className="relative">
                                    <textarea
                                        className="w-full bg-white border border-gray-200 rounded-xl p-4 h-36 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow shadow-inner"
                                        placeholder="What tasks did you complete today? Any blockers?"
                                        value={progressText}
                                        onChange={(e) => setProgressText(e.target.value)}
                                    ></textarea>
                                </div>
                                <button
                                    onClick={handleSubmitProgress}
                                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl shadow-md transition-all flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                    Submit Report to Manager
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Tasks & Mini Performance) */}
                <div className="lg:col-span-5 space-y-8">
                    
                    {/* My Tasks */}
                    {projectData && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold flex items-center">
                                        <svg className="w-6 h-6 mr-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                        My Action Items
                                    </h2>
                                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">{tasks.length}</span>
                                </div>
                            </div>
                            
                            <div className="p-0">
                                {tasks.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">☕</div>
                                        <p className="text-gray-500 font-medium">You're all caught up!</p>
                                        <p className="text-xs text-gray-400 mt-1">No pending tasks right now.</p>
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-gray-100">
                                        {tasks.map(task => (
                                            <li key={task._id} className="p-5 hover:bg-blue-50/30 transition-colors group">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start space-x-3">
                                                        <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex shrink-0 ${task.status === 'completed' ? 'bg-green-500 border-green-500 text-white items-center justify-center' : 'border-gray-300'}`}>
                                                            {task.status === 'completed' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold text-sm ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-800 group-hover:text-blue-700 transition-colors'}`}>{task.title}</p>
                                                            {task.deadline && <p className="text-xs text-gray-500 mt-1 flex items-center">
                                                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                Due: {new Date(task.deadline).toLocaleDateString()}
                                                            </p>}
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 text-[10px] font-extrabold rounded-full uppercase tracking-wider shrink-0 ml-2 ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                        {task.status}
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Performance Report Mini Card */}
                    {projectData && performance && (
                        <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay opacity-10 -mr-10 -mt-10"></div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold flex items-center text-blue-100">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                    Latest Rating
                                </h2>
                                <span className="bg-blue-500/30 px-3 py-1 rounded-full text-xs font-bold border border-blue-400/30">From Manager</span>
                            </div>
                            
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-blue-200 font-bold mb-1">Score</p>
                                    <p className="text-4xl font-extrabold">{performance.score}<span className="text-xl text-blue-400 font-normal">/10</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-wider text-blue-200 font-bold mb-1">Quality</p>
                                    <p className="text-xl font-bold text-green-400">{performance.workQuality || "N/A"}</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                <a href="/performance" className="text-sm font-medium text-blue-300 hover:text-white transition-colors flex items-center justify-center">
                                    View Full Performance Report
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default InternDashboard;