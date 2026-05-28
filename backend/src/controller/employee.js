import ship from "../model/employeem.js";

export const ins=async(req,res)=>{
    try{
        const { employeenumber, firstname, lastname, address, position, telephone, gender, hiredDate, department } = req.body;
        if (!employeenumber || !firstname || !lastname || !address || !position || !telephone || !gender || !hiredDate || !department) {
            return res.status(400).json({msg:"All employee fields are required"})
        }
        const ino=await ship.create(req.body);
        return res.status(201).json({msg:"Employee created", employee: ino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fin=async(req,res)=>{
    try{
        const fino=await ship.find().populate("department");
        return res.status(200).json({employees: fino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fii=async(req,res)=>{
    try{
        const{id}=req.params
        const fiio=await ship.findById(id).populate("department");
        if(!fiio) return res.status(404).json({msg:"Employee not found"})
        return res.status(200).json({employee: fiio});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const del=async(req,res)=>{
    try{
        const{id}=req.params
        const delo=await ship.findByIdAndDelete(id);
        if(!delo) return res.status(404).json({msg:"Employee not found"})
        return res.status(200).json({msg:"Employee deleted"});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const upd=async(req,res)=>{
    try{
        const{id}=req.params
        const updo=await ship.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate("department");
        if(!updo) return res.status(404).json({msg:"Employee not found"})
        return res.status(200).json({msg:"Employee updated", employee: updo});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
