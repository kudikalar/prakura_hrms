import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/prakura-logo.png";
import illustration from "../assets/login-illustration.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality is under development.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-orange-200 via-yellow-100 to-orange-300">

      {/* Glass Container */}
      <div className="w-full max-w-5xl rounded-3xl 
        bg-white/25 backdrop-blur-xl border border-white/30 
        shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT - FORM */}
        <div className="p-10 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Prakura IT Solutions" className="w-16 h-16 mb-2" />
            <h2 className="text-2xl font-bold text-orange-600">
              Prakura IT Solutions
            </h2>
            <p className="text-sm text-gray-600">HRMS Portal</p>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Sign In
          </h3>

          {/* Role Switch */}
          <div className="flex gap-4 mb-6 text-sm justify-center">
            <span
              className={`cursor-pointer ${
                role === "User"
                  ? "font-semibold text-orange-600"
                  : "text-gray-400"
              }`}
              onClick={() => setRole("User")}
            >
              User
            </span>
            <span className="text-gray-300">|</span>
            <span
              className={`cursor-pointer ${
                role === "Admin"
                  ? "font-semibold text-orange-600"
                  : "text-gray-400"
              }`}
              onClick={() => setRole("Admin")}
            >
              Admin
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-3.5 text-orange-500" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2 rounded-full
                  bg-white/60 backdrop-blur border border-white/40
                  focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-orange-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-2 rounded-full
                  bg-white/60 backdrop-blur border border-white/40
                  focus:outline-none focus:ring-2 focus:ring-orange-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full font-semibold text-white
                bg-gradient-to-r from-orange-500 to-yellow-400
                hover:from-orange-600 hover:to-yellow-500 transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-5 text-center">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="hidden md:flex items-center justify-center 
          bg-white/20 backdrop-blur">
          <img
            src={illustration}
            alt="HRMS Illustration"
            className="w-4/5 drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
