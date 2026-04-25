import Performance from "../models/Performance.js";
import Task from "../models/Task.js";

// 🔹 RATE PERFORMANCE (Manager)
export const ratePerformance = async (req, res) => {
    try {
        const { internId, score, tasksCompleted, delayedTasks, workQuality } = req.body;

        let perf = await Performance.findOne({ intern: internId });

        if (!perf) {
            perf = await Performance.create({
                intern: internId,
                score,
                tasksCompleted,
                delayCount: delayedTasks,
                workQuality
            });
        } else {
            perf.score = score;
            perf.tasksCompleted = tasksCompleted;
            perf.delayCount = delayedTasks;
            perf.workQuality = workQuality;
            await perf.save();
        }

        res.json({ msg: "Performance rated successfully", perf });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 🔹 GET MY PERFORMANCE (Intern)
export const getMyPerformance = async (req, res) => {
    try {
        const perf = await Performance.findOne({ intern: req.user._id });
        if (!perf) return res.status(404).json({ msg: "No performance report yet." });
        
        res.json(perf);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};