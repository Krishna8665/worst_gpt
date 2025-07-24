import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Something went wrong");
      navigate("/chat");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Sign up for WorstGPT
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Or Divider */}
        <div className="my-6 flex items-center justify-center text-sm text-gray-500">
          <span className="mx-2">— or —</span>
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-gray-800 font-medium"
        >
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        {/* Footer link */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
