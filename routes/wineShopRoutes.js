const express = require("express");
const router = express.Router();
const wineShopController = require("../controllers/wineShopController");

// const basePath = "/wineShops";

router.post("/create-wineshop", wineShopController.createWineShop);
router.put("/update-wineshop/:id", wineShopController.updateWineShop);
router.get("/get-all-shoplocation", wineShopController.getAllWineShops);
// router.delete("/wineshop/:id", wineShopController.deleteWineShop);

module.exports = router;
