import User from "../models/User.js";
import ManagerInvite from "../models/ManagerInvite.js";
import Project from "../models/Project.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const inviteManager = async (req, res) => {
    try {
        const { email, uniqueCode } = req.body;
        if (!email || !uniqueCode) {
            return res.status(400).json({ msg: "Email and unique code are required" });
        }
        let invite = await ManagerInvite.findOne({ email });
        if (invite) {
            invite.uniqueCode = uniqueCode;
            invite.isUsed = false;
            await invite.save();
        } else {
            invite = await ManagerInvite.create({
                email,
                uniqueCode,
                createdBy: req.user._id
            });
        }
        res.status(201).json({ msg: "Manager invite created successfully", invite });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const { name, empId, email, password, role, adminCode, uniqueCode, passcode } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUserData = {
            name,
            empId,
            email,
            password: hashedPassword,
            role,
        };

        // 🔥 ADMIN VALIDATION
        if (role === "admin") {
            if (!adminCode || adminCode !== process.env.ADMIN_MASTER_CODE) {
                return res.status(400).json({ msg: "Invalid Admin Code" });
            }
        }

        // 🔥 MANAGER VALIDATION
        if (role === "manager") {
            if (!uniqueCode) return res.status(400).json({ msg: "Unique code required" });
            const invite = await ManagerInvite.findOne({ email, uniqueCode, isUsed: false });
            if (!invite) {
                return res.status(400).json({ msg: "Invalid or expired manager invite code for this email" });
            }
            newUserData.uniqueCode = uniqueCode;
            invite.isUsed = true;
            await invite.save();
        }

        let projectToJoin = null;

        // 🔥 INTERN VALIDATION & AUTO JOIN
        if (role === "intern") {
            if (!passcode) return res.status(400).json({ msg: "Project passcode required" });
            projectToJoin = await Project.findOne({ passcode });
            if (!projectToJoin) {
                return res.status(404).json({ msg: "Invalid project passcode" });
            }
            newUserData.projectPasscode = passcode;
        }

        const user = await User.create(newUserData);

        // If intern, auto-join project
        if (role === "intern" && projectToJoin) {
            projectToJoin.members.push({
                user: user._id,
                role: "intern",
            });
            await projectToJoin.save();
        }

        res.status(201).json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user._id, user.role),
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// GET CURRENT USER
export const getMe = async (req, res) => {
    res.json(req.user);
};

// HEARTBEAT
export const heartbeat = async (req, res) => {
    try {
        req.user.lastActiveAt = Date.now();
        await req.user.save();
        res.status(200).json({ msg: "Heartbeat received" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { emailOrEmpId, password } = req.body;

        const user = await User.findOne({
            $or: [{ email: emailOrEmpId }, { empId: emailOrEmpId }],
        });

        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            role: user.role,
            token: generateToken(user._id, user.role),
        });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};