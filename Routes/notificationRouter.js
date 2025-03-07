const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Notification = require("../Model/NotificationModel");

// 🔹 Firebase Cloud Messaging API (HTTP v1)
const FCM_URL = "https://fcm.googleapis.com/v1/projects/futureonlinefoodshop/messages:send";
const ACCESS_TOKEN = "ya29.a0AeXRPp7NemvftX7DSJqoobGKvOkO_MgCj4h6MLYvnIS_EJq3SGas4ATh0HM1-6gzPptI0wtFOwmQxHiE1ZtS9KxEe0N9BdBe8ZNRWli1W4SsHYBScd_B1GotR4aG7kJqSof-CT6uFvskLKnL9Ko-oJDA_oIJN6ydivqTbD4SqQaCgYKAVESARESFQHGX2Mi5dNP6SwNoSNxS_LvAowgIw0177"
// ✅ API Gửi thông báo đẩy & lưu vào MongoDB
router.post("/sendNotification", async (req, res) => {
    console.log("📩 Yêu cầu nhận được:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        console.error("❌ `req.body` rỗng hoặc undefined!");
        return res.status(400).json({ success: false, error: "Dữ liệu không hợp lệ" });
    }

    const { title, message } = req.body;

    if (!title || !message) {
        console.error("❌ Thiếu `title` hoặc `message`!");
        return res.status(400).json({ success: false, error: "Thiếu title hoặc message!" });
    }

    try {
        // 🔹 Lưu thông báo vào MongoDB
        const newNotification = new Notification({ title, message });
        await newNotification.save();
        console.log("✅ Lưu thông báo vào MongoDB:", newNotification);

        // 🔹 Tạo payload gửi đến Firebase
        const payload = {
            message: {
                topic: "all_users",
                notification: { title, body: message }
            }
        };

        // 🔹 Gửi thông báo đến Firebase Cloud Messaging
        const fcmResponse = await axios.post(FCM_URL, payload, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        console.log("📢 Firebase response:", fcmResponse.data);
        res.status(201).json({ success: true, message: "Thông báo đã gửi thành công!", data: newNotification });

    } catch (error) {
        console.error("❌ Lỗi khi gửi FCM:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ✅ API Lấy danh sách thông báo từ MongoDB
router.get("/getNotifications", async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.json(notifications);
    } catch (error) {
        console.error("❌ Lỗi khi lấy thông báo từ MongoDB:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
