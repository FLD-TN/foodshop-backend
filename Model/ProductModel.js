const mongoose = require('mongoose');

// Schema cho Product
const productSchema = new mongoose.Schema({
    productID:{type: String, unique:true,required: true},
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    category: {type: String, required:true},
    productImage:{type:String},
    description: String
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;