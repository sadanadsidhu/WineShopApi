const express = require("express");
const router = express.Router();
const {
  createDataCustomerAndProduct,
  getAllDataCustomerAndProduct,
  getDataByOrderId,
  getDataByShopId,
  updateDataCustomerAndProduct,
  deleteDataCustomerAndProduct,
  deleteAllDataCustomerAndProduct,
  deleteProductFromOrder,
} = require("../controllers/allDataCustomerAndCategoryController");

router.post("/create-all-customer-product", createDataCustomerAndProduct);
router.get("/get-all-customer-product", getAllDataCustomerAndProduct);
router.get("/get-all-customer-product/:orderId", getDataByOrderId);
router.get("/get-all-customer-product-data/:shopId", getDataByShopId);
router.put("/update-all-customer-product/:id", updateDataCustomerAndProduct);
router.delete("/delete-all-customer-product/:id", deleteDataCustomerAndProduct);
router.delete("/delete-all-customer-product", deleteAllDataCustomerAndProduct);
router.delete(
  "/delete-decline-order-array/:productId",
  deleteProductFromOrder
);

module.exports = router;
