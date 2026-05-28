import express from "express";
import { departmentStats, salaryReport, monthlySalaryReport, employeeList } from "../controller/report.js";

const reportRoute = express.Router();
reportRoute.get("/department-stats", departmentStats);
reportRoute.get("/salary-report", salaryReport);
reportRoute.get("/monthly-salary", monthlySalaryReport);
reportRoute.get("/employees", employeeList);

export default reportRoute;
