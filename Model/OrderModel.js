const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: { type: String, unique: true }, // Thêm orderID
    userEmail: { type: String, required: true },
    products: [{
        productID: { type: String, required: true },
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true },
        productImage: { type: String },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "PENDING" },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);