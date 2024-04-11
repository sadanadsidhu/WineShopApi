const express = require("express");
const router = express.Router();
const {
    addLocalAddress,
    getLocalAddress,
    updateLocalAddress,
    deleteLocalAddress,
    deleteAllLocalAddresses
} = require("../controllers/customerCurrentAddressAndPermanentAddressController");

router.post("/add-local-address", addLocalAddress);
router.get("/get-local-and-permanent-address",getLocalAddress );
router.put("/update-local-and-permanent-address",updateLocalAddress);
router.delete("/delete-local-and-permanent-address",deleteLocalAddress);
router.delete("/delete-all-local-and-permanent-address",deleteAllLocalAddresses);

module.exports = router;