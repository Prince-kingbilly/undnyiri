import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function DashboardLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/suppliers", label: "Suppliers" },
    { to: "/dashboard/shipments", label: "Shipments" },
    { to: "/dashboard/deliveries", label: "Deliveries" },
    { to: "/dashboard/report", label: "Report" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-300 flex relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white flex flex-col transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-lg font-bold">
            <span className="text-orange-400">SCMS</span>
          </h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white cursor-pointer text-xl leading-none">&times;</button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setSidebarOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive(link.to)
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400 mb-2 truncate">{user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-800 cursor-pointer">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">{title}</h2>
        </header>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-4 lg:py-6 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
