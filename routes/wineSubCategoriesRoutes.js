const express = require('express');
const router = express.Router();
const {
    createSubWineCategory,
    updateSubWineCategory,
    getAllSubWineCategories,
    getSubWineCategoryById,
    deleteSubWineCategory,
    getImagesFromFolder,
    getSubWineCategoriesByCategoryId
} = require('../controllers/wineSubcategoriesController');

// Define routes
router.post('/wine-subcategories', createSubWineCategory);
router.put('/wine-subcategories/:id', updateSubWineCategory);
router.get('/get-all-wine-subcategories', getAllSubWineCategories);
router.get('/wine-subcategories/:id', getSubWineCategoryById);
router.get('/subcategories-images/:image', getImagesFromFolder);
router.delete('/wine-subcategories/:id', deleteSubWineCategory);
router.get('/get-all-wine-subcategories-categories/:categoryId',getSubWineCategoriesByCategoryId);

module.exports = router;

