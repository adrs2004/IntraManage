import Project from "../models/Project.js";
import User from "../models/User.js";


// 🔹 CREATE PROJECT (Manager)
export const createProject = async (req, res) => {
    try {
        const { name, description, startDate, dueDate, priority, passcode } = req.body;

        const project = await Project.create({
            name,
            description,
            startDate,
            dueDate,
            priority,
            passcode,
            manager: req.user._id,
        });

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 🔹 JOIN PROJECT USING PASSCODE (Intern)
export const joinProject = async (req, res) => {
    const { passcode } = req.body;

    const project = await Project.findOne({ passcode });

    if (!project) return res.status(404).json({ msg: "Invalid passcode" });

    const alreadyMember = project.members.find(
        (m) => m.user.toString() === req.user._id.toString()
    );

    if (alreadyMember) {
        return res.status(400).json({ msg: "Already joined" });
    }

    project.members.push({
        user: req.user._id,
        role: "intern",
    });

    await project.save();

    res.json({ msg: "Joined project", project });
};


// 🔹 ASSIGN ROLE (Manager)
export const assignRole = async (req, res) => {
    try {
        const { projectId, userId, role } = req.body;

        const project = await Project.findById(projectId);

        const member = project.members.find(
            (m) => m.user.toString() === userId
        );

        if (member) {
            member.role = role;
        }

        await project.save();

        res.json({ msg: "Role assigned successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 🔹 GET PROJECT DETAILS
export const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate("manager", "name email")
            .populate("members.user", "name email role");

        res.json(project);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 GET MY PROJECT (Intern)
export const getMyProject = async (req, res) => {
    try {
        const project = await Project.findOne({ "members.user": req.user._id })
            .populate("manager", "name email");

        if (!project) return res.status(404).json({ msg: "No project assigned yet." });

        const myRole = project.members.find(m => m.user.toString() === req.user._id.toString()).role;

        res.json({ project, role: myRole });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 GET MANAGER DASHBOARD STATS
export const getManagerDashboard = async (req, res) => {
    try {
        const projects = await Project.find({ manager: req.user._id }).populate("members.user", "name email");
        
        let totalInterns = 0;
        let activeProjects = [];

        projects.forEach(p => {
            totalInterns += p.members.filter(m => m.user !== null).length;
            if (p.status !== "closure") {
                activeProjects.push(p);
            }
        });

        res.json({
            projectCount: projects.length,
            internCount: totalInterns,
            overdueTasks: 0, // Placeholder
            reportsCount: 0, // Placeholder
            activeProjects 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

import Report from "../models/Report.js";
import Task from "../models/Task.js";
import Performance from "../models/Performance.js";

// 🔹 GET MANAGER PROJECTS DETAILED
export const getManagerProjectsDetailed = async (req, res) => {
    try {
        const projects = await Project.find({ manager: req.user._id }).populate("members.user", "name email");
        
        let detailedProjects = [];

        for (let p of projects) {
            let membersDetailed = [];

            for (let member of p.members) {
                if (!member.user) continue; // Skip if user has been deleted
                
                // Fetch the latest report for daily progress
                const latestReport = await Report.findOne({ project: p._id, intern: member.user._id }).sort({ _id: -1 });
                // Fetch tasks assigned to this intern for this project
                const tasks = await Task.find({ project: p._id, assignedTo: member.user._id });
                // Fetch performance
                const performance = await Performance.findOne({ intern: member.user._id });

                membersDetailed.push({
                    user: member.user,
                    role: member.role,
                    dailyProgress: latestReport ? latestReport.progress : "No recent updates.",
                    performanceScore: performance ? performance.score : "N/A",
                    tasks: tasks
                });
            }

            detailedProjects.push({
                _id: p._id,
                name: p.name,
                passcode: p.passcode,
                members: membersDetailed
            });
        }

        res.json(detailedProjects);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};