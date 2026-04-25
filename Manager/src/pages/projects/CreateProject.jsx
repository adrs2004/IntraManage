import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function CreateProject() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
        startDate: "",
        dueDate: "",
        priority: "Low",
        passcode: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        try {
            await API.post("/projects/create", form);
            alert("Project Created Successfully!");
            navigate("/dashboard");
        } catch (err) {
            alert(err.response?.data?.msg || err.response?.data?.error || "Failed to create project");
        }
    };

    return (
        <Layout>
            <div className="p-4 max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Project</h1>
                    <p className="text-gray-500 mt-2 text-lg">Define a new project and set up the foundation for your interns.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-400 to-teal-500"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-4">
                        <div className="space-y-6 md:col-span-2">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Project Name</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors"
                                    placeholder="e.g. Hindalco Q3 Analytics Dashboard"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors h-32 resize-none"
                                    placeholder="Briefly describe the goals and scope of this project..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    value={form.startDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Priority Level</label>
                                <select
                                    name="priority"
                                    value={form.priority}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors"
                                >
                                    <option value="Low">Low Priority</option>
                                    <option value="Medium">Medium Priority</option>
                                    <option value="High">High Priority</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Due Date</label>
                                <input
                                    name="dueDate"
                                    type="date"
                                    value={form.dueDate}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Project Passcode</label>
                                <input
                                    name="passcode"
                                    value={form.passcode}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3 transition-colors font-mono"
                                    placeholder="e.g. HINDALCO26"
                                />
                                <p className="text-xs text-gray-500 mt-2 flex items-center">
                                    <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Interns need this passcode to join the project.
                                </p>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4 mt-2 border-t border-gray-100">
                            <button
                                onClick={handleCreate}
                                className="w-full sm:w-auto px-8 py-3.5 text-white bg-teal-600 hover:bg-teal-700 font-medium rounded-lg text-sm transition-all shadow-md hover:shadow-lg flex justify-center items-center float-right"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                Create Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateProject;