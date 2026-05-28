// import express from "express";
// import { creatsalary,findSalary,findss,deletSalary,updatSalary } from "../controller/salary-controller.js";

// const salaryRoutes=express.Router();

// salaryRoutes.post("/insertslary",creatsalary);
// salaryRoutes.get("/insertslary",findSalary);
// salaryRoutes.get("/findall/:id",findss);
// salaryRoutes.delete("/deletesalary/:id",deletSalary);
// salaryRoutes.put("/updeteid/:id",updatSalary);

// export default salaryRoutes



import express from "express";
import {
  creatsalary,
  findSalary,
  findss,
  deletSalary,
  updatSalary
} from "../controller/salary-controller.js";

const router = express.Router();

// CREATE
router.post("/", creatsalary);

// READ ALL
router.get("/", findSalary);

// READ ONE
router.get("/:id", findss);

// UPDATE
router.put("/:id", updatSalary);

// DELETE
router.delete("/:id", deletSalary);

export default router;