const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },

});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;