const express = require('express');
const router = express.Router();
const Order = require('../Model/OrderModel');

// POST: Tạo đơn hàng (đã có)
router.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;
        const order = new Order(orderData);
        order.orderID = order._id.toString();
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(400).json({ message: error.message });
    }
});

// GET: Lấy danh sách đơn hàng theo email (cho user)
router.get('/orders/user/:email', async (req, res) => {
    try {
        const orders = await Order.find({ userEmail: req.params.email });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: error.message });
    }
});

// GET: Lấy danh sách đơn hàng theo trạng thái (cho admin)
router.get('/orders/status', async (req, res) => {
    try {
        const status = req.query.status;
        const orders = await Order.find({ status: status });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders by status:", error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;