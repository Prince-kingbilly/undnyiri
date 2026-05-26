import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaFileAlt, FaSignInAlt, FaUser, FaUsers, FaMoneyBillWave } from "react-icons/fa";

const navItems = [
  { to: "/login", label: "Sign in", icon: FaSignInAlt },
  { to: "/department", label: "CRUD (Department)", icon: FaUsers },
  { to: "/salary", label: "CRUD1 (Salary)", icon: FaMoneyBillWave },
  { to: "/report", label: "Report", icon: FaFileAlt },
];

export default function DashboardLayout({ children }) {
  // Left sidebar should be constant (no slide open/close)
  // Keeping state hook import stable if needed elsewhere.
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen bg-gray-200 overflow-hidden">
      {/* Mobile top bar (hamburger hidden because sidebar is constant) */}
      <div className="md:hidden sticky top-0 z-40 bg-gray-900 text-white">
        <div className="flex items-center gap-2 font-semibold px-4 py-3">
          <FaHome />
          <span>EPMS</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar (always visible) */}
        <aside className="fixed left-0 top-0 z-50 w-64 h-screen bg-gray-900 text-white p-4">
          <div className="flex items-center justify-between md:justify-center gap-2">
            <div className="flex flex-col">
              <span className="font-bold text-lg">EPMS</span>
              <span className="text-xs text-gray-400">Dashboard</span>
            </div>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    "flex items-center gap-3 px-3 py-2 rounded transition " +
                    (active ? "bg-white/10" : "hover:bg-white/10")
                  }
                >
                  <Icon />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>
                {localStorage.getItem("authUser") ? "Signed in" : "Guest"}
              </span>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 ml-64 h-[calc(100vh-56px)] md:h-screen overflow-y-auto min-w-0">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}


