const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, unique: true, required: true },
    categoryName: { type: String, required: true },
    categoryIcon: { type: String } // Trường mới, không bắt buộc
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;