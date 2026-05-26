import { Link } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout title="Supply Chain Management">
      <p className="text-gray-500 mb-8">Manage your suppliers, shipments, and deliveries</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Link
          to="/dashboard/suppliers"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-t-4 border-orange-500"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Suppliers</h3>
          <p className="text-gray-500 text-sm">Manage supplier information, contacts, and addresses</p>
        </Link>

        <Link
          to="/dashboard/shipments"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-t-4 border-orange-500"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipments</h3>
          <p className="text-gray-500 text-sm">Track shipment status, dates, and destinations</p>
        </Link>

        <Link
          to="/dashboard/deliveries"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border-t-4 border-orange-500"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Deliveries</h3>
          <p className="text-gray-500 text-sm">Monitor delivery codes, dates, and quantities</p>
        </Link>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
