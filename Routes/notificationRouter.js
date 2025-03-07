const express = require('express');
const router = express.Router();
const Notification = require('../Model/NotificationModel');

// Create new notification
router.post('/notifications', async (req, res) => {
    try {
        const notification = new Notification({
            title: req.body.title,
            content: req.body.content,
            timestamp: req.body.timestamp
        });

        const savedNotification = await notification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all notifications
router.get('/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ timestamp: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;