import ActivityLog from "../models/ActivityLog.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

export const logActivity = async (req, res) => {
    try {
        const { action, status } = req.body;

        const log = await ActivityLog.create({
            user: req.user._id,
            action,
            status,
        });

        res.json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getActivities = async (req, res) => {
    try {
        const logs = await ActivityLog.find()
            .populate("user", "name")
            .sort({ timestamp: -1 });

        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 GET TEAM ACTIVITY AND STATUS (Manager)
export const getTeamActivityAndStatus = async (req, res) => {
    try {
        // Find all projects managed by this manager
        const projects = await Project.find({ manager: req.user._id });
        
        let internIds = [];
        projects.forEach(p => {
            p.members.forEach(m => internIds.push(m.user));
        });

        // Get those interns
        const interns = await User.find({ _id: { $in: internIds } });

        // Calculate their presence status
        const teamStatus = interns.map(intern => {
            let currentStatus = "offline";
            if (intern.lastActiveAt) {
                const diffMs = Date.now() - new Date(intern.lastActiveAt).getTime();
                const diffMins = Math.floor(diffMs / 60000);

                if (diffMins < 2) currentStatus = "online";
                else if (diffMins < 15) currentStatus = "idle";
            }

            return {
                _id: intern._id,
                name: intern.name,
                email: intern.email,
                status: currentStatus,
                lastActiveAt: intern.lastActiveAt
            };
        });

        // Get activity logs for these interns
        const logs = await ActivityLog.find({ user: { $in: internIds } })
            .populate("user", "name")
            .sort({ timestamp: -1 })
            .limit(50); // Just the latest 50 activities

        res.json({ teamStatus, logs });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};