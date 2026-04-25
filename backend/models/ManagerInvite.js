import mongoose from "mongoose";

const managerInviteSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        uniqueCode: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isUsed: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default mongoose.model("ManagerInvite", managerInviteSchema);
