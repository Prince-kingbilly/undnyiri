import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

function Department() {
  const [Departments, setData] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    departimentCode: "",
    departimentName: "",
    grossSlalary: "",
  });

  const API = "http://localhost:5000/api/departiment/departiments";

  // READ
  const fetchData = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // initial load
  // eslint-disable-next-line react-hooks/exhaustive-deps
  fetchData();

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // CREATE or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }

      setEditId(null);
      fetchData();
      setForm({
        departimentCode: "",
        departimentName: "",
        grossSlalary: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/api/departiment/delete/" + id);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // SET DATA TO FORM FOR EDIT
  const handleEdit = (item) => {
    setForm({
      departimentCode: item.departimentCode,
      departimentName: item.departimentName,
      grossSlalary: item.grossSlalary,
    });
    setEditId(item._id);
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-5 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Department Management</h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "20px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <input name="departimentCode" placeholder="Code" value={form.departimentCode} onChange={handleChange} className="border p-2 rounded"/>
          <input name="departimentName" placeholder="Name" value={form.departimentName} onChange={handleChange}className="border p-2 rounded"/>
          <input name="grossSlalary" placeholder="Salary" value={form.grossSlalary} onChange={handleChange} className="border p-2 rounded"/>

          <button type="submit" className="bg-orange-500 text-white p-2 rounded hover:bg-blue-600">{editId ? "Update" : "Add"}</button>
        </form>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table border="2" cellPadding="10" width="100%" className="w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border p-2">Code</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Salary</th>
                <th className="border p-2">action</th>
              </tr>
            </thead>

            <tbody>
              {Departments.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">{item.departimentCode}</td>
                  <td className="border p-2">{item.departimentName}</td>
                  <td className="border p-2">{item.grossSlalary}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-gray-600 px-2 py-1 text-white rounded"
                    >
                      update one
                    </button>

&

                    <button onClick={() => handleDelete(item._id)} className="bg-orange-500 px-3 py-1 text-white rounded">
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

export default Department;

