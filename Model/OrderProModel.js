const mongoose = require('mongoose');

const orderProSchema = new mongoose.Schema({
    orderId: { type: String, unique: true, required: true },
    orderDate: { type: Date, required: true },
    orderStatus: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    orderItems: { type: Array, required: true }
});
const OrderPro = mongoose.model('OrderPro', orderProSchema);
module.exports = OrderPro;