import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        startDate: Date,
        dueDate: Date,
        priority: String,

        passcode: String,

        manager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        members: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                role: String,
            },
        ],

        status: {
            type: String,
            enum: ["planning", "execution", "testing", "deployment", "closure"],
            default: "planning",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);