const express = require("express");
const router = express.Router();
const wineCategoriesController = require("../controllers/winesCategoriesController");

router.get("/categories", wineCategoriesController.getAllCategories);
router.get("/categories/:id", wineCategoriesController.getCategoryById);
router.post("/categories", wineCategoriesController.createCategory);
router.put("/categories/:id", wineCategoriesController.updateCategory);
router.delete("/categories/:id", wineCategoriesController.deleteCategory);

module.exports = router;
