const express = require('express');
const Category = require('../Model/CategoryModel');
const router = express.Router();

// Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new category
router.post('/categories', async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ status: true, category });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;