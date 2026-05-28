import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/departments", label: "Departments" },
  { to: "/employees", label: "Employees" },
  { to: "/salaries", label: "Salaries" },
  { to: "/dashboard", label: "Dashboard" },
];

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white flex items-center justify-between px-4 h-14 shadow-lg">
        <Link to="/" className="text-lg font-bold tracking-wide">EPMS</Link>
        <button onClick={() => setSidebarOpen(true)} className="text-2xl focus:outline-none">☰</button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-60 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}>
        
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-700">
          <span className="text-lg font-bold tracking-wide">EPMS</span>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-xl focus:outline-none">✕</button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition
                  ${isActive
                    ? "bg-gray-700 text-white border-r-4 border-orange-400"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-700 p-4">
          {user ? (
            <button onClick={handleLogout}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2.5 rounded-lg text-sm font-semibold transition">
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setSidebarOpen(false)}
              className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-semibold transition">
              Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
export default Navbar;
