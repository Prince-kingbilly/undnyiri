import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

function Salary() {
  const API = "http://localhost:5000/api/salary";

  const initialForm = {
    GlossSalary: "",
    TotalDeduction: "",
    NetSalary: "",
    month: "",
  };

  const [salaryData, setSalaryData] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchSalaries = async () => {
    try {
      const res = await axios.get(API);
      setSalaryData(res.data.data || res.data.finsal || []);
    } catch (err) {
      console.log("GET error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }

      setForm(initialForm);
      setEditId(null);
      fetchSalaries();
    } catch (err) {
      console.log("SUBMIT error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchSalaries();
    } catch (err) {
      console.log("DELETE error:", err.message);
    }
  };

  const handleEdit = (item) => {
    setForm({
      GlossSalary: item.GlossSalary,
      TotalDeduction: item.TotalDeduction,
      NetSalary: item.NetSalary,
      month: item.month,
    });
    setEditId(item._id);
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Salary CRUD System</h2>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <input
            name="GlossSalary"
            value={form.GlossSalary}
            onChange={handleChange}
            placeholder="Gross Salary"
            className="border p-2 rounded"
          />

          <input
            name="TotalDeduction"
            value={form.TotalDeduction}
            onChange={handleChange}
            placeholder="Total Deduction"
            className="border p-2 rounded"
          />

          <input
            name="NetSalary"
            value={form.NetSalary}
            onChange={handleChange}
            placeholder="Net Salary"
            className="border p-2 rounded"
          />

          <input
            name="month"
            value={form.month}
            onChange={handleChange}
            placeholder="Month"
            className="border p-2 rounded"
          />

          <button
            type="submit"
            className="bg-orange-500 text-white p-2 rounded hover:bg-blue-600"
          >
            {editId ? "Update Salary" : "Add Salary"}
          </button>
        </form>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Gross</th>
                <th className="border p-2">Deduction</th>
                <th className="border p-2">Net</th>
                <th className="border p-2">Month</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {salaryData.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.GlossSalary}</td>
                  <td className="border p-2">{item.TotalDeduction}</td>
                  <td className="border p-2">{item.NetSalary}</td>
                  <td className="border p-2">{item.month}</td>

                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-gray-700 px-3 py-1 text-white rounded"
                    >
                      update one
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-orange-500 px-3 py-1 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Salary;

