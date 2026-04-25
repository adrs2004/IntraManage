import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
    intern: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: Number,
    tasksCompleted: Number,
    delayCount: Number,
    workQuality: {
        type: String,
        enum: ["Excellent", "Good", "Fine", "Poor", "Learn", "N/A"],
        default: "N/A"
    }
});

export default mongoose.model("Performance", performanceSchema);