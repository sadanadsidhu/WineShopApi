const express = require('express');
const router = express.Router();// Create a router object

const wineController = require('../controller/userHomePageController'); // Import controller

// Wine API endpoints
router.get('/wines', wineController.getAllWines);
router.post('/wines', wineController.createWine);
router.get('/wines/:id', wineController.getWineById);
router.put('/wines/:id', wineController.updateWine);
router.delete('/wines/:id', wineController.deleteWine);

// Other API endpoints (if any)
// ...

module.exports = router;

