import { useState, useEffect } from "react";
import API from "../api/axios";

const btnPrimary = "bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";
const btnSecondary = "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-gray-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";
const btnEdit = "bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150";
const btnDelete = "bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150";
const inputClass = "w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200";

const initialForm = {
  employeenumber: "", firstname: "", lastname: "", address: "",
  position: "", telephone: "", gender: "Male", hiredDate: "", department: ""
};

function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [empRes, depRes] = await Promise.all([
        API.get("/employees"),
        API.get("/departments")
      ]);
      setEmployees(empRes.data.employees || []);
      setDepartments(depRes.data.departments || []);
    } catch (err) {
      setError("Failed to load data");
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await API.put(`/employees/${editId}`, form);
      } else {
        await API.post("/employees", form);
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
      employeenumber: item.employeenumber, firstname: item.firstname,
      lastname: item.lastname, address: item.address, position: item.position,
      telephone: item.telephone, gender: item.gender, hiredDate: item.hiredDate,
      department: item.department?._id || item.department
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await API.delete(`/employees/${id}`);
      if (editId === id) { setEditId(null); setForm(initialForm); }
      fetchData();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const genders = ["Male", "Female", "Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Employees</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <input type="text" name="employeenumber" value={form.employeenumber} onChange={handleChange} placeholder="Employee Number" required className={inputClass}/>
            <input type="text" name="firstname" value={form.firstname} onChange={handleChange} placeholder="First Name" required className={inputClass}/>
            <input type="text" name="lastname" value={form.lastname} onChange={handleChange} placeholder="Last Name" required className={inputClass}/>
            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" required className={inputClass}/>
            <input type="text" name="position" value={form.position} onChange={handleChange} placeholder="Position" required className={inputClass}/>
            <input type="number" name="telephone" value={form.telephone} onChange={handleChange} placeholder="Telephone" required className={inputClass}/>
            <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <input type="date" name="hiredDate" value={form.hiredDate} onChange={handleChange} required className={inputClass}/>
            <select name="department" value={form.department} onChange={handleChange} required className={inputClass}>
              <option value="">Select Department</option>
              {departments.map(d => (
                <option key={d._id} value={d._id}>{d.departimentname} ({d.departimentcode})</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" className={btnPrimary}>
              {editId ? "Update Employee" : "Add Employee"}
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
                  <th className="p-3 text-left font-semibold">Emp #</th>
                  <th className="p-3 text-left font-semibold">Name</th>
                  <th className="p-3 text-left font-semibold">Position</th>
                  <th className="p-3 text-left font-semibold">Department</th>
                  <th className="p-3 text-left font-semibold">Gender</th>
                  <th className="p-3 text-center font-semibold w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.length === 0 ? (
                  <tr><td colSpan="6" className="p-12 text-center text-gray-400">No employees yet</td></tr>
                ) : (
                  employees.map((item, i) => (
                    <tr key={item._id} className={`hover:bg-orange-50/50 transition-colors duration-150 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                      <td className="p-3 font-medium text-gray-800">{item.employeenumber}</td>
                      <td className="p-3 text-gray-600">{item.firstname} {item.lastname}</td>
                      <td className="p-3 text-gray-600">{item.position}</td>
                      <td className="p-3"><span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-sm">{item.department?.departimentname || "-"}</span></td>
                      <td className="p-3 text-gray-600">{item.gender}</td>
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
export default EmployeePage;
