import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, Status, resetStatus } from "../store/authSlice";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  const { status, error } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };

  useEffect(() => {
    console.log("current status", status);
    if (status === Status.SUCCESS) {
      navigate("/login");
      dispatch(resetStatus());
    }
  }, [status, navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Sign up for WorstGPT
        </h2>

        {status === Status.ERROR && error && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={data.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="my-2 flex items-center justify-center  text-sm text-gray-500">
          <span className="mx-2">— or —</span>
        </div>

        {/* Google Sign Up Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-50 transition text-gray-800 font-medium"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p className="text-sm text-center  mt-3 text-gray-600">
          Already have an account?
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
