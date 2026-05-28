import delMod from "../model/departimentm.js";

export const ins=async(req,res)=>{
    try{
        const { departimentcode, departimentname, manager } = req.body;
        if (!departimentcode || !departimentcode.trim() || !departimentname || !departimentname.trim()) {
            return res.status(400).json({msg:"departimentcode and departimentname are required"})
        }
        const payload = { departimentcode: departimentcode.trim(), departimentname: departimentname.trim() };
        if (manager) payload.manager = manager;
        const ino=await delMod.create(payload);
        return res.status(201).json({msg:"Department created", department: ino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fin=async(req,res)=>{
    try{
        const fino=await delMod.find().populate("manager", "firstname lastname employeenumber");
        return res.status(200).json({departments: fino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fii=async(req,res)=>{
    try{
        const{id}=req.params
        const fiio=await delMod.findById(id).populate("manager", "firstname lastname employeenumber");
        if(!fiio) return res.status(404).json({msg:"Department not found"})
        return res.status(200).json({department: fiio});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const dele=async(req,res)=>{
    try{
        const{id}=req.params
        const delo=await delMod.findByIdAndDelete(id);
        if(!delo) return res.status(404).json({msg:"Department not found"})
        return res.status(200).json({msg:"Department deleted"});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const upd=async(req,res)=>{
    try{
        const{id}=req.params
        const{ departimentcode, departimentname, manager } = req.body;
        if (!departimentcode || !departimentcode.trim() || !departimentname || !departimentname.trim()) {
            return res.status(400).json({msg:"departimentcode and departimentname are required"})
        }
        const payload = { departimentcode: departimentcode.trim(), departimentname: departimentname.trim() };
        if (manager !== undefined) payload.manager = manager || null;
        const updo=await delMod.findByIdAndUpdate(id, payload, {new: true, runValidators: true}).populate("manager", "firstname lastname employeenumber");
        if(!updo) return res.status(404).json({msg:"Department not found"})
        return res.status(200).json({msg:"Department updated", department: updo});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
