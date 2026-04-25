import mongoose from "mongoose";

const subTaskSchema = new mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        },
        title: String,
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model("SubTask", subTaskSchema);