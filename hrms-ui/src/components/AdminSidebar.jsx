import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt, FaUsers, FaUserTie, FaCalendarCheck,
  FaClipboardList, FaMoneyBill, FaBullseye,
  FaBell, FaChartBar, FaCog, FaShieldAlt,
  FaChevronDown, FaBars, FaSearch
} from "react-icons/fa";

/* ---------------- ROLE ACCESS ---------------- */
const ROLE_ACCESS = {
  Admin: [
    "Dashboard","User Management","Employee Management","Attendance",
    "Leave Management","Payroll","Recruitment","Performance",
    "Notifications","Reports","Settings","Security & Audit"
  ],
  HR: [
    "Dashboard","Employee Management","Attendance",
    "Leave Management","Recruitment","Performance","Reports"
  ],
  Employee: ["Dashboard","Attendance","Leave Management"]
};

/* ---------------- MENU CONFIG ---------------- */
const MENU = [
  { title: "Dashboard", icon: <FaTachometerAlt />, items: [
    { label: "Overview", path: "/admin/dashboard" },
    { label: "Analytics", path: "/admin/analytics" },
    { label: "Reports Snapshot", path: "/admin/reports-snapshot" }
  ]},
  { title: "User Management", icon: <FaUsers />, items: [
    { label: "Admin Users", path: "/admin/users/admins" },
    { label: "HR Users", path: "/admin/users/hr" },
    { label: "Employees", path: "/admin/users/employees" },
    { label: "Roles & Permissions", path: "/admin/roles" },
    { label: "Bulk Upload", path: "/admin/bulk-upload" }
  ]},
  { title: "Employee Management", icon: <FaUserTie />, items: [
    { label: "Employee Directory", path: "/admin/employees" },
    { label: "Add Employee", path: "/admin/employees/add" },
    { label: "Departments", path: "/admin/departments" },
    { label: "Designations", path: "/admin/designations" },
    { label: "Documents", path: "/admin/documents" }
  ]},
  { title: "Attendance", icon: <FaCalendarCheck />, items: [
    { label: "Attendance Dashboard", path: "/admin/attendance" },
    { label: "Daily Attendance", path: "/admin/attendance/daily" },
    { label: "Monthly Attendance", path: "/admin/attendance/monthly" },
    { label: "Corrections", path: "/admin/attendance/corrections" },
    { label: "Shift Management", path: "/admin/shifts" }
  ]},
  { title: "Leave Management", icon: <FaClipboardList />, items: [
    { label: "Leave Dashboard", path: "/admin/leave" },
    { label: "Leave Applications", path: "/admin/leave/applications" },
    { label: "Leave Approvals", path: "/admin/leave/approvals" },
    { label: "Leave Policies", path: "/admin/leave/policies" },
    { label: "Holiday Calendar", path: "/admin/holidays" }
  ]},
  { title: "Payroll", icon: <FaMoneyBill />, items: [
    { label: "Salary Structure", path: "/admin/payroll/salary" },
    { label: "Payroll Processing", path: "/admin/payroll/process" },
    { label: "Payslips", path: "/admin/payroll/payslips" },
    { label: "Payroll Reports", path: "/admin/payroll/reports" }
  ]},
  { title: "Recruitment", icon: <FaBullseye />, items: [
    { label: "Job Openings", path: "/admin/jobs" },
    { label: "Candidates", path: "/admin/candidates" },
    { label: "Interviews", path: "/admin/interviews" },
    { label: "Offer Letters", path: "/admin/offers" }
  ]},
  { title: "Performance", icon: <FaChartBar />, items: [
    { label: "KPIs", path: "/admin/kpis" },
    { label: "Appraisals", path: "/admin/appraisals" },
    { label: "Reviews", path: "/admin/reviews" },
    { label: "Feedback", path: "/admin/feedback" }
  ]},
  { title: "Notifications", icon: <FaBell />, items: [
    { label: "System Alerts", path: "/admin/alerts" },
    { label: "Email Notifications", path: "/admin/notifications/email" },
    { label: "SMS Notifications", path: "/admin/notifications/sms" }
  ]},
  { title: "Reports", icon: <FaChartBar />, items: [
    { label: "Attendance Reports", path: "/admin/reports/attendance" },
    { label: "Leave Reports", path: "/admin/reports/leave" },
    { label: "Payroll Reports", path: "/admin/reports/payroll" },
    { label: "Custom Reports", path: "/admin/reports/custom" }
  ]},
  { title: "Settings", icon: <FaCog />, items: [
    { label: "Company Profile", path: "/admin/settings/company" },
    { label: "Office Locations", path: "/admin/settings/locations" },
    { label: "Working Days", path: "/admin/settings/working-days" },
    { label: "Templates", path: "/admin/settings/templates" }
  ]},
  { title: "Security & Audit", icon: <FaShieldAlt />, items: [
    { label: "Login History", path: "/admin/security/login-history" },
    { label: "Activity Logs", path: "/admin/security/activity-logs" },
    { label: "Role Changes", path: "/admin/security/role-changes" }
  ]}
];

