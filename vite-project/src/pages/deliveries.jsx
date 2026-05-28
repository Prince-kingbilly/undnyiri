import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardLayout from "./DashboardLayout";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({ deliverycode: "", deliverydate: "", quantityd: "", deliverys: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchDeliveries(); }, []);

  const fetchDeliveries = async () => {
    try {
      const res = await API.get("/delivery/find");
      setDeliveries(res.data.deliveries || []);
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
        await API.post(`/delivery/update/${editingId}`, form);
      } else {
        await API.post("/delivery/create", form);
      }
      setForm({ deliverycode: "", deliverydate: "", quantityd: "", deliverys: "" });
      setEditingId(null);
      setShowForm(false);
      fetchDeliveries();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (delivery) => {
    setForm({
      deliverycode: delivery.deliverycode,
      deliverydate: delivery.deliverydate,
      quantityd: delivery.quantityd,
      deliverys: delivery.deliverys,
    });
    setEditingId(delivery._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this delivery?")) {
      try {
        await API.post(`/delivery/delete/${id}`);
        fetchDeliveries();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <DashboardLayout title="Deliveries">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <p className="text-gray-500 text-sm sm:text-base">Monitor delivery codes, dates, and quantities</p>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ deliverycode: "", deliverydate: "", quantityd: "", deliverys: "" }); }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer w-full sm:w-auto"
        >
          {showForm ? "Cancel" : "Add Delivery"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Delivery" : "New Delivery"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="deliverycode" value={form.deliverycode} onChange={handleChange} placeholder="Delivery Code" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="deliverydate" type="number" value={form.deliverydate} onChange={handleChange} placeholder="Delivery Date" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="quantityd" value={form.quantityd} onChange={handleChange} placeholder="Quantity" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="deliverys" value={form.deliverys} onChange={handleChange} placeholder="Delivery Status" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition sm:col-span-2 cursor-pointer">
              {editingId ? "Update" : "Create"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Delivery Code</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Date</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Quantity</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((d) => (
              <tr key={d._id} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">{d.deliverycode}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden sm:table-cell">{d.deliverydate}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden sm:table-cell">{d.quantityd}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">{d.deliverys}</td>
                <td className="px-4 lg:px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                  <button onClick={() => handleEdit(d)} className="bg-orange-500 hover:bg-orange-600 text-white px-2.5 lg:px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">Edit</button>
                  <button onClick={() => handleDelete(d._id)} className="bg-gray-500 hover:bg-gray-600 text-white px-2.5 lg:px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {deliveries.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">No deliveries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Deliveries;
