const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    products: [{
        productID: String,
        productName: String,
        productPrice: Number,
        quantity: Number
    }],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "PENDING" },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);