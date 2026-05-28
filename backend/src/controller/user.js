<<<<<<< HEAD
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
=======
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
import showouu from "../model/user.js";

export const register=async(req,res)=>{
    try{
<<<<<<< HEAD
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({msg:"All fields are required"})
        }
        const existing = await showouu.findOne({ email });
        if (existing) {
            return res.status(400).json({msg:"Email already registered"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const reg=await showouu.create({ username, email, password: hashedPassword });
        const token = jwt.sign({ id: reg._id, email: reg.email }, process.env.SESSION_SECRET, { expiresIn: "7d" });
        return res.status(201).json({msg:"Registered successfully", token, user: { id: reg._id, username, email }});
=======
        const reg=await showouu.create(req.body);
        if(reg) return res.status(201).json({msg:"Registered successfully", user: reg});
        else return res.status(403).json({msg:"Registration failed"})
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
};
<<<<<<< HEAD

=======
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
export const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email || !password) return res.status(400).json({msg:"Email and password are required"})
<<<<<<< HEAD
        const log=await showouu.findOne({email})
        if(!log) return res.status(401).json({msg:"Invalid email or password"})
        const isMatch = await bcrypt.compare(password, log.password);
        if(!isMatch) return res.status(401).json({msg:"Invalid email or password"})
        const token = jwt.sign({ id: log._id, email: log.email }, process.env.SESSION_SECRET, { expiresIn: "7d" });
        return res.status(200).json({msg:"Login successful", token, user: { id: log._id, username: log.username, email: log.email }});
=======
        const log=await showouu.findOne({email,password})
        if(log) return res.status(200).json({msg:"Login successful", user: log});
        else return res.status(401).json({msg:"Invalid email or password"})
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
    }catch(err){
        console.log(err)
        res.status(500).json({msg:"Server error"})
    }
<<<<<<< HEAD
};
=======
}
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
