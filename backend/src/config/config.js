import mongoose from "mongoose";
const connectDB=async(req,res)=>{
    try{
    const connect=await mongoose.connect(process.env.MONGO_URI);

    if(!connect){
        console.log("not connect")
    }else{
        console.log("connected")
    }
}catch(err){
    console.log(err)
}
}
export default connectDB