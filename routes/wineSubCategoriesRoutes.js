const express = require('express');
const router = express.Router();
const {
    createSubWineCategory,
    updateSubWineCategory,
    getAllSubWineCategories,
    getSubWineCategoryById,
    deleteSubWineCategory
} = require('../controllers/wineSubcategoriesController');

// Define routes
router.post('/wine-subcategories', createSubWineCategory);
router.put('/wine-subcategories/:id', updateSubWineCategory);
router.get('/wine-subcategories', getAllSubWineCategories);
router.get('/wine-subcategories/:id', getSubWineCategoryById);
router.delete('/wine-subcategories/:id', deleteSubWineCategory);

module.exports = router;

