const express = require("express");
const router = express.Router();
const wineShopController = require("../controllers/wineShopController");

// const basePath = "/wineShops";

router.post("/create-wineshop", wineShopController.createWineShop);
router.post(
  "/add/available/category",
  wineShopController.addCategoryToWineShop
);
router.put("/update-wineshop/:id", wineShopController.updateWineShop);
router.get("/get-all-shoplocation", wineShopController.getAllWineShops);
router.get("/get/wineshop/:id", wineShopController.getWineShopById);
router.get(
  "/get-near-wineshop-within-5km",
  wineShopController.getWineShopsWithin5km
);
router.post(
  "/check-near-wineshop-within-5km",
  wineShopController.postWineShopsWithin5km
);
// router.delete("/wineshop/:id", wineShopController.deleteWineShop);
router.delete(
  "/delete/category/:wineShopId/:categoryId",
  wineShopController.deleteCategoryFromWineShop
);
router.put(
  "/update/category/:wineShopId/:categoryId",
  wineShopController.updateCategoryInWineShop
);

module.exports = router;
