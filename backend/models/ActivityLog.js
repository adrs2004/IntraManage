import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: String,
    status: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("ActivityLog", activitySchema);