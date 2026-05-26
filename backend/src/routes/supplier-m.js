import express from "express"
import {ins,fin,fii,del,upd} from "../controller/supplier-c.js"

const suproute=express.Router();
suproute.post("/create",ins);
suproute.get("/find",fin);
suproute.get("/findone/:id",fii);
suproute.post("/delete/:id",del)
suproute.post("/update/:id",upd)

export default suproute