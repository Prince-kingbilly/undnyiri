import ship from "../model/employeem.js";
import supp from "../model/salary.js";
import delMod from "../model/departimentm.js";

export const departmentStats = async (req, res) => {
    try {
        const stats = await ship.aggregate([
            {
                $group: {
                    _id: "$department",
                    employeeCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "delmods",
                    localField: "_id",
                    foreignField: "_id",
                    as: "department"
                }
            },
            { $unwind: "$department" },
            {
                $lookup: {
                    from: "ships",
                    localField: "department.manager",
                    foreignField: "_id",
                    as: "manager"
                }
            },
            { $unwind: { path: "$manager", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 0,
                    departmentCode: "$department.departimentcode",
                    departmentName: "$department.departimentname",
                    managerName: { $cond: { if: "$manager", then: { $concat: ["$manager.firstname", " ", "$manager.lastname"] }, else: null } },
                    employeeCount: 1
                }
            }
        ]);
        const totalEmployees = await ship.countDocuments();
        const totalDepartments = await delMod.countDocuments();
        return res.status(200).json({ stats, totalEmployees, totalDepartments });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};

export const salaryReport = async (req, res) => {
    try {
        const report = await supp.aggregate([
            {
                $group: {
                    _id: "$employee",
                    totalGross: { $sum: "$grosssalary" },
                    totalDeduction: { $sum: "$totaldeduction" },
                    totalNet: { $sum: "$netsalary" },
                    paymentCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "ships",
                    localField: "_id",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { $unwind: "$employee" },
            {
                $project: {
                    _id: 0,
                    employeeName: { $concat: ["$employee.firstname", " ", "$employee.lastname"] },
                    employeeNumber: "$employee.employeenumber",
                    totalGross: 1,
                    totalDeduction: 1,
                    totalNet: 1,
                    paymentCount: 1
                }
            },
            { $sort: { totalNet: -1 } }
        ]);
        const overall = await supp.aggregate([
            {
                $group: {
                    _id: null,
                    totalGross: { $sum: "$grosssalary" },
                    totalDeduction: { $sum: "$totaldeduction" },
                    totalNet: { $sum: "$netsalary" },
                    avgNet: { $avg: "$netsalary" }
                }
            }
        ]);
        return res.status(200).json({ report, overall: overall[0] || null });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};

export const monthlySalaryReport = async (req, res) => {
    try {
        const report = await supp.aggregate([
            {
                $group: {
                    _id: "$monthofpayment",
                    totalGross: { $sum: "$grosssalary" },
                    totalDeduction: { $sum: "$totaldeduction" },
                    totalNet: { $sum: "$netsalary" },
                    employeeCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    totalGross: 1,
                    totalDeduction: 1,
                    totalNet: 1,
                    employeeCount: 1
                }
            }
        ]);
        return res.status(200).json({ report });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};

export const employeeList = async (req, res) => {
    try {
        const employees = await ship.find()
            .populate("department", "departimentcode departimentname")
            .lean();
        const enriched = await Promise.all(employees.map(async (emp) => {
            const salaryInfo = await supp.findOne({ employee: emp._id })
                .sort({ createdAt: -1 })
                .select("grosssalary totaldeduction netsalary monthofpayment");
            return { ...emp, latestSalary: salaryInfo };
        }));
        return res.status(200).json({ employees: enriched });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};
