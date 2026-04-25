export const validateTask = (req, res, next) => {
    const { title, projectId } = req.body;

    if (!title || !projectId) {
        return res.status(400).json({ msg: "Task title and project required" });
    }

    next();
};