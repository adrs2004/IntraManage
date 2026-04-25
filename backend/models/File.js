import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    filePath: String,
    version: Number,
});

export default mongoose.model("File", fileSchema);