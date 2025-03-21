const express = require('express');
const Banner = require('../Model/BannerModel');
const router = express.Router();

router.post('/banner', async (req, res) => {
    try {
        const banner = new Banner({
            imageUrl: req.body.imageUrl,
        });

        const saveBanner = await banner.save();
        res.status(201).json(saveBanner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/banners', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/banner/:bannerID', async (req, res) => {
    try {
        const { bannerID } = req.params;
        const existingBanner = await Banner.findOne({ _id: bannerID });
        if (!existingBanner) {
            return res.status(404).json({ message: "Không tìm thấy banner!" });
        }
        Object.assign(existingBanner, req.body);
        const updatedBanner = await existingBanner.save();
        res.json(updatedBanner);
    } catch (error) {
        res.status(500).json({ message: "Cập nhật thất bại!", error });
    }
}
);

router.delete('/banner/:bannerID', async (req, res) => {
    try {
        const { bannerID } = req.params;
        const deletedBanner = await Banner.findOneAndDelete({ _id: bannerID });

        if (deletedBanner) {
            res.json({ message: "Xóa banner thành công!" });
        } else {
            res.status(404).json({ message: "Không tìm thấy banner!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Xóa thất bại!", error });
    }
});


module.exports = router;