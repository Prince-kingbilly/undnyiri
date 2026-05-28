import supp from "../model/salary.js";

export const ins=async(req,res)=>{
    try{
        const { grosssalary, totaldeduction, netsalary, monthofpayment, employee } = req.body;
        if (grosssalary === undefined || grosssalary === null || grosssalary === '' ||
            totaldeduction === undefined || totaldeduction === null || totaldeduction === '' ||
            netsalary === undefined || netsalary === null || netsalary === '' ||
            !monthofpayment || !employee) {
            return res.status(400).json({msg:"All salary fields are required"})
        }
        const ino=await supp.create(req.body);
        return res.status(201).json({msg:"Salary created", salary: ino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fin=async(req,res)=>{
    try{
        const fino=await supp.find().populate("employee");
        return res.status(200).json({salaries: fino});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const fii=async(req,res)=>{
    try{
        const{id}=req.params
        const fiio=await supp.findById(id).populate("employee");
        if(!fiio) return res.status(404).json({msg:"Salary not found"})
        return res.status(200).json({salary: fiio});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const del=async(req,res)=>{
    try{
        const{id}=req.params
        const delo=await supp.findByIdAndDelete(id);
        if(!delo) return res.status(404).json({msg:"Salary not found"})
        return res.status(200).json({msg:"Salary deleted"});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};

export const upd=async(req,res)=>{
    try{
        const{id}=req.params
        const updo=await supp.findByIdAndUpdate(id, req.body, {new: true, runValidators: true}).populate("employee");
        if(!updo) return res.status(404).json({msg:"Salary not found"})
        return res.status(200).json({msg:"Salary updated", salary: updo});
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
