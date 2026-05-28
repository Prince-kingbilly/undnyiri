import mongoose from "mongoose";
const connectDB=async(req,res)=>{
    try{
const connect=await mongoose.connect(process.env.MONGO_URL)
if(!connect){
    console.log("not connnected")
} else{

    console.log("connected")
}




    }

    catch(err){
        console.log(err)
    }
}
export default connectDB