import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        intern: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        progress: String,
        timeSpent: Number,
        delayedTasks: Number,
    },
    { timestamps: true }
);

export default mongoose.model("Report", reportSchema);