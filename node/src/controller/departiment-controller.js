import mongoose from "mongoose";
import departiment from "../model/departiment-model.js";
export const creatDepartiment=async(req,res)=>{

const credep=await departiment.create(req.body);
try{
if(credep) return res.status(201).json({msg:"data is inserted",credep})
    else return res.status(401).json({msg:"not insrted"})


}
catch(err){
    console.log("err:",err)
}


};
export const findDipartiment=async(req,res)=>{

const findd= await departiment.find();
try{
    if(findd) {return res.status(201).json({msg:"data are displayed",data:findd})}
        else{ return res.status(404).json({msg:"not displayed"})}
}
catch(err){
    console.log("err:",err)
}


};
export const findidd=async(req,res)=>{

const{id}=req.params;
    const fin=await departiment.findById();
    try{
if(fin) return res.status(201).json({msg:"founed",fin})
    else return res.status(404).json({msg:"not founded"})


    }
    catch(err){

        console.log("err",err)
    }
};
export const deletDepartiment=async(req,res)=>{
    const{id}=req.params;
    const del=await departiment.findByIdAndDelete(id);
    try{
        if(del) return res.status(201).json({msg:"deleted",del})
            else return res.status(404).json({msg:"not deleted"})
    }
    catch(err){
        console.log("err:",err)
    }
};
export const updataDepartimant=async(req,res)=>{
    const{id}=req.params;
    const upd=await departiment.findByIdAndUpdate(req.body)
    try{

        if(upd) return res.status(200).json({msg:"updated",upd})
            else return res.status(404).json({msg:"not updated"})
    }
    catch(err){
        console.log("err:",err)
    }
}