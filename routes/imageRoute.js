const express = require('express');
const { createImage, getImages, deleteImage } = require('../controllers/imageController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createImage);
router.get('/', authMiddleware, getImages);
router.delete('/:id', authMiddleware, deleteImage);

module.exports = router;
