import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/config.js";
<<<<<<< HEAD
import suproute from "./src/routes/departiment.js";
import shiproute from "./src/routes/employeeroute.js";
import delroute from "./src/routes/salaryRoute.js";
import userroute from "./src/routes/userr.js";
import reportRoute from "./src/routes/report.js";

dotenv.config()
connectDB()
=======
import suproute from "./src/routes/supplier-m.js";
import shiproute from "./src/routes/shipmentr.js";
import delroute from "./src/routes/delivery-m.js";
import userroute from "./src/routes/userr.js";
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259

const app=express();
app.use(express.json());
app.use(cors());
<<<<<<< HEAD

app.use("/api/departments",suproute);
app.use("/api/employees",shiproute);
app.use("/api/salaries",delroute);
app.use("/api/auth",userroute);
app.use("/api/reports",reportRoute);
=======
dotenv.config()
connectDB()

app.use("/api/supplier",suproute);
app.use("/api/shipment",shiproute);
app.use("/api/delivery",delroute);

app.use("/api/reg",userroute);
>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259

const PORT=process.env.PORT || 5000 ;
app.listen(PORT,()=>{
    console.log(`app is running:${PORT}`)
})
export default app
<<<<<<< HEAD
=======

>>>>>>> 4a456bd0be3043e3e0a1997350e30e5eaaa92259
