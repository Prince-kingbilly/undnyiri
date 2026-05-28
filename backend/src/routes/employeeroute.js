import express from "express"
import {ins,fin,fii,del,upd} from "../controller/employee.js"

const shiproute=express.Router();
shiproute.post("/",ins);
shiproute.get("/",fin);
shiproute.get("/:id",fii);
shiproute.delete("/:id",del)
shiproute.put("/:id",upd)

export default shiproute
