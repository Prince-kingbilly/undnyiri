import showouu from "../model/user.js";

export const register=async(req,res)=>{
    try{
        const reg=await showouu.create(req.body);
        if(reg) return res.status(201).json({msg:"Registered successfully", user: reg});
        else return res.status(403).json({msg:"Registration failed"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
export const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email || !password) return res.status(400).json({msg:"Email and password are required"})
        const log=await showouu.findOne({email,password})
        if(log) return res.status(200).json({msg:"Login successful", user: log});
        else return res.status(401).json({msg:"Invalid email or password"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
}