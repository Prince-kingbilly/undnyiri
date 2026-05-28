import express from "express";
import { creatDepartiment,findDipartiment,findidd,deletDepartiment,updataDepartimant} from "../controller/departiment-controller.js";
const departimentRoute=express.Router();
departimentRoute.post("/departiments",creatDepartiment);
departimentRoute.get("/departiments",findDipartiment);
departimentRoute.get("/find/:id",findidd);
departimentRoute.delete("/delete/:id",deletDepartiment);
departimentRoute.put("/update/:id",updataDepartimant);

export default departimentRoute 
