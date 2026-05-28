import { useState, useEffect } from "react";
import API from "../api/axios";
import DashboardLayout from "./DashboardLayout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
} from "recharts";

const COLORS = ["#f97316", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb"];

function Report() {
  const [suppliers, setSuppliers] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get("/supplier/find"),
      API.get("/shipment/find"),
      API.get("/delivery/find"),
    ]).then(([s, sh, d]) => {
      setSuppliers(s.data.suppliers || []);
      setShipments(sh.data.shipments || []);
      setDeliveries(d.data.deliveries || []);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  const entityCount = [
    { name: "Suppliers", count: suppliers.length },
    { name: "Shipments", count: shipments.length },
    { name: "Deliveries", count: deliveries.length },
  ];

  const statusCount = shipments.reduce((acc, s) => {
    const key = s.shipmentstatus || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const statusPie = Object.entries(statusCount).map(([name, value]) => ({ name, value }));

  const deliveryStatusCount = deliveries.reduce((acc, d) => {
    const key = d.deliverys || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const deliveryPie = Object.entries(deliveryStatusCount).map(([name, value]) => ({ name, value }));

  const shipmentByDest = shipments.reduce((acc, s) => {
    const key = s.destination || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const destBar = Object.entries(shipmentByDest).map(([name, count]) => ({ name, count }));

  if (loading) {
    return (
      <DashboardLayout title="Report">
        <p className="text-gray-500">Loading report data...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Report">
      <p className="text-gray-500 mb-6">Overview charts of your supply chain data</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Entity Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={entityCount}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 13 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipment Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {statusPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={deliveryPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {deliveryPie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipments by Destination</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={destBar} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 13 }} />
              <YAxis dataKey="name" type="category" tick={{ fill: "#6b7280", fontSize: 13 }} width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#6b7280" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-orange-500">{suppliers.length}</div>
            <div className="text-sm text-gray-500">Suppliers</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-orange-500">{shipments.length}</div>
            <div className="text-sm text-gray-500">Shipments</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-3xl font-bold text-orange-500">{deliveries.length}</div>
            <div className="text-sm text-gray-500">Deliveries</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Report;
