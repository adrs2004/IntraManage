import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [taskInputs, setTaskInputs] = useState({});
    const [perfInputs, setPerfInputs] = useState({});

    const fetchProjects = async () => {
        try {
            const res = await API.get("/projects/manager-projects-detailed");
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleRoleChange = async (projectId, userId, newRole) => {
        try {
            await API.post("/projects/assign-role", { projectId, userId, role: newRole });
            fetchProjects();
        } catch (err) {
            alert("Failed to update role");
        }
    };

    const handleTaskInputChange = (userId, value) => {
        setTaskInputs({ ...taskInputs, [userId]: value });
    };

    const handleAssignTask = async (projectId, userId) => {
        const title = taskInputs[userId];
        if (!title) return;

        try {
            await API.post("/tasks", { projectId, assignedTo: userId, title });
            setTaskInputs({ ...taskInputs, [userId]: "" });
            fetchProjects();
        } catch (err) {
            alert("Failed to assign task");
        }
    };

    const handlePerfChange = (userId, field, value) => {
        setPerfInputs(prev => ({
            ...prev,
            [userId]: {
                ...prev[userId],
                [field]: value
            }
        }));
    };

    const handleRatePerformance = async (userId) => {
        const data = perfInputs[userId];
        if (!data || !data.score || !data.tasksCompleted || !data.delayedTasks || !data.workQuality) {
            alert("Please fill all performance fields.");
            return;
        }

        try {
            await API.post("/performance/rate", {
                internId: userId,
                score: data.score,
                tasksCompleted: data.tasksCompleted,
                delayedTasks: data.delayedTasks,
                workQuality: data.workQuality
            });
            alert("Performance rated successfully!");
            fetchProjects();
        } catch (err) {
            alert("Failed to rate performance");
        }
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
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Project Management</h1>
                    <p className="text-gray-500 mt-2 text-lg">Oversee all your projects, assign tasks to interns, and monitor their performance.</p>
                </div>

                {projects.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-4xl">📁</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No active projects</h3>
                        <p className="text-gray-500">You haven't created any projects yet. Go to "Create Project" to get started.</p>
                    </div>
                ) : null}

                <div className="space-y-8">
                    {projects.map(project => (
                        <div key={project._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Project Header */}
                            <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 border-b border-teal-100 flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                        {project.name}
                                    </h2>
                                    <p className="text-sm font-mono text-teal-700 bg-teal-100 px-3 py-1 rounded-full inline-flex mt-3 shadow-sm">
                                        Passcode: {project.passcode}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mr-3">Team Size</span>
                                    <span className="text-xl font-extrabold text-teal-600">{project.members.length}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    Interns & Roles
                                </h3>

                                {project.members.length === 0 ? (
                                    <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-8 text-center">
                                        <p className="text-gray-500 font-medium">No interns have joined this project yet.</p>
                                        <p className="text-xs text-gray-400 mt-1">Share the passcode ({project.passcode}) with interns.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {project.members.map(member => (
                                            <div key={member.user._id} className="border border-gray-200 p-0 rounded-xl overflow-hidden hover:border-teal-300 transition-colors">
                                                
                                                {/* Top row: Name & Role */}
                                                <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold mr-3 shadow-sm">
                                                                {member.user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-lg text-gray-900">{member.user.name}</p>
                                                                <p className="text-xs text-gray-500">{member.user.email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center space-x-4">
                                                        <div className="bg-white px-3 py-1 rounded border border-gray-200 shadow-sm text-sm">
                                                            <span className="text-gray-500 mr-2">Score:</span>
                                                            <span className="font-bold text-teal-600">{member.performanceScore}/10</span>
                                                        </div>
                                                        <select
                                                            className="border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm"
                                                            value={member.role || "intern"}
                                                            onChange={(e) => handleRoleChange(project._id, member.user._id, e.target.value)}
                                                        >
                                                            <option value="intern">Intern (Unassigned)</option>
                                                            <option value="Leader">Leader</option>
                                                            <option value="Frontend">Frontend</option>
                                                            <option value="Backend">Backend</option>
                                                            <option value="Testing">Testing</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white">
                                                    {/* Left Column: Progress & Tasks */}
                                                    <div className="space-y-4">
                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 flex items-center">
                                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                                Daily Progress
                                                            </span>
                                                            <p className="text-sm text-gray-700 italic border-l-2 border-teal-400 pl-3 py-1 bg-white rounded">
                                                                {member.dailyProgress || "No progress reported yet."}
                                                            </p>
                                                        </div>

                                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3 flex items-center">
                                                                <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                                                Assign Task
                                                            </span>
                                                            <div className="flex gap-2 mb-4">
                                                                <input
                                                                    type="text"
                                                                    className="flex-1 border-gray-300 rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                                                                    placeholder="Describe the new task..."
                                                                    value={taskInputs[member.user._id] || ""}
                                                                    onChange={(e) => handleTaskInputChange(member.user._id, e.target.value)}
                                                                />
                                                                <button
                                                                    onClick={() => handleAssignTask(project._id, member.user._id)}
                                                                    className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
                                                                >
                                                                    Assign
                                                                </button>
                                                            </div>
                                                            
                                                            {member.tasks.length > 0 && (
                                                                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                                                    <ul className="divide-y divide-gray-100 text-sm">
                                                                        {member.tasks.map(t => (
                                                                            <li key={t._id} className="p-3 flex justify-between items-center hover:bg-gray-50">
                                                                                <span className="text-gray-800 font-medium truncate pr-4">{t.title}</span>
                                                                                <span className={`px-2.5 py-1 text-xs font-bold rounded-full whitespace-nowrap ${t.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                                                    {t.status.toUpperCase()}
                                                                                </span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Right Column: Rate Performance Form */}
                                                    <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-5 rounded-lg border border-teal-100 h-full flex flex-col">
                                                        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block mb-4 flex items-center">
                                                            <svg className="w-4 h-4 mr-1 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                                                            Rate Performance
                                                        </span>
                                                        
                                                        <div className="grid grid-cols-2 gap-4 flex-1">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-1 block">Score /10</label>
                                                                <input type="number" max="10" min="0" className="border-gray-300 w-full rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
                                                                    onChange={(e) => handlePerfChange(member.user._id, 'score', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-1 block">Completed</label>
                                                                <input type="number" min="0" className="border-gray-300 w-full rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
                                                                    onChange={(e) => handlePerfChange(member.user._id, 'tasksCompleted', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-1 block">Delayed</label>
                                                                <input type="number" min="0" className="border-gray-300 w-full rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm"
                                                                    onChange={(e) => handlePerfChange(member.user._id, 'delayedTasks', e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-1 block">Quality</label>
                                                                <select className="border-gray-300 w-full rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-sm bg-white"
                                                                    onChange={(e) => handlePerfChange(member.user._id, 'workQuality', e.target.value)}
                                                                >
                                                                    <option value="">Select...</option>
                                                                    <option value="Excellent">Excellent</option>
                                                                    <option value="Good">Good</option>
                                                                    <option value="Fine">Fine</option>
                                                                    <option value="Poor">Poor</option>
                                                                    <option value="Learn">Learn</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg text-sm mt-4 shadow-sm transition-colors flex items-center justify-center"
                                                            onClick={() => handleRatePerformance(member.user._id)}
                                                        >
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                                                            Submit Rating
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Projects;
