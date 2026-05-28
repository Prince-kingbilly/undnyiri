import { useState, useEffect } from "react";
import API from "../api/axios";

const btnPrimary = "bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";
const btnSecondary = "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-gray-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";
const btnEdit = "bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150";
const btnDelete = "bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150";
const inputClass = "w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200";

const initialForm = {
  grosssalary: "", totaldeduction: "", netsalary: "", monthofpayment: "", employee: ""
};

function SalaryPage() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [salRes, empRes] = await Promise.all([
        API.get("/salaries"),
        API.get("/employees")
      ]);
      setSalaries(salRes.data.salaries || []);
      setEmployees(empRes.data.employees || []);
    } catch (err) {
      setError("Failed to load data");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    const name = e.target.name;
    setForm((prev) => {
      const updated = { ...prev, [name]: val };
      if (name === "grosssalary" || name === "totaldeduction") {
        const gross = parseFloat(updated.grosssalary) || 0;
        const ded = parseFloat(updated.totaldeduction) || 0;
        updated.netsalary = Math.max(0, gross - ded);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        ...form,
        grosssalary: parseFloat(form.grosssalary),
        totaldeduction: parseFloat(form.totaldeduction),
        netsalary: parseFloat(form.netsalary)
      };
      if (editId) {
        await API.put(`/salaries/${editId}`, payload);
      } else {
        await API.post("/salaries", payload);
      }
      setForm(initialForm);
      setEditId(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.msg || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setForm({
      grosssalary: item.grosssalary, totaldeduction: item.totaldeduction,
      netsalary: item.netsalary, monthofpayment: item.monthofpayment,
      employee: item.employee?._id || item.employee
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this salary record?")) return;
    try {
      await API.delete(`/salaries/${id}`);
      if (editId === id) { setEditId(null); setForm(initialForm); }
      fetchData();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Salaries</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <select name="employee" value={form.employee} onChange={handleChange} required className={inputClass}>
              <option value="">Select Employee</option>
              {employees.map(e => (
                <option key={e._id} value={e._id}>{e.firstname} {e.lastname} ({e.employeenumber})</option>
              ))}
            </select>
            <select name="monthofpayment" value={form.monthofpayment} onChange={handleChange} required className={inputClass}>
              <option value="">Select Month</option>
              {months.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <input type="number" name="grosssalary" value={form.grosssalary} onChange={handleChange} placeholder="Gross Salary" required className={inputClass}/>
            <input type="number" name="totaldeduction" value={form.totaldeduction} onChange={handleChange} placeholder="Total Deduction" required className={inputClass}/>
            <input type="number" name="netsalary" value={form.netsalary} onChange={handleChange} placeholder="Net Salary (auto)" readOnly
              className="w-full p-3 border border-orange-200 rounded-xl bg-orange-50 text-gray-800 font-semibold"/>
          </div>
          <div className="flex gap-3">
            <button type="submit" className={btnPrimary}>
              {editId ? "Update Salary" : "Add Salary"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm(initialForm); }} className={btnSecondary}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                  <th className="p-3 text-left font-semibold">Employee</th>
                  <th className="p-3 text-left font-semibold">Month</th>
                  <th className="p-3 text-right font-semibold">Gross</th>
                  <th className="p-3 text-right font-semibold">Deduction</th>
                  <th className="p-3 text-right font-semibold">Net</th>
                  <th className="p-3 text-center font-semibold w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.length === 0 ? (
                  <tr><td colSpan="6" className="p-12 text-center text-gray-400">No salary records yet</td></tr>
                ) : (
                  salaries.map((item, i) => (
                    <tr key={item._id} className={`hover:bg-orange-50/50 transition-colors duration-150 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                      <td className="p-3 text-gray-800 font-medium">{item.employee?.firstname} {item.employee?.lastname}</td>
                      <td className="p-3 text-gray-600">{item.monthofpayment}</td>
                      <td className="p-3 text-right text-gray-600">${item.grosssalary?.toFixed(2)}</td>
                      <td className="p-3 text-right text-gray-600">${item.totaldeduction?.toFixed(2)}</td>
                      <td className="p-3 text-right font-semibold text-gray-800">${item.netsalary?.toFixed(2)}</td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <button onClick={() => handleEdit(item)} className={btnEdit + " mr-2"}>Edit</button>
                        <button onClick={() => handleDelete(item._id)} className={btnDelete}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SalaryPage;
