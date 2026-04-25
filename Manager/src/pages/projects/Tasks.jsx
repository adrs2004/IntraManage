import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import API from "../../services/api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    // To simplify for this demo, assume we have a projectId hardcoded or from context
    // You can retrieve the manager's project dynamically.

    const handleCreateTask = async () => {
        try {
            if (!newTaskTitle) return;
            const res = await API.post("/tasks", { 
                projectId: "replace_with_actual_project_id", 
                title: newTaskTitle 
            });
            setTasks([...tasks, res.data]);
            setNewTaskTitle("");
            alert("Task created");
        } catch (err) {
            alert("Failed to create task");
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-6">Tasks Breakdown</h1>

            <div className="bg-white p-6 shadow rounded max-w-lg mb-6">
                <h2 className="text-xl mb-4">Create New Task</h2>
                <div className="flex gap-2">
                    <input 
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task Title"
                        className="border p-2 w-full"
                    />
                    <button 
                        onClick={handleCreateTask}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 shadow rounded">
                <h2 className="text-xl mb-4">Existing Tasks</h2>
                {tasks.length === 0 ? <p className="text-gray-500">No tasks yet.</p> : (
                    <ul>
                        {tasks.map((task, i) => (
                            <li key={i} className="border-b py-2 flex justify-between">
                                <span>{task.title}</span>
                                <span className="text-sm bg-gray-200 px-2 py-1 rounded">{task.status}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
}

export default Tasks;