const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productID: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    category: { type: String, required: true },
    productImage: { type: String },
    description: { type: String },
    discount: { type: Number, default: 0 }, // 👈 Thêm discount (theo %)
    discountAmount: { type: Number, default: 0 } // 👈 Thêm discountAmount (số tiền)
}); 
const Product = mongoose.model('Product', productSchema);

module.exports = Product;