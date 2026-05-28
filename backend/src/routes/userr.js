import express from "express";
import { register,login } from "../controller/user.js";
<<<<<<< HEAD
import { authMiddleware } from "../middleware/auth.js";
=======
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259

const userroute=express.Router();
userroute.post("/register",register);
userroute.post("/login",login);
<<<<<<< HEAD
userroute.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

=======
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
export default userroute
