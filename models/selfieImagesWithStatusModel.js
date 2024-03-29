const mongoose=require('mongoose');

const selfieSchema=new mongoose.Schema({

images:{
    type:String,
    required:true
},
status:{
    type:Boolean,
    default:false
}
})
module.exports=mongoose.model('UserSelfie',selfieSchema); 