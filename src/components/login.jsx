import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import loginimage from "../assets/loginimage.jpg";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginsubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const q = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (q.status === 200) {
        navigateToDashboard(q.data);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const navigateToDashboard = (data) => {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(data));

    if (data.role === "user") navigate("/home");
    if (data.role === "superadmin") navigate("/Superadmin");
    if (
      ["Employee", "Project Manager", "Inventory Manager", "Support"].includes(
        data.role,
      )
    )
      navigate("/Edashboard");
    if (data.role === "admin" || data.role === "Admin") navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* ---------- Form side ---------- */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-sm">
          {/* Brand mark */}
          <p className="font-mono text-[10px] font-semibold tracking-[2.5px] text-[#6b46a6] mb-1">
            ACCESS PORTAL
          </p>
          <p className="font-serif text-2xl font-semibold text-[#211C2B] mb-10 leading-none">
            Nex<span className="text-[#6b46a6]">Urb</span>
          </p>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#211C2B] leading-tight">
            Hello,
          </h1>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#211C2B] leading-tight mb-4">
            Welcome back
          </h1>
          <p className="text-sm text-[#7A7188] mb-8">
            Manage your inventory and track project details in one place.
          </p>

          <form onSubmit={loginsubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email-input"
                className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5"
              >
                EMAIL
              </label>
              <input
                id="email-input"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#E4DFEE] bg-[#F8F6FC] px-4 py-2.5 text-sm text-[#211C2B] outline-none transition focus:border-[#6b46a6] focus:ring-2 focus:ring-[#6b46a6]/20"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password-input"
                className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5"
              >
                PASSWORD
              </label>
              <input
                id="password-input"
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#E4DFEE] bg-[#F8F6FC] px-4 py-2.5 text-sm text-[#211C2B] outline-none transition focus:border-[#6b46a6] focus:ring-2 focus:ring-[#6b46a6]/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#6b46a6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#5a3a8c] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            {error && (
              <p className="text-sm text-[#C0392B] bg-[#FDEDEC] rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <p className="text-sm text-[#7A7188] pt-2">
              New user?{" "}
              <Link
                to="/register"
                className="text-[#6b46a6] font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ---------- Image side ---------- */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={loginimage}
          alt="NexUrb"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211C2B]/40 via-transparent to-transparent" />
      </div>
    </div>
  );
}
