import { useState, useEffect } from "react";
import API from "../api/axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const COLORS = ["#f97316", "#6b7280", "#9ca3af", "#d1d5db", "#4b5563", "#374151"];

const btnTab = (active) =>
  `px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
    active
      ? "bg-gray-800 text-white shadow-gray-300 hover:bg-gray-700"
      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200"
  }`;

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [salaryReport, setSalaryReport] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [statRes, salRes, monRes] = await Promise.all([
          API.get("/reports/department-stats"),
          API.get("/reports/salary-report"),
          API.get("/reports/monthly-salary")
        ]);
        setStats(statRes.data);
        setSalaryReport(salRes.data);
        setMonthly(monRes.data.report || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReports();
  }, []);

  const MetricCard = ({ title, value }) => (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
      <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">{title}</p>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );

  const deptPieData = (stats?.stats || []).map(s => ({
    name: s.departmentName,
    value: s.employeeCount
  }));

  const salaryBarData = (salaryReport?.report || []).map(s => ({
    name: s.employeeName?.split(" ")[0],
    Gross: s.totalGross,
    Net: s.totalNet,
    Deduction: s.totalDeduction
  }));

  const monthlyBarData = monthly.map(m => ({
    name: m.month?.slice(0, 3),
    Gross: m.totalGross,
    Net: m.totalNet,
    Deduction: m.totalDeduction,
    Count: m.employeeCount
  }));

  return (
    <div className="min-h-screen bg-gray-300 from-slate-50 to-slate-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Total Employees" value={stats?.totalEmployees ?? "-"} />
          <MetricCard title="Total Departments" value={stats?.totalDepartments ?? "-"} />
          <MetricCard title="Total Payroll (Net)" value={salaryReport?.overall ? `$${(salaryReport.overall.totalNet / 1000).toFixed(1)}k` : "-"} />
          <MetricCard title="Avg Net Salary" value={salaryReport?.overall ? `$${salaryReport.overall.avgNet?.toFixed(0)}` : "-"} />
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {["overview", "departments", "monthly"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={btnTab(activeTab === tab)}>
              {tab === "overview" ? "Employee Salary Report" : tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Salary Comparison by Employee</h2>
              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={salaryBarData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                  <Legend wrapperStyle={{ paddingTop: 12 }} />
                  <Bar dataKey="Gross" fill="#6b7280" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Net" fill="#f97316" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="Deduction" fill="#d1d5db" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Detailed Salary Report</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                      <th className="p-4 text-left font-semibold">Employee</th>
                      <th className="p-4 text-left font-semibold">Emp #</th>
                      <th className="p-4 text-right font-semibold">Total Gross</th>
                      <th className="p-4 text-right font-semibold">Total Deduction</th>
                      <th className="p-4 text-right font-semibold">Total Net</th>
                      <th className="p-4 text-center font-semibold">Payments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryReport?.report?.length > 0 ? (
                      salaryReport.report.map((item, i) => (
                        <tr key={i} className={`hover:bg-orange-50/50 transition-colors duration-150 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                          <td className="p-4 font-medium text-gray-800">{item.employeeName}</td>
                          <td className="p-4 text-gray-600">{item.employeeNumber}</td>
                          <td className="p-4 text-right text-gray-600">${item.totalGross?.toFixed(2)}</td>
                          <td className="p-4 text-right text-gray-600">${item.totalDeduction?.toFixed(2)}</td>
                          <td className="p-4 text-right font-semibold text-gray-800">${item.totalNet?.toFixed(2)}</td>
                          <td className="p-4 text-center"><span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">{item.paymentCount}</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="6" className="p-12 text-center text-gray-400">No salary data</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {salaryReport?.overall && (
                <div className="p-5 bg-gradient-to-r from-gray-50 to-orange-50 border-t border-gray-100 flex flex-wrap gap-6 text-sm">
                  <span className="font-semibold text-gray-700">Overall Summary:</span>
                  <span className="text-gray-600">Total Gross: <strong className="text-gray-800">${salaryReport.overall.totalGross?.toFixed(2)}</strong></span>
                  <span className="text-gray-600">Total Deductions: <strong className="text-gray-800">${salaryReport.overall.totalDeduction?.toFixed(2)}</strong></span>
                  <span className="text-gray-600">Total Net: <strong className="text-orange-600">${salaryReport.overall.totalNet?.toFixed(2)}</strong></span>
                  <span className="text-gray-600">Avg Net: <strong className="text-gray-800">${salaryReport.overall.avgNet?.toFixed(2)}</strong></span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "departments" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Employees per Department</h2>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={deptPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110}
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: "#9ca3af", strokeWidth: 1 }}>
                    {deptPieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {stats?.stats?.length > 0 ? (
                stats.stats.map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-5 border border-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{item.departmentName}</h3>
                        <p className="text-sm text-gray-500">{item.departmentCode}</p>
                        {item.managerName && (
                          <p className="text-xs text-gray-400 mt-1">Manager: {item.managerName}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-orange-500">{item.employeeCount}</div>
                        <p className="text-xs text-gray-400 font-medium">employees</p>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full" style={{ width: `${Math.min(100, (item.employeeCount / (stats?.totalEmployees || 1)) * 100)}%` }}></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-12 bg-white rounded-2xl border border-gray-100">No department stats</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "monthly" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Salary Trend</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={monthlyBarData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                    <Legend wrapperStyle={{ paddingTop: 12 }} />
                    <Line type="monotone" dataKey="Gross" stroke="#6b7280" strokeWidth={2.5} dot={{ r: 4, fill: "#6b7280" }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Net" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: "#f97316" }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Deduction" stroke="#d1d5db" strokeWidth={2.5} dot={{ r: 4, fill: "#d1d5db" }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Employees Paid per Month</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={monthlyBarData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }} />
                    <Bar dataKey="Count" fill="#f97316" radius={[8, 8, 0, 0]} maxBarSize={50}>
                      {monthlyBarData.map((_, i) => (
                        <Cell key={i} fill={i % 2 === 0 ? "#f97316" : "#fdba74"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">Monthly Breakdown</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                      <th className="p-4 text-left font-semibold">Month</th>
                      <th className="p-4 text-right font-semibold">Total Gross</th>
                      <th className="p-4 text-right font-semibold">Total Deduction</th>
                      <th className="p-4 text-right font-semibold">Total Net</th>
                      <th className="p-4 text-center font-semibold">Employees Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthly.length > 0 ? (
                      monthly.map((item, i) => (
                        <tr key={i} className={`hover:bg-orange-50/50 transition-colors duration-150 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                          <td className="p-4 font-medium text-gray-800">{item.month}</td>
                          <td className="p-4 text-right text-gray-600">${item.totalGross?.toFixed(2)}</td>
                          <td className="p-4 text-right text-gray-600">${item.totalDeduction?.toFixed(2)}</td>
                          <td className="p-4 text-right font-semibold text-gray-800">${item.totalNet?.toFixed(2)}</td>
                          <td className="p-4 text-center"><span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">{item.employeeCount}</span></td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="p-12 text-center text-gray-400">No monthly data</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Dashboard;
