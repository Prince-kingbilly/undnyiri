import mongoose from "mongoose";
const showd=new mongoose.Schema({
    departimentcode:{
        type:String,
        required:true

    },
    departimentname:{
        type:String,
        required:true,

    },
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ship"
    },
});
const delMod=mongoose.model("delMod",showd)
export default delMod
