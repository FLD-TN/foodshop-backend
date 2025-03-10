const express = require('express');
const Banner = require('../Model/BannerModel');
const router = express.Router();

router.post('/banners', async (req, res) => {
    try {
        const banners = new Banner({
            imageUrl: req.body.imageUrl,
        });

        const saveBanner = await banner.save();
        res.status(201).json(saveBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/banner', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;