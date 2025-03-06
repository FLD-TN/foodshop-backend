const express = require("express");
const router = express.Router();
const axios = require("axios");
const mongoose = require("mongoose");
const Notification = require("../Model/NotificationModel");

// 🔹 Firebase Cloud Messaging API (HTTP v1)
const FCM_URL = "https://fcm.googleapis.com/v1/projects/futureonlinefoodshop/messages:send";
const ACCESS_TOKEN = "ya29.a0AeXRPp7UJxGmxU1pjsI29e1wFL4Su0WYE0eSO1OPJYx6TOKngGxCQNp-yncBiazmTdGewzcKt1IlqmWKwIBqepJbgrSZ2Qt0mmoqU0IxMqUFUiem0Z4f1eN3kqBXyt0jzjqp5cAVI00WQujX0u7hW3nv1ZqDu599uqIaHjJycGKMuQaCgYKAVISARESFQHGX2MiCv6Ambkf86hoDxNCZJhVSA0181"; // 🔥 Thay bằng Access Token hợp lệ

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
