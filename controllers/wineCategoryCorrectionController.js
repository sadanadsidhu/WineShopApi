const WineCategoryCorrection=require('../models/wineCategoryCorrectionModel')

//////////////////////////////////////////// CREATE CORRECTION MODEL ////////////////////////////////////
const creationWinecategoryCorrection=async(req,res)=>{
    try{
        const{price,description,name,image,wineShop}=req.body;

        if(!name){
            return res.status(400).json({message:'please enter name'})
        }
        if(!price){
            return res.status(400).json({message:'please enter price'})
        }
        if(!wineShop){
            return res.status(400).json({message:'please enter WinesShopID'})
        }
        const newWineCategoryCorrection=new WineCategoryCorrection({
               price,
               description,
               name,
               image,
               wineShop
        })

        const savedWineCategoryCorrection=await newWineCategoryCorrection.save();
        res.status(201).json(savedWineCategoryCorrection);

    }catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}
///////////////////////////////////////////////// GET CORRECTION WINE CATEGORY ////////////////////////////
const getWineCategoryCorrection=async(req,res)=>{
    try{
        const{wineShopID}=req.params;
        const wineCategoriesController=await WineCategoryCorrection.find({wineShopID});
        res.status(200).json(wineCategoriesController);

    }catch(error){
     console.error(error);
     res.status(500).json({message:"internal server error"})
    }
}


module.exports = {
    creationWinecategoryCorrection,
    getWineCategoryCorrection
}