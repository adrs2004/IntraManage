export const validateProject = (req, res, next) => {
    const { name, description, passcode } = req.body;

    if (!name || !description || !passcode) {
        return res.status(400).json({ msg: "Project fields missing" });
    }

    if (passcode.length < 4) {
        return res.status(400).json({ msg: "Passcode must be at least 4 characters" });
    }

    next();
};