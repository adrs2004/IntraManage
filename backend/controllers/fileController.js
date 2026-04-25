import File from "../models/File.js";

// Upload File
export const uploadFile = async (req, res) => {
    try {
        const { projectId } = req.body;

        // find latest version
        const lastFile = await File.findOne({ project: projectId }).sort({ version: -1 });

        const version = lastFile ? lastFile.version + 1 : 1;

        const file = await File.create({
            project: projectId,
            uploadedBy: req.user._id,
            filePath: req.file.path,
            version,
        });

        res.json(file);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get Files
export const getFiles = async (req, res) => {
    const files = await File.find({ project: req.params.projectId });
    res.json(files);
};