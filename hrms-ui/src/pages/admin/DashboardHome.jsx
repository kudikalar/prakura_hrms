import {
  FaUsers,
  FaShoppingCart,
  FaDollarSign,
  FaArrowUp,
} from "react-icons/fa";

export default function DashboardHome() {
  return (
    <div className="space-y-6 text-gray-800">
      {/* TITLE */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-gray-600">HRMS Analytics Overview</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat title="Total Sales" value="2455" />
        <Stat title="Orders" value="3525" />
        <Stat title="Revenue" value="$515" />
        <Stat title="Users" value="494" />
      </div>

      {/* CHART + PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h3 className="font-semibold mb-4">Total Sales</h3>
          <div className="h-64 flex items-end gap-3">
            {[40, 55, 48, 70, 60, 78, 68, 85].map((h, i) => (
              <div
                key={i}
                className="w-6 bg-orange-400/70 rounded-lg"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-4">Weekly Growth</h3>
          <div
            className="
              w-40 h-40 rounded-full
              border-[10px] border-orange-300/50
              flex items-center justify-center
            "
          >
            <span className="text-3xl font-bold">74%</span>
          </div>
        </GlassCard>
      </div>

      {/* LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard>
          <h3 className="font-semibold mb-3">New Users</h3>
          {["Praveen", "Ramesh", "Suresh", "Anita"].map((u) => (
            <div key={u} className="flex justify-between text-sm mb-2">
              <span>{u}</span>
              <span className="flex items-center gap-1 text-green-600">
                <FaArrowUp /> Active
              </span>
            </div>
          ))}
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-3">Sales Details</h3>
          <Detail icon={<FaShoppingCart />} label="Orders" value="704" />
          <Detail icon={<FaDollarSign />} label="Revenue" value="$1.8M" />
          <Detail icon={<FaUsers />} label="Customers" value="549" />
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-3">Platforms</h3>
          <Platform label="Web" value="58%" />
          <Platform label="Mobile" value="32%" />
          <Platform label="Others" value="10%" />
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------- Shared Components ---------- */

const GlassCard = ({ children, className = "" }) => (
  <div
    className={`
      bg-white/40 backdrop-blur-[24px]
      border border-white/40
      rounded-3xl p-6
      shadow-[0_30px_90px_rgba(0,0,0,0.2)]
      hover:translate-y-[-4px]
      transition-all duration-300
      ${className}
    `}
  >
    {children}
  </div>
);

const Stat = ({ title, value }) => (
  <GlassCard>
    <p className="text-sm text-gray-600">{title}</p>
    <h3 className="text-3xl font-bold">{value}</h3>
  </GlassCard>
);

const Detail = ({ icon, label, value }) => (
  <div className="flex justify-between items-center text-sm mb-2">
    <div className="flex items-center gap-2">
      {icon}
      {label}
    </div>
    <span className="font-semibold">{value}</span>
  </div>
);

const Platform = ({ label, value }) => (
  <div className="bg-white/60 rounded-xl p-3 flex justify-between mb-2">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
