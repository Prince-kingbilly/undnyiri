import express from "express"
import {ins,fin,fii,dele,upd} from "../controller/departiment.js"

const delroute=express.Router();
delroute.post("/",ins);
delroute.get("/",fin);
delroute.get("/:id",fii);
delroute.delete("/:id",dele)
delroute.put("/:id",upd)

export default delroute
