import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUserTie,
  FaUsersCog,
  FaUserShield,
} from "react-icons/fa";

import logo from "../assets/prakura-logo.png";
import illustration from "../assets/login-illustration.png";

/* ROLE THEMES */
const roleConfig = {
  Employee: {
    gradient: "from-orange-500 to-yellow-400",
    text: "text-orange-600",
    badgeBg: "bg-orange-100 text-orange-700 border-orange-200",
    glow: "hover:shadow-orange-400/40",
  },
  HR: {
    gradient: "from-blue-500 to-cyan-400",
    text: "text-blue-600",
    badgeBg: "bg-blue-100 text-blue-700 border-blue-200",
    glow: "hover:shadow-blue-400/40",
  },
  Admin: {
    gradient: "from-purple-600 to-pink-500",
    text: "text-purple-600",
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200",
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
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

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
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Login failed" });
        setLoading(false);
        return;
      }

      /* STORE AUTH DATA */
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      /* ROLE BASED REDIRECT */
      if (data.user.role === "Admin") {
        window.location.href = "/admin/dashboard";
      } else if (data.user.role === "HR") {
        window.location.href = "/hr/dashboard";
      } else {
        window.location.href = "/employee/dashboard";
      }

    } catch (error) {
      setErrors({ general: "Server not reachable. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden
      bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300">

      {/* Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-yellow-400/30 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-5xl rounded-3xl grid grid-cols-1 md:grid-cols-2 overflow-hidden
        bg-white/40 backdrop-blur-2xl border border-white/40
        shadow-[0_30px_80px_rgba(0,0,0,0.18)]">

        {/* LEFT */}
        <div className="p-10 flex flex-col justify-center">

          {/* Brand */}
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Prakura IT Solutions" className="w-20 h-20 mb-3 drop-shadow-lg" />
            <h1 className={`text-2xl font-bold ${theme.text}`}>
              Prakura IT Solutions
            </h1>
            <p className="text-sm text-gray-600 tracking-widest">HRMS PORTAL</p>
          </div>

          {/* Role Toggle */}
          <div className="flex justify-center mb-5">
            <div className="flex bg-white/60 rounded-full p-1 shadow-inner">
              {roles.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setRole(item.name)}
                  className={`flex items-center gap-2 px-5 py-2 text-sm rounded-full transition-all
                    ${
                      role === item.name
                        ? `bg-gradient-to-r ${theme.gradient} text-white shadow scale-[1.05]`
                        : "text-gray-500"
                    }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {errors.general && (
            <div className="mb-4 text-center text-sm text-red-700 bg-red-100 py-2 rounded-full">
              {errors.general}
            </div>
          )}

          {/* Form */}
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
                  className={`w-full pl-11 pr-4 py-2.5 rounded-full
                    bg-white/70 backdrop-blur border
                    ${errors.email ? "border-red-400" : "border-white/50"}
                    shadow-inner focus:outline-none focus:ring-2`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 ml-4 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <FaLock className={`absolute left-4 top-3.5 ${theme.text}`} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-2.5 rounded-full
                    bg-white/70 backdrop-blur border
                    ${errors.password ? "border-red-400" : "border-white/50"}
                    shadow-inner focus:outline-none focus:ring-2`}
                />
              </div>
              {errors.password && (
                <p className="mt-1 ml-4 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold text-white
                bg-gradient-to-r ${theme.gradient}
                shadow-lg ${theme.glow}
                transition-all ${loading ? "opacity-60" : ""}`}
            >
              {loading ? "Signing in..." : `Sign In as ${role}`}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs
              bg-white/60 px-4 py-2 rounded-full shadow-sm border">
              <FaShieldAlt className={theme.text} />
              Secure Role-Based Authentication
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Prakura IT Solutions
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-transparent backdrop-blur-sm" />
          <img src={illustration} alt="HRMS Illustration" className="relative w-4/5 drop-shadow-2xl" />
        </div>

      </div>
    </div>
  );
}
