const Category = require('../models/winesCategoriesModel');


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
// const createCategory=  async (req, res) => {
//   try {
//     // Destructure request body to extract category data
//     const { id, name, description,image} = req.body;

//     // Create a new category instance
//     const newCategory = new Category({
//       id,
//       name,
//       description,
//       image
      
//     });

//     // Save the category to the database
//     await newCategory.save();

//     res.status(201).json({ message: 'Category created successfully', category: newCategory });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const createCategory = async (req, res) => {
  try {
    // Destructure request body to extract category data
    const { id, name, description } = req.body;
    let images = [];

    // Check if files are attached to the request
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push(file.filename);
      });
    } else {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a new category instance
    const newCategory = new Category({
      id,
      name,
      description,
      images
    });

    // Save the category to the database
    const savedCategory = await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: savedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
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
