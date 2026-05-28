import { useState, useEffect } from "react";
import API from "../api/axios";

const btnPrimary = "bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";
const btnSecondary = "bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md shadow-gray-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200";
const btnEdit = "bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150";
const btnDelete = "bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150";
const inputClass = "w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 hover:bg-white transition-all duration-200";

function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ departimentcode: "", departimentname: "", manager: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [depRes, empRes] = await Promise.all([
        API.get("/departments"),
        API.get("/employees")
      ]);
      setDepartments(depRes.data.departments || []);
      setEmployees(empRes.data.employees || []);
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
      const payload = {
        departimentcode: form.departimentcode,
        departimentname: form.departimentname,
        manager: form.manager || null
      };
      if (editId) {
        await API.put(`/departments/${editId}`, payload);
      } else {
        await API.post("/departments", payload);
      }
      setForm({ departimentcode: "", departimentname: "", manager: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.msg || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setForm({
      departimentcode: item.departimentcode,
      departimentname: item.departimentname,
      manager: item.manager?._id || item.manager || ""
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this department?")) return;
    try {
      await API.delete(`/departments/${id}`);
      if (editId === id) { setEditId(null); setForm({ departimentcode: "", departimentname: "", manager: "" }); }
      fetchData();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Departments</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 p-6 mb-8 border border-gray-100">
          <div className="grid md:grid-cols-3 gap-4 mb-5">
            <input type="text" name="departimentcode" value={form.departimentcode} onChange={handleChange}
              placeholder="Department Code" required className={inputClass}/>
            <input type="text" name="departimentname" value={form.departimentname} onChange={handleChange}
              placeholder="Department Name" required className={inputClass}/>
            <select name="manager" value={form.manager} onChange={handleChange} className={inputClass}>
              <option value="">No Manager</option>
              {employees.map(e => (
                <option key={e._id} value={e._id}>{e.firstname} {e.lastname} ({e.employeenumber})</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <button type="submit" className={btnPrimary}>
              {editId ? "Update Department" : "Add Department"}
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm({ departimentcode: "", departimentname: "", manager: "" }); }} className={btnSecondary}>
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
                  <th className="p-4 text-left font-semibold">Code</th>
                  <th className="p-4 text-left font-semibold">Name</th>
                  <th className="p-4 text-left font-semibold">Manager</th>
                  <th className="p-4 text-center font-semibold w-48">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.length === 0 ? (
                  <tr><td colSpan="4" className="p-12 text-center text-gray-400">No departments yet</td></tr>
                ) : (
                  departments.map((item, i) => (
                    <tr key={item._id} className={`hover:bg-orange-50/50 transition-colors duration-150 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                      <td className="p-4 font-medium text-gray-800">{item.departimentcode}</td>
                      <td className="p-4 text-gray-600">{item.departimentname}</td>
                      <td className="p-4">
                        {item.manager ? (
                          <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-sm">
                            {item.manager.firstname} {item.manager.lastname}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
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
export default DepartmentPage;
