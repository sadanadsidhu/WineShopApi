const SubWineCategory = require('../models/wineSubCategoriesModel');
const getImages = require('../middleware/wineSubCategories');
const Category = require('../models/winesCategoriesModel');
const fs = require('fs');
const path = require('path');
// const fs = require('fs').promises;
// const path = require('path');
// Create SubWineCategory
// const createSubWineCategory = async (req, res) => {
//     try {
//         const { name, miligram, price, images } = req.body;
//         const newSubWineCategory = new SubWineCategory({
//             name,
//             miligram,
//             price,
//             images
//         });
//         const savedSubWineCategory = await newSubWineCategory.save();
//         res.status(201).json(savedSubWineCategory);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
const createSubWineCategory = async (req, res) => {
    try {
        const { name, miligram, price, images, subCategoryType,categoryId } = req.body;
        
        // Check if the ID of the referenced category is provided
        if (!categoryId) {
            return res.status(400).json({ message: 'Please provide categoryId' });
        }

        // Check if the referenced category exists
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newSubWineCategory = new SubWineCategory({
            name,
            miligram,
            price,
            images,
            subCategoryType,
            categoryID: categoryId // Set the reference to the Category document
        });

        const savedSubWineCategory = await newSubWineCategory.save();
        res.status(201).json(savedSubWineCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update SubWineCategory
const updateSubWineCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, miligram, price,subCategoryType, images } = req.body;
        
        // Check if the ID is provided
        if (!id) {
            return res.status(400).json({ message: 'Please provide SubWineCategory ID' });
        }

        // Find the SubWineCategory by ID and update it
        const updatedSubWineCategory = await SubWineCategory.findByIdAndUpdate(id, { name, miligram, price,subCategoryType, images }, { new: true });

        // Check if SubWineCategory exists
        if (!updatedSubWineCategory) {
            return res.status(404).json({ message: 'SubWineCategory not found' });
        }

        // Return the updated SubWineCategory
        res.status(200).json(updatedSubWineCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Get all SubWineCategories
const getAllSubWineCategories = async (req, res) => {
    try {
        const subWineCategories = await SubWineCategory.find();
        res.status(200).json(subWineCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get SubWineCategory by ID
const getSubWineCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const subWineCategory = await SubWineCategory.findById(id);
        if (!subWineCategory) {
            return res.status(404).json({ message: 'SubWineCategory not found' });
        }
        res.status(200).json(subWineCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete SubWineCategory by ID
const deleteSubWineCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSubWineCategory = await SubWineCategory.findByIdAndDelete(id);
        if (!deletedSubWineCategory) {
            return res.status(404).json({ message: 'SubWineCategory not found' });
        }
        res.status(200).json({ message: 'SubWineCategory deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

///////////////////delete all sub wine categories ------------------------->>>>>>>>>>>>>>>>>
const deleteAllSubWineCategories = async (req, res) => {
    try {
        const deleteResult = await SubWineCategory.deleteMany({});
        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'No SubWineCategories found to delete' });
        }
        return res.status(200).json({ message: 'All SubWineCategories deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

///////////////////get images------------------------------------------>>>>>>>>>>>>>>>>>>>>>>>

  const getSubWineCategoriesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Check if categoryId is provided
        if (!categoryId) {
            return res.status(400).json({ message: 'Please provide categoryId' });
        }

        // Find SubWineCategories by categoryId
        const subWineCategories = await SubWineCategory.find({ categoryID: categoryId });
        
        // Check if any SubWineCategories were found
        if (subWineCategories.length === 0) {
            return res.status(404).json({ message: 'No SubWineCategories found for the provided categoryId' });
        }

        // Return the SubWineCategories
        res.status(200).json(subWineCategories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

    
module.exports = {
    createSubWineCategory,
    updateSubWineCategory,
    getAllSubWineCategories,
    getSubWineCategoryById,
    deleteSubWineCategory,
    deleteAllSubWineCategories,
    getSubWineCategoriesByCategoryId
};