export default function AdminSidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Admin";

  const [open, setOpen] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const allowedMenus = ROLE_ACCESS[role];

  const filteredMenu = useMemo(() => {
    return MENU
      .filter(m => allowedMenus.includes(m.title))
      .map(m => ({
        ...m,
        items: m.items.filter(i =>
          i.label.toLowerCase().includes(search.toLowerCase())
        )
      }))
      .filter(m => m.items.length > 0 || search === "");
  }, [search, role]);

  const Sidebar = (
    <aside
      className={`
        ${collapsed ? "w-20" : "w-72"}
        h-screen relative
        bg-white/35 backdrop-blur-[28px]
        border-r border-white/40
        shadow-[0_30px_120px_rgba(0,0,0,0.25)]
        transition-all duration-300
        text-gray-800
      `}
    >
      {/* LIGHT REFLECTION */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />

      {/* HEADER */}
      <div className="relative z-10 px-4 py-4 border-b border-white/40 flex items-center justify-between">
        {!collapsed && (
          <span className="font-bold tracking-wide">
            PRAKURA HRMS
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/50 transition"
        >
          <FaBars />
        </button>
      </div>

      {/* SEARCH */}
      {!collapsed && (
        <div className="relative z-10 p-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
            <input
              placeholder="Search menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="
                w-full pl-9 pr-3 py-2 rounded-xl
                bg-white/60 backdrop-blur
                text-sm placeholder-gray-500
                outline-none
                focus:ring-2 focus:ring-orange-300
              "
            />
          </div>
        </div>
      )}

      {/* MENU */}
      <nav className="relative z-10 px-2 py-2 space-y-2 text-sm">
        {filteredMenu.map(menu => (
          <div key={menu.title}>
            <div
              onClick={() => setOpen(open === menu.title ? null : menu.title)}
              className="
                flex items-center justify-between
                px-3 py-2 rounded-xl
                cursor-pointer
                hover:bg-white/60
                transition
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-orange-500">{menu.icon}</span>
                {!collapsed && menu.title}
              </div>
              {!collapsed && (
                <FaChevronDown
                  className={`transition ${open === menu.title ? "rotate-180" : ""}`}
                />
              )}
            </div>

            {!collapsed && open === menu.title && (
              <div className="ml-8 mt-1 space-y-1">
                {menu.items.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-3 py-1.5 rounded-lg transition
                       ${isActive
                         ? "bg-orange-200/80 text-gray-900 font-semibold shadow"
                         : "hover:bg-white/50"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );

  /* MOBILE */
  return (
    <>
      <button
        className="
          md:hidden fixed top-4 left-4 z-50
          bg-white/70 backdrop-blur
          p-2 rounded-lg shadow
        "
        onClick={() => setMobileOpen(true)}
      >
        <FaBars />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static z-50
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform duration-300
        `}
      >
        {Sidebar}
      </div>
    </>
  );
}
