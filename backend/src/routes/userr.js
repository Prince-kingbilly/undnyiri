import express from "express";
import { register,login } from "../controller/user.js";
import { authMiddleware } from "../middleware/auth.js";

const userroute=express.Router();
userroute.post("/register",register);
userroute.post("/login",login);
userroute.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default userroute
