import mongoose from "mongoose";
const showd=new mongoose.Schema({
    deliverycode:{
        type:String,
        required:String

    },
    deliverydate:{
        type:Number,
        required:true,

    },
    quantityd:{
        type:String,
        required:true
    },
    deliverys:{
        type:String,
        required:true
    }
});
const del=mongoose.model("del",showd)
export default del

