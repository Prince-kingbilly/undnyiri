import user from "../model/user-mode.js";
import mongoose from "mongoose";

// ===================== CREATE USER (SIGN UP) =====================
export const createUser = async (req, res) => {
    try {
        const newUser = await user.create(req.body);

        if (newUser) { return res.status(201).json({msg: "User registered successfully",newUser });
        } else {
            return res.status(401).json({ msg: "User not created" });
        }
    } catch (err) {
        console.log("err:", err);
        
    }
};

// ===================== LOGIN USER =====================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await user.findOne({ email, password });

        if (foundUser) {
            return res.status(200).json({msg: "Login successful",foundUser});
        } else {
            return res.status(401).json({ msg: "Invalid email or password" });
        }
    } catch (err) {
        console.log("err:", err);
        
    }
};

// ===================== GET ALL USERS =====================
export const findUsers = async (req, res) => {
    try {
        const users = await user.find();

        if (users.length > 0) {
            return res.status(200).json({msg: "Users displayed",users});
        } else {
            return res.status(404).json({ msg: "No users found" });
        }
    } catch (err) {
        console.log("err:", err);
        
    }
};

// ===================== GET USER BY ID =====================
export const findUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const singleUser = await user.findById(id);

        if (singleUser) {
            return res.status(200).json({msg: "User found",singleUser
            });
        } else {
            return res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.log("err:", err);
        
    }
};

// ===================== DELETE USER =====================
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await user.findByIdAndDelete(id);

        if (deleted) {
            return res.status(200).json({msg: "User deleted",deleted});
        } else {
            return res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.log("err:", err);
        
    }
};

// ===================== UPDATE USER =====================
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await user.findByIdAndUpdate(id,req.body,{ new: true } );

        if (updated) {
            return res.status(200).json({msg: "User updated",updated });
        } else {
            return res.status(404).json({ msg: "User not found" });
        }
    } catch (err) {
        console.log("err:", err);
        
    }
};