import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardLayout from "./DashboardLayout";

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [form, setForm] = useState({ shipmentnumber: "", shipmentdate: "", shipmentstatus: "", destination: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchShipments(); }, []);

  const fetchShipments = async () => {
    try {
      const res = await API.get("/shipment/find");
      setShipments(res.data.shipments || []);
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
        await API.post(`/shipment/update/${editingId}`, form);
      } else {
        await API.post("/shipment/create", form);
      }
      setForm({ shipmentnumber: "", shipmentdate: "", shipmentstatus: "", destination: "" });
      setEditingId(null);
      setShowForm(false);
      fetchShipments();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (shipment) => {
    setForm({
      shipmentnumber: shipment.shipmentnumber,
      shipmentdate: shipment.shipmentdate,
      shipmentstatus: shipment.shipmentstatus,
      destination: shipment.destination,
    });
    setEditingId(shipment._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this shipment?")) {
      try {
        await API.post(`/shipment/delete/${id}`);
        fetchShipments();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <DashboardLayout title="Shipments">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <p className="text-gray-500 text-sm sm:text-base">Track shipment status and destinations</p>
        <button
          onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ shipmentnumber: "", shipmentdate: "", shipmentstatus: "", destination: "" }); }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer w-full sm:w-auto"
        >
          {showForm ? "Cancel" : "Add Shipment"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Shipment" : "New Shipment"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="shipmentnumber" value={form.shipmentnumber} onChange={handleChange} placeholder="Shipment Number" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="shipmentdate" type="number" value={form.shipmentdate} onChange={handleChange} placeholder="Shipment Date" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="shipmentstatus" value={form.shipmentstatus} onChange={handleChange} placeholder="Status" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
            <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" required />
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
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Shipment #</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Date</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600 hidden sm:table-cell">Destination</th>
              <th className="px-4 lg:px-6 py-3 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {shipments.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">{s.shipmentnumber}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden sm:table-cell">{s.shipmentdate}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700">{s.shipmentstatus}</td>
                <td className="px-4 lg:px-6 py-4 text-sm text-gray-700 hidden sm:table-cell max-w-[120px] truncate">{s.destination}</td>
                <td className="px-4 lg:px-6 py-4 text-sm space-x-2 whitespace-nowrap">
                  <button onClick={() => handleEdit(s)} className="bg-orange-500 hover:bg-orange-600 text-white px-2.5 lg:px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="bg-gray-500 hover:bg-gray-600 text-white px-2.5 lg:px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
            {shipments.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-400">No shipments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Shipments;
