const express = require("express");
const router = express.Router();
const Notification = require("../Model/NotificationModel"); // Đảm bảo đúng đường dẫn
const axios = require("axios");

// API gửi thông báo & lưu vào MongoDB
router.post("/sendNotification", async (req, res) => {
    const { title, message } = req.body;

    // Lưu vào MongoDB
    const newNotification = new Notification({ title, message });
    await newNotification.save();

    // Gửi thông báo đẩy qua Firebase
    const payload = {
        to: "/topics/all_users",
        notification: { title, body: message }
    };

    try {
        await axios.post("https://fcm.googleapis.com/fcm/send", payload, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=YOUR_FIREBASE_SERVER_KEY"
            }
        });
        res.json({ success: true, message: "Thông báo đã gửi và lưu vào MongoDB!" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// API lấy danh sách thông báo từ MongoDB
router.get("/getNotifications", async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
