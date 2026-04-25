import Report from "../models/Report.js";

export const createReport = async (req, res) => {
    const { projectId, progress, timeSpent, delayedTasks } = req.body;

    const report = await Report.create({
        project: projectId,
        intern: req.user._id,
        progress,
        timeSpent,
        delayedTasks,
    });

    res.json(report);
};


export const getReports = async (req, res) => {
    const reports = await Report.find({ project: req.params.projectId })
        .populate("intern", "name");

    res.json(reports);
};