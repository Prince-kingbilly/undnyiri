import supp from "../model/supply.js";

export const ins=async(req,res)=>{
    try{
        const ino=await supp.create(req.body);
        if(ino) return res.status(201).json({msg:"Supplier created", supplier: ino});
        else return res.status(400).json({msg:"Failed to create supplier"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fin=async(req,res)=>{
    try{
        const fino=await supp.find();
        return res.status(200).json({suppliers: fino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fii=async(req,res)=>{
    try{
        const{id}=req.params
        const fiio=await supp.findById(id);
        if(fiio) return res.status(200).json({supplier: fiio});
        else return res.status(404).json({msg:"Supplier not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const del=async(req,res)=>{
    try{
        const{id}=req.params
        const delo=await supp.findByIdAndDelete(id);
        if(delo) return res.status(200).json({msg:"Supplier deleted"});
        else return res.status(404).json({msg:"Supplier not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const upd=async(req,res)=>{
    try{
        const{id}=req.params
        const updo=await supp.findByIdAndUpdate(id, req.body, {new: true});
        if(updo) return res.status(200).json({msg:"Supplier updated", supplier: updo});
        else return res.status(404).json({msg:"Supplier not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
    