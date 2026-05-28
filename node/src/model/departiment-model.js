import mongoose from "mongoose";
const DepartSchema=new mongoose.Schema({
departimentCode:{

    type:String,
    required:true
},
departimentName:{
    type:String,
    required:true

},
grossSlalary:{
    type:Number,
    required:true
},




})
const departiment=mongoose.model("Depart",DepartSchema);
export default departiment