const express = require("express");
const router = express.Router();
const wineShopController = require("../controllers/wineShopController");

// const basePath = "/wineShops";

router.post("/wineshop", wineShopController.createWineShop);
router.put("/wineshop/:id", wineShopController.updateWineShop);
router.get("/wineshop", wineShopController.getAllWineShops);
router.delete("/wineshop/:id", wineShopController.deleteWineShop);

module.exports = router;
