const mongoose=require('mongoose');
const Schema= mongoose.Schema
const wineCategoryCorrectionSchema=new mongoose.Schema({
    price:{
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    wineShop:{
        type: Schema.Types.ObjectId,
        ref:'WineShop',
    }

})

module.exports=mongoose.model('WineCategoryCorrection',wineCategoryCorrectionSchema)