const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
},

    { timestamps: true });

const image = mongoose.model('image', imageSchema);
module.exports = image;