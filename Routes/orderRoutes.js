const express = require('express');
const router = express.Router();
const Order = require('../Model/OrderModel');

router.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const order = new Order(orderData);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;