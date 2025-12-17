import { useState } from "react";
import {
  FaTachometerAlt, FaUsers, FaUserTie, FaCalendarCheck,
  FaClipboardList, FaMoneyBill, FaBullseye,
  FaBell, FaChartBar, FaCog, FaShieldAlt, FaChevronDown
} from "react-icons/fa";

export default function AdminSidebar() {
  const [open, setOpen] = useState(null);

  const toggle = (menu) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <aside className="
      w-72 h-screen
      bg-gradient-to-b from-white/20 to-white/10
      backdrop-blur-2xl
      border-r border-white/20
      text-white overflow-y-auto
      shadow-[0_0_40px_rgba(0,0,0,0.3)]
    ">
      <div className="px-6 py-5 text-xl font-bold border-b border-white/20 tracking-wide">
        PRAKURA HRMS
      </div>

      <nav className="px-4 py-4 space-y-2 text-sm">

        <Menu title="Dashboard" icon={<FaTachometerAlt />} toggle={toggle} open={open}>
          <Item label="Overview" />
          <Item label="Analytics" />
          <Item label="Reports Snapshot" />
        </Menu>

        <Menu title="User Management" icon={<FaUsers />} toggle={toggle} open={open}>
          <Item label="Admin Users" />
          <Item label="HR Users" />
          <Item label="Employees" />
          <Item label="Roles & Permissions" />
          <Item label="Bulk Upload" />
        </Menu>

        <Menu title="Employee Management" icon={<FaUserTie />} toggle={toggle} open={open}>
          <Item label="Employee Directory" />
          <Item label="Add Employee" />
          <Item label="Departments" />
          <Item label="Designations" />
          <Item label="Documents" />
        </Menu>

        <Menu title="Attendance" icon={<FaCalendarCheck />} toggle={toggle} open={open}>
          <Item label="Attendance Dashboard" />
          <Item label="Daily Attendance" />
          <Item label="Monthly Attendance" />
          <Item label="Corrections" />
          <Item label="Shift Management" />
        </Menu>

        <Menu title="Leave Management" icon={<FaClipboardList />} toggle={toggle} open={open}>
          <Item label="Leave Dashboard" />
          <Item label="Leave Applications" />
          <Item label="Leave Approvals" />
          <Item label="Leave Policies" />
          <Item label="Holiday Calendar" />
        </Menu>

        <Menu title="Payroll" icon={<FaMoneyBill />} toggle={toggle} open={open}>
          <Item label="Salary Structure" />
          <Item label="Payroll Processing" />
          <Item label="Payslips" />
          <Item label="Payroll Reports" />
        </Menu>

        <Menu title="Recruitment" icon={<FaBullseye />} toggle={toggle} open={open}>
          <Item label="Job Openings" />
          <Item label="Candidates" />
          <Item label="Interviews" />
          <Item label="Offer Letters" />
        </Menu>

        <Menu title="Performance" icon={<FaChartBar />} toggle={toggle} open={open}>
          <Item label="KPIs" />
          <Item label="Appraisals" />
          <Item label="Reviews" />
          <Item label="Feedback" />
        </Menu>

        <Menu title="Notifications" icon={<FaBell />} toggle={toggle} open={open}>
          <Item label="System Alerts" />
          <Item label="Email Notifications" />
          <Item label="SMS Notifications" />
        </Menu>

        <Menu title="Reports" icon={<FaChartBar />} toggle={toggle} open={open}>
          <Item label="Attendance Reports" />
          <Item label="Leave Reports" />
          <Item label="Payroll Reports" />
          <Item label="Custom Reports" />
        </Menu>

        <Menu title="Settings" icon={<FaCog />} toggle={toggle} open={open}>
          <Item label="Company Profile" />
          <Item label="Office Locations" />
          <Item label="Working Days" />
          <Item label="Templates" />
        </Menu>

        <Menu title="Security & Audit" icon={<FaShieldAlt />} toggle={toggle} open={open}>
          <Item label="Login History" />
          <Item label="Activity Logs" />
          <Item label="Role Changes" />
        </Menu>

      </nav>
    </aside>
  );
}

/* ---------- Components ---------- */

const Menu = ({ title, icon, children, toggle, open }) => (
  <div>
    <div
      onClick={() => toggle(title)}
      className="
        flex items-center justify-between
        px-3 py-2 rounded-xl cursor-pointer
        hover:bg-white/20
      "
    >
      <div className="flex items-center gap-3">
        {icon}
        {title}
      </div>
      <FaChevronDown />
    </div>
    {open === title && (
      <div className="ml-8 mt-1 space-y-1">{children}</div>
    )}
  </div>
);

const Item = ({ label }) => (
  <div className="
    px-3 py-1.5 rounded-lg
    text-white/80 cursor-pointer
    hover:bg-white/15
  ">
    {label}
  </div>
);
