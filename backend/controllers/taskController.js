import Task from "../models/Task.js";
import SubTask from "../models/SubTask.js";

export const createSubTask = async (req, res) => {
    try {
        const { taskId, title } = req.body;
        const subtask = await SubTask.create({
            task: taskId,
            title,
            status: "pending",
        });
        res.status(201).json(subtask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};// 🔹 CREATE TASK
export const createTask = async (req, res) => {
    try {
        const { projectId, title, assignedTo, deadline } = req.body;

        const task = await Task.create({
            project: projectId,
            title,
            assignedTo,
            deadline,
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 🔹 GET TASKS BY PROJECT
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId })
            .populate("assignedTo", "name");

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 GET MY TASKS (Intern)
export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 🔹 UPDATE TASK STATUS
export const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const task = await Task.findById(req.params.id);
        task.status = status;

        await task.save();

        res.json(task);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};