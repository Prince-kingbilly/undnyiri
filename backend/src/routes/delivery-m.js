import express from "express"
import {ins,fin,fii,dele,upd} from "../controller/delivery-c.js"

const delroute=express.Router();
delroute.post("/create",ins);
delroute.get("/find",fin);
delroute.get("/findone/:id",fii);
delroute.post("/delete/:id",dele)
delroute.post("/update/:id",upd)

export default delroute