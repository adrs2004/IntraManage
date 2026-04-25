import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        empId: String,
        email: { type: String, unique: true },
        password: String,

        role: {
            type: String,
            enum: ["admin", "manager", "intern"],
        },

        uniqueCode: String, // for manager
        projectPasscode: String, // for intern

        status: {
            type: String,
            enum: ["online", "idle", "offline"],
            default: "offline",
        },
        
        lastActiveAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);