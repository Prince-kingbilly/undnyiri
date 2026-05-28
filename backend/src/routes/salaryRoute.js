import express from "express"
import {ins,fin,fii,del,upd} from "../controller/salary.js"

const suproute=express.Router();
suproute.post("/",ins);
suproute.get("/",fin);
suproute.get("/:id",fii);
suproute.delete("/:id",del)
suproute.put("/:id",upd)

export default suproute
