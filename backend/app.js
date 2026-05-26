import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/config.js";
import suproute from "./src/routes/supplier-m.js";
import shiproute from "./src/routes/shipmentr.js";
import delroute from "./src/routes/delivery-m.js";
import userroute from "./src/routes/userr.js";

const app=express();
app.use(express.json());
app.use(cors());
dotenv.config()
connectDB()

app.use("/api/supplier",suproute);
app.use("/api/shipment",shiproute);
app.use("/api/delivery",delroute);

app.use("/api/reg",userroute);

const PORT=process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`app is running:${PORT}`)
})
export default app

