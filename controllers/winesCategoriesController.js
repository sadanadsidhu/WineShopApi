const Category = require('../models/winesCategoriesModel');

const multer = require('multer'); // Assuming you've installed multer

// GET all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// POST create a new category


// const createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const imagePath = './images'; // Get the path of the uploaded image

//     // Create a new category instance
//     const newCategory = new Category({
//       name,
//       description,
//       images: imagePath // Store the path to the uploaded image
//     });

//     // Save the category to the database
//     const savedCategory = await newCategory.save();

//     res.status(201).json(savedCategory); // Return the created category
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// const upload = multer({ dest: './images' })
// const createCategory =(upload.single('file'),async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     let imagePaths = ''; // Assuming you want to store a single image path

//     if (req.file) {
//       imagePaths.push(req.file.filename); // Extract filename from uploaded file
//     }

//     const newCategory = new Category({
//       name,
//       description,
//       images: imagePaths,
//     });

//     const savedCategory = await newCategory.save();

//     res.status(201).json(savedCategory); // Return the created category
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
const createCategory = async (req, res) => {
  try {
    const { name, description, images } = req.body;

    // Create a new category instance
    const newCategory = new Category({
      name,
      description,
      images // assuming image is an optional field
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory); // Return the created category
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT update category by ID
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE category by ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
