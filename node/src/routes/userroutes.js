import express from "express";
import { createUser,loginUser,findUsers,findUserById,deleteUser,updateUser } from "../controller/user-controller.js";
 
const userRoute=express.Router()

userRoute.post("/register",createUser);
userRoute.post("/login",loginUser);
userRoute.get("/findu",findUsers);
userRoute.get("/findone/:id",findUserById);
userRoute.delete("/deleteone/:id",deleteUser)
userRoute.put("/updateid/:id",updateUser)

export default userRoute