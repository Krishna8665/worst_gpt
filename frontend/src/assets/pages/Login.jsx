import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Log in to WorstGPT</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="my-6 flex items-center justify-center text-sm text-gray-700">
          <span className="mx-2">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-50 transition text-gray-800 font-medium"
        >
          <FcGoogle size={20} />
          <span>Log in with Google</span>
        </button>

        <p className="text-sm text-center mt-6 text-gray-800">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
