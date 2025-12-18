import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUserTie,
  FaUsersCog,
  FaUserShield,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import logo from "../assets/prakura-logo.png";
import illustration from "../assets/login-illustration.png";

/* ROLE THEMES */
const roleConfig = {
  Employee: {
    gradient: "from-orange-500 to-yellow-400",
    text: "text-orange-600",
    glow: "hover:shadow-orange-400/40",
  },
  HR: {
    gradient: "from-blue-500 to-cyan-400",
    text: "text-blue-600",
    glow: "hover:shadow-blue-400/40",
  },
  Admin: {
    gradient: "from-purple-600 to-pink-500",
    text: "text-purple-600",
    glow: "hover:shadow-purple-400/40",
  },
};

const roles = [
  { name: "Employee", icon: <FaUserTie /> },
  { name: "HR", icon: <FaUsersCog /> },
  { name: "Admin", icon: <FaUserShield /> },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState("Employee");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const theme = roleConfig[role];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* VALIDATION */
  const validate = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (
      password.length < 6 ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    )
      newErrors.password = "Password does not meet security rules";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* LOGIN SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Login failed" });
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (rememberMe) localStorage.setItem("rememberEmail", email);

      if (data.user.role === "Admin")
        window.location.href = "/admin/dashboard";
      else if (data.user.role === "HR")
        window.location.href = "/hr/dashboard";
      else window.location.href = "/employee/dashboard";

    } catch {
      setErrors({ general: "Server not reachable. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden
      bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300">

      {/* Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl" />

      {/* Glass Card */}
      <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-3xl overflow-hidden
        bg-white/40 backdrop-blur-[24px] saturate-150
        border border-white/40
        shadow-[0_30px_90px_rgba(0,0,0,0.2)]">

        {/* LEFT */}
        <div className="p-10 flex flex-col justify-center">

          {/* Brand */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} className="w-20 h-20 mb-2 drop-shadow-xl" />
            <h1 className={`text-2xl font-bold ${theme.text}`}>
              Prakura IT Solutions
            </h1>
            <p className="text-xs tracking-widest text-gray-600">HRMS PORTAL</p>
          </div>

          {/* Announcement */}
          <div className="flex justify-center mb-4">
            <span className="text-xs px-4 py-1 rounded-full bg-white/60 border shadow">
              🔔 Payroll processing scheduled on 25 Dec
            </span>
          </div>

          {/* Role Toggle */}
          <div className="flex justify-center mb-5">
            <div className="flex bg-white/60 rounded-full p-1 shadow-inner">
              {roles.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setRole(item.name)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm transition-all
                    ${role === item.name
                      ? `bg-gradient-to-r ${theme.gradient} text-white shadow scale-105`
                      : "text-gray-500"}`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {errors.general && (
            <div className="mb-3 text-center text-sm text-red-700 bg-red-100 py-2 rounded-full">
              {errors.general}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Email */}
            <div>
              <div className="relative">
                <FaEnvelope className={`absolute left-4 top-3.5 ${theme.text}`} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/70 border border-white/50 shadow-inner focus:ring-2 focus:outline-none"
                />
              </div>
              {errors.email && <p className="ml-4 mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password + Tooltip */}
            <div className="relative group">
              <FaLock className={`absolute left-4 top-3.5 ${theme.text}`} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-2.5 rounded-full bg-white/70 border border-white/50 shadow-inner focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-3 text-xs
                bg-white/90 backdrop-blur-xl border rounded-xl shadow-lg
                opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all z-20">
                <p className="font-semibold mb-1">Password must contain:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Minimum 6 chars, 1 number, 1 special char</li>
                </ul>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex justify-between text-xs text-gray-600 px-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-orange-500"
                />
                Remember me
              </label>
              <button type="button" className={`${theme.text} hover:underline`}>
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold text-white
                bg-gradient-to-r ${theme.gradient}
                shadow-lg ${theme.glow} transition-all`}
            >
              {loading ? "Signing in..." : `Sign In as ${role}`}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <div className="text-xs bg-white/60 px-4 py-3 rounded-2xl border shadow">
              <div className="flex justify-center gap-2 mb-1">
                <FaShieldAlt className={theme.text} />
                Secure Role-Based Authentication
              </div>
              <span className="text-gray-500">
                Last login: 17 Dec 2025 · Chennai, IN
              </span>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Prakura IT Solutions
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent backdrop-blur-sm" />
          <img src={illustration} className="relative w-4/5 drop-shadow-2xl" />
        </div>

      </div>
    </div>
  );
}
