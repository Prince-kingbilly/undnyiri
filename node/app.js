import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import departimentRoute from "./src/routes/deapartimentroutes.js";
import router from "./src/routes/salary-routes.js";
import userRoute from "./src/routes/userroutes.js";
import cors from "cors";

const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());

connectDB()
app.use("/api/departiment",departimentRoute);
app.use("/api/salary", router);

app.use("/api/user", userRoute);


const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{

console.log(`app is running on:${PORT}`)

})
