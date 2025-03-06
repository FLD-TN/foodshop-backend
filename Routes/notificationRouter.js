const express = require("express");
const router = express.Router();
const axios = require("axios");

// 🔹 URL mới cho Firebase Cloud Messaging HTTP v1 API
const FCM_URL = "https://fcm.googleapis.com/v1/projects/futureonlinefoodshop/messages:send";

// 🔹 Thay `YOUR_PROJECT_ID` bằng Project ID của bạn (Xem trong Firebase Console)
const ACCESS_TOKEN = "ya29.a0AeXRPp6i5JrwfvU6aZ1ArdCDX5C6_7u3zRfIv_SW3sYuMY7PcO91jP25ecS7Tj3Kl4xyYgC7e-wRqqRg1LLCVTR5myrqqyc50f84NuPQTGn2JAydh0owxUSLTLKJ4ZuIhUehmObrRUrypW07bnBj9Os6TR68UTjtApfBifGtaCgYKAYoSARESFQHGX2MisMmSY9vxdM5L2ZOf3PjtYQ0175";  // 🔥 Copy Access Token bạn vừa lấy vào đây

// API gửi thông báo đẩy
router.post("/sendNotification", async (req, res) => {
    const { title, message } = req.body;

    if (!title || !message) {
        return res.status(400).json({ success: false, error: "Thiếu title hoặc message!" });
    }

    try {
        const payload = {
            message: {
                topic: "all_users",  // 🔹 Gửi đến tất cả user đăng ký "all_users"
                notification: { 
                    title: title, 
                    body: message 
                }
            }
        };

        const fcmResponse = await axios.post(FCM_URL, payload, {
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,  // 🔥 Sử dụng Access Token
                "Content-Type": "application/json"
            }
        });

        console.log("📢 Firebase response:", fcmResponse.data);
        res.json({ success: true, message: "Thông báo đã gửi thành công!" });

    } catch (error) {
        console.error("❌ Lỗi khi gửi FCM:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
