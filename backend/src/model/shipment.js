import mongoose from "mongoose";
const showsh=new mongoose.Schema({
    shipmentnumber:{
        type:String,
        required:true
    },
    shipmentdate:{
        type:Number,
        required:true,

    },
    shipmentstatus:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    }
});

const ship=mongoose.model("ship",showsh);
export default ship