import mongoose from "mongoose";
const shows=new mongoose.Schema({
suppliercode:{
    type:String,
    required:true
},
suppliername:{
    type:String,
    required:true,
},
telephone:{
    type:Number,
    required:true
},
address:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
}


});
const supp=mongoose.model("supp",shows)
export default supp