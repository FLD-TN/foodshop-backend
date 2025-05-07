const express = require('express');
const router = express.Router();
const User = require("../Model/UserModel");

// Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create new user
router.post("/users", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ status: true, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update user by email
router.put("/users/:email", async (req, res) => {
    try {
        const { email } = req.params;
        console.log("🔄 Cập nhật người dùng:", email);

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng!" });
        }

        // Preserve the password if not provided in the update
        if (!req.body.password) {
            req.body.password = existingUser.password;
        }

        Object.assign(existingUser, req.body);
        const updatedUser = await existingUser.save();
        res.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Cập nhật thất bại!", error: error.message });
    }
});

// Delete user by email
router.delete("/users/:email", async (req, res) => {
    try {
        const { email } = req.params;
        console.log("🗑 Xóa người dùng:", email);
        const deletedUser = await User.findOneAndDelete({ email });

        if (deletedUser) {
            res.json({ message: "Xóa người dùng thành công!" });
        } else {
            res.status(404).json({ message: "Không tìm thấy người dùng!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Xóa thất bại!", error: error.message });
    }
});

// Search users by email
router.get("/users/search", async (req, res) => {
    try {
        const { email } = req.query;
        const users = await User.find({ email: { $regex: email, $options: 'i' } });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && user.password === password) {
            res.json({
                email: user.email,
                fullName: user.fullName,
                phoneNumber: user.phoneNumber,
                role: user.role.toLowerCase(),
                password: user.password
            });
        } else {
            res.status(401).json({ status: false, error: "Email hoặc mật khẩu không đúng" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
