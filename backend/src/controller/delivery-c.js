import delMod from "../model/delivery.js";

export const ins=async(req,res)=>{
    try{
        const ino=await delMod.create(req.body);
        if(ino) return res.status(201).json({msg:"Delivery created", delivery: ino});
        else return res.status(400).json({msg:"Failed to create delivery"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fin=async(req,res)=>{
    try{
        const fino=await delMod.find();
        return res.status(200).json({deliveries: fino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fii=async(req,res)=>{
    try{
        const{id}=req.params
        const fiio=await delMod.findById(id);
        if(fiio) return res.status(200).json({delivery: fiio});
        else return res.status(404).json({msg:"Delivery not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const dele=async(req,res)=>{
    try{
        const{id}=req.params
        const delo=await delMod.findByIdAndDelete(id);
        if(delo) return res.status(200).json({msg:"Delivery deleted"});
        else return res.status(404).json({msg:"Delivery not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const upd=async(req,res)=>{
    try{
        const{id}=req.params
        const updo=await delMod.findByIdAndUpdate(id, req.body, {new: true});
        if(updo) return res.status(200).json({msg:"Delivery updated", delivery: updo});
        else return res.status(404).json({msg:"Delivery not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
    