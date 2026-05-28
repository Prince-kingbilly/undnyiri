import express from "express"
import {ins,fin,fii,del,upd} from "../controller/shipment-c.js"

const shiproute=express.Router();
shiproute.post("/create",ins);
shiproute.get("/find",fin);
shiproute.get("/findone/:id",fii);
shiproute.post("/delete/:id",del)
shiproute.post("/update/:id",upd)

export default shiproute