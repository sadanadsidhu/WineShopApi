// controllers/swiperImagesStoreController.js
const SwiperImages = require('../models/swiperImagesStoreModel');

// Create new image
const createImage = async (req, res) => {
  try {
    const { images } = req.body;
    const newImage = new SwiperImages({ images: images });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await SwiperImages.find();
    res.status(200).json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get image by ID
const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await SwiperImages.findById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update image by ID
const updateImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body;
    const updatedImage = await SwiperImages.findByIdAndUpdate(id, { images: images }, { new: true });
    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(updatedImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete image by ID
const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await SwiperImages.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  updateImageById,
  deleteImageById
};
