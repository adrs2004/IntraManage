export const validateRegister = (req, res, next) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    next();
};

export const validateLogin = (req, res, next) => {
    const { emailOrEmpId, password } = req.body;

    if (!emailOrEmpId || !password) {
        return res.status(400).json({ msg: "Credentials required" });
    }

    next();
};