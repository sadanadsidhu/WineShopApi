const express = require('express');
const router = express.Router();
const {
    createSubWineCategory,
    addSubWineCategoryToWineShop,
    removeSubWineCategoryFromWineShop,
    updateSubWineCategory,
    getAllSubWineCategories,
    getSubWineCategoryById,
    deleteSubWineCategory,
    // getImagesFromFolder,
    deleteAllSubWineCategories,
    getSubWineCategoriesByCategoryId,

    getTotalPriceByMl,
} = require('../controllers/wineSubcategoriesController');

// Define routes
router.post('/wine-subcategories', createSubWineCategory);
router.post('/add/subategory/availablecategory', addSubWineCategoryToWineShop);
router.delete('/delete/available/:wineShopId/:subCategoryId', removeSubWineCategoryFromWineShop);
router.put('/wine-subcategories/:id', updateSubWineCategory);
router.get('/get-all-wine-subcategories', getAllSubWineCategories);
router.get('/wine-subcategories/:id', getSubWineCategoryById);
// router.get('/subcategories-images/:filename', getImagesFromFolder);
router.delete('/wine-subcategories/:id', deleteSubWineCategory);
router.delete('/delete-all-wine-subcategories', deleteAllSubWineCategories);
router.get('/get-all-wine-subcategories-categories/:categoryId', getSubWineCategoriesByCategoryId);

router.get('/get-price-cart/:id/:miligram', getTotalPriceByMl);
module.exports = router;

