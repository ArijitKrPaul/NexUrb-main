import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCFBFE] px-6 py-12">
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <p className="font-mono text-[10px] font-semibold tracking-[2.5px] text-[#6b46a6] mb-1 text-center">
          CREATE ACCOUNT
        </p>
        <p className="font-serif text-2xl font-semibold text-[#211C2B] mb-8 text-center leading-none">
          Nex<span className="text-[#6b46a6]">Urb</span>
        </p>

        <div className="bg-white border border-[#E4DFEE] rounded-2xl shadow-[0_10px_30px_-18px_rgba(33,28,43,0.25)] p-8">
          <h1 className="font-serif text-2xl font-semibold text-[#211C2B] mb-1">
            Get started
          </h1>
          <p className="text-sm text-[#7A7188] mb-6">
            Set up your account to manage inventory and projects.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5"
              >
                NAME
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E4DFEE] bg-[#F8F6FC] px-4 py-2.5 text-sm text-[#211C2B] outline-none transition focus:border-[#6b46a6] focus:ring-2 focus:ring-[#6b46a6]/20"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5"
              >
                EMAIL
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E4DFEE] bg-[#F8F6FC] px-4 py-2.5 text-sm text-[#211C2B] outline-none transition focus:border-[#6b46a6] focus:ring-2 focus:ring-[#6b46a6]/20"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5"
              >
                PASSWORD
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E4DFEE] bg-[#F8F6FC] px-4 py-2.5 text-sm text-[#211C2B] outline-none transition focus:border-[#6b46a6] focus:ring-2 focus:ring-[#6b46a6]/20"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-mono font-semibold tracking-wide text-[#7A7188] mb-1.5"
              >
                CONFIRM PASSWORD
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E4DFEE] bg-[#F8F6FC] px-4 py-2.5 text-sm text-[#211C2B] outline-none transition focus:border-[#6b46a6] focus:ring-2 focus:ring-[#6b46a6]/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-[#C0392B] bg-[#FDEDEC] rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#6b46a6] py-2.5 text-sm font-semibold text-white transition hover:bg-[#5a3a8c] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-sm text-[#7A7188] text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#6b46a6] font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
