import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    try {
      await api.post("/auth/register", {
        name: fd.get("name"),
        email: fd.get("email"),
        password: fd.get("password"),
      });
      nav("/login");
    } catch (e) {
      setErr(e.response?.data?.error || "Registration failed");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 to-violet-800">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-violet-700">Newsx</h1>
          <p className="text-sm text-zinc-600 mt-2">
            Create your Newsx account
          </p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-700">Name</label>
            <input
              name="name"
              placeholder="John Doe"
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="abc123@example.com"
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-600 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button
            type="submit"
            className="rounded-xl bg-violet-700 text-white py-2 font-medium hover:bg-violet-800 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-700 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
