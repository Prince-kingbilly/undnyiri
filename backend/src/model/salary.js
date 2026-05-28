import mongoose from "mongoose";
const shows=new mongoose.Schema({
grosssalary:{
   type:Number,
    required:true
},
totaldeduction:{
      type:Number,
    required:true
},
netsalary:{
    type:Number,
    required:true
},
monthofpayment:{
     type:String,
    required:true
},
employee:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"ship",
    required:true
},
});
const supp=mongoose.model("supp",shows)
export default supp
