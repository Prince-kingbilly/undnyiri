import ship from "../model/shipment.js";

export const ins=async(req,res)=>{
    try{
        const ino=await ship.create(req.body);
        if(ino) return res.status(201).json({msg:"Shipment created", shipment: ino});
        else return res.status(400).json({msg:"Failed to create shipment"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fin=async(req,res)=>{
    try{
        const fino=await ship.find();
        return res.status(200).json({shipments: fino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fii=async(req,res)=>{
    try{
        const{id}=req.params
        const fiio=await ship.findById(id);
        if(fiio) return res.status(200).json({shipment: fiio});
        else return res.status(404).json({msg:"Shipment not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const del=async(req,res)=>{
    try{
        const{id}=req.params
        const delo=await ship.findByIdAndDelete(id);
        if(delo) return res.status(200).json({msg:"Shipment deleted"});
        else return res.status(404).json({msg:"Shipment not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const upd=async(req,res)=>{
    try{
        const{id}=req.params
        const updo=await ship.findByIdAndUpdate(id, req.body, {new: true});
        if(updo) return res.status(200).json({msg:"Shipment updated", shipment: updo});
        else return res.status(404).json({msg:"Shipment not found"})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
    