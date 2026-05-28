import mongoose from "mongoose";
const salarySchema=new mongoose.Schema({
GlossSalary:{
    type:Number,
    required:true
},
TotalDeduction:{
type:Number,
required:true

},
NetSalary:{
type:Number,
required:true

},
month:{

    type:Number,
    required:true
}

})

const salary=mongoose.model("salary",salarySchema);
export default salary