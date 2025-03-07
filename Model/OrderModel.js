const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    products: [{
        productID: { type: String, required: true }, // Tham chiếu đến productID trong Product collection
        productName: { type: String, required: true },
        productPrice: { type: Number, required: true },
        productImage: { type: String }, // Có thể null
        quantity: { type: Number, required: true, min: 1 } // Thêm trường quantity, bắt buộc và lớn hơn 0
    }],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "PENDING" },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);