import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardLayout from "../components/DashboardLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Report() {
  const [departments, setDepartments] = useState([]);
  const [salaries, setSalaries] = useState([]);

  const DEPT_API = "http://localhost:5000/api/departiment/departiments";
  const SALARY_API = "http://localhost:5000/api/salary";

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(DEPT_API);
      setDepartments(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSalaries = async () => {
    try {
      const res = await axios.get(SALARY_API);
      setSalaries(res.data.data || res.data.finsal || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchSalaries();
  }, []);

  const totalDepartments = departments.length;
  const totalSalaries = salaries.length;

  const averageSalary =
    departments.reduce((acc, d) => acc + Number(d.grossSlalary), 0) /
    (totalDepartments || 1);

  const highestSalary = Math.max(
    ...departments.map((d) => Number(d.grossSlalary)),
    0
  );

  // Chart Data
  const labels = departments.map((d) => d.departimentName);
  const deptSalaries = departments.map((d) => Number(d.grossSlalary));

  const barData = {
    labels,
    datasets: [
      {
        label: "Department Salaries",
        data: deptSalaries,
        backgroundColor: "rgba(59,130,246,0.6)",
      },
    ],
  };

  const pieData = {
    labels,
    datasets: [
      {
        label: "Salary Distribution",
        data: deptSalaries,
        backgroundColor: [
          "#f87171",
          "#60a5fa",
          "#34d399",
          "#fbbf24",
          "#a78bfa",
        ],
      },
    ],
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Performance Trend",
        data: deptSalaries,
        borderColor: "#10b981",
        fill: false,
      },
    ],
  };

  const handlePrint = () => {
    window.print();
  };

  const authRaw = localStorage.getItem("authUser");
  let signedInEmail = "";
  try {
    signedInEmail = authRaw ? JSON.parse(authRaw)?.email : "";
  } catch {
    signedInEmail = "";
  }

  return (
    <DashboardLayout>
      <div className="bg-white p-4 md:p-6 rounded shadow-md min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Department Report
          </h1>
          <div className="text-sm text-gray-600">
            Status: {signedInEmail ? "Signed in" : "Guest"}
            {signedInEmail ? ` (${signedInEmail})` : ""}
          </div>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-5 rounded shadow text-center">
            <h2 className="text-sm text-gray-500">Total Departments</h2>
            <p className="text-2xl font-bold">{totalDepartments}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded shadow text-center">
            <h2 className="text-sm text-gray-500">Average Salary</h2>
            <p className="text-2xl font-bold">${averageSalary.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded shadow text-center">
            <h2 className="text-sm text-gray-500">Highest Salary</h2>
            <p className="text-2xl font-bold">${highestSalary}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded shadow mb-6">
          <div className="text-sm text-gray-600">
            CRUD Data shown:
          </div>
          <div className="mt-1 flex flex-wrap gap-3 text-sm">
            <span className="font-semibold">Departments:</span> {totalDepartments}
            <span className="font-semibold">Salaries (CRUD1):</span> {totalSalaries}
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Bar */}
          <div className="bg-white p-4 rounded shadow min-w-0">
            <h2 className="mb-2 font-semibold">Bar Chart</h2>
            <div className="w-full overflow-hidden min-w-0 h-[240px] sm:h-[280px] md:h-[300px]">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Pie */}
          <div className="bg-white p-4 rounded shadow min-w-0">
            <h2 className="mb-2 font-semibold">Pie Chart</h2>
            <div className="w-full overflow-hidden min-w-0 h-[240px] sm:h-[280px] md:h-[300px]">
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Line */}
          <div className="bg-white p-4 rounded shadow min-w-0 lg:col-span-2">
            <h2 className="mb-2 font-semibold">Line Chart</h2>
            <div className="w-full overflow-hidden min-w-0 h-[240px] sm:h-[280px] md:h-[320px]">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Extra responsive chart (Donut-style using Pie) */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="mb-2 font-semibold">Donut (from Pie)</h2>
          <div className="w-full overflow-hidden min-w-0 h-[240px] sm:h-[280px] md:h-[320px]">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "bottom" },
                },
              }}
            />
          </div>
        </div>


        {/* Table */}
        <div className="bg-white rounded shadow overflow-x-auto min-w-0">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Salary</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((d) => (
                <tr key={d._id} className="border-b">
                  <td className="p-2">{d.departimentCode}</td>
                  <td className="p-2">{d.departimentName}</td>
                  <td className="p-2">${d.grossSlalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Print */}
        <div className="mt-6 text-right">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print Report
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Report;

