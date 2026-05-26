import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardLayout from "./DashboardLayout";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({ suppliercode: "", suppliername: "", telephone: "", address: "", email: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchSuppliers(); }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await API.get("/supplier/find");
      setSuppliers(res.data.suppliers || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.post(`/supplier/update/${editingId}`, form);
      } else {
        await API.post("/supplier/create", form);
      }
      setForm({ suppliercode: "", suppliername: "", telephone: "", address: "", email: "" });
      setEditingId(null);
      setShowForm(false);
      fetchSuppliers();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (supplier) => {
    setForm({
      suppliercode: supplier.suppliercode,
      suppliername: supplier.suppliername,
      telephone: supplier.telephone,
      address: supplier.address,
      email: supplier.email,
    });
    setEditingId(supplier._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this supplier?")) {
      try {
        await API.post(`/supplier/delete/${id}`);
        fetchSuppliers();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <DashboardLayout title="Suppliers">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <p className="text-gray-500 text-sm sm:text-base">Manage supplier information</p>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ suppliercode: "", suppliername: "", telephone: "", address: "", email: "" }); }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer w-full sm:w-auto"
        >
          {showForm ? "Cancel" : "Add Supplier"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Supplier" : "New Supplier"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="suppliercode" value={form.suppliercode} onChange={handleChange} placeholder="Supplier Code" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="suppliername" value={form.suppliername} onChange={handleChange} placeholder="Supplier Name" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="telephone" type="number" value={form.telephone} onChange={handleChange} placeholder="Telephone" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:col-span-2" required />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition sm:col-span-2 cursor-pointer">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Code</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Name</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Telephone</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden md:table-cell">Address</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Email</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {suppliers.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">{s.suppliercode}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">{s.suppliername}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden sm:table-cell">{s.telephone}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden md:table-cell max-w-[120px] truncate">{s.address}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden sm:table-cell max-w-[150px] truncate">{s.email}</td>
                <td className="px-4 lg:px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                  <button onClick={() => handleEdit(s)} className="bg-orange-500 hover:bg-orange-600 text-white px-2.5 lg:px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="bg-gray-500 hover:bg-gray-600 text-white px-2.5 lg:px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-400">No suppliers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Suppliers;
