const Image = require('../models/image');
const User = require('../models/user');

const createImage = async (req, res) => {
  const { title, description, imageUrl } = req.body;
  const userId = req.user.userId; 

  try {
    const newImage = new Image({ user: userId, title, description, imageUrl });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getImages = async (req, res) => {
  const userId = req.user.userId;

  try {
    const images = await Image.find({ user: userId });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const image = await Image.findOneAndDelete({ _id: id, user: userId });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createImage, getImages, deleteImage };
