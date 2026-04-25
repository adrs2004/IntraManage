import User from "../models/User.js";
import Project from "../models/Project.js";

export const getSystemStats = async (req, res) => {
    try {
        const totalManagers = await User.countDocuments({ role: "manager" });
        const totalInterns = await User.countDocuments({ role: "intern" });
        const totalProjects = await Project.countDocuments();
        const activeProjects = await Project.countDocuments({ status: { $ne: "closure" } });

        res.json({
            managers: totalManagers,
            interns: totalInterns,
            projects: totalProjects,
            activeProjects: activeProjects,
            systemStatus: "Healthy"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getManagers = async (req, res) => {
    try {
        const managers = await User.find({ role: "manager" }).select("-password");
        res.json(managers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getInterns = async (req, res) => {
    try {
        const interns = await User.find({ role: "intern" }).select("-password");
        res.json(interns);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: "User not found" });

        // Remove user from all projects they are a member of
        await Project.updateMany(
            { "members.user": user._id },
            { $pull: { members: { user: user._id } } }
        );

        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
