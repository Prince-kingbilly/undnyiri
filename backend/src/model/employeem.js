import mongoose from "mongoose";
const showsh=new mongoose.Schema({
    employeenumber:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    position:{
      type:String,
        required:true
    },
    telephone:{
      type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    hiredDate:{
         type:String,
        required:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"delMod",
        required:true
    },
});
const ship=mongoose.model("ship",showsh);
export default ship
