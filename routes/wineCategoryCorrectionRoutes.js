const express = require('express')
const routes = express.Router();

 const {
    creationWinecategoryCorrection,
    getWineCategoryCorrection
 }=require('../controllers/wineCategoryCorrectionController')

 // Define routes
 routes.post('/create-correction-wine-categpry',creationWinecategoryCorrection)
 routes.get('/get-correction-wine-categpry/:wineShopID',getWineCategoryCorrection)

 module.exports=routes;