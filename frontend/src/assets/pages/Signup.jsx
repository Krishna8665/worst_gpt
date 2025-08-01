import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, Status, resetStatus } from "../store/authSlice";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    code: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [localMessage, setLocalMessage] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (status === Status.SUCCESS) {
      setLocalMessage("Signup successful. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    }
  }, [status, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const sendCode = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalMessage("");
    dispatch(resetStatus());

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-code`,
        { email: form.email }
      );
      setLocalMessage(
        res.data.message || "Verification code sent to your Gmail."
      );
      setStep(2);
    } catch (err) {
      setLocalError(err?.response?.data?.message || "Failed to send code.");
    }
  };

  const verifyAndRegister = (e) => {
    e.preventDefault();
    setLocalError("");
    setLocalMessage("");
    dispatch(resetStatus());

    const data = {
      email: form.email,
      username: form.username,
      password: form.password,
      code: form.code,
    };

    dispatch(registerUser(data));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 mt-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Sign up with Gmail
        </h2>

        {(localError || error) && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm">
            {localError || error}
          </div>
        )}

        {localMessage && (
          <div className="bg-green-100 text-green-700 p-3 mb-4 rounded text-sm">
            {localMessage}
          </div>
        )}

        <form
          onSubmit={step === 1 ? sendCode : verifyAndRegister}
          className="space-y-5"
        >
          {step === 1 && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gmail Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send Verification Code
              </button>
            </div>
          )}

          {step === 2 && (
            <>
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Verification Code
                </label>
                <input
                  id="code"
                  name="code"
                  required
                  value={form.code}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

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
                  required
                  value={form.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Complete Signup
              </button>
            </>
          )}
        </form>

        <div className="my-2 flex items-center justify-center text-sm text-gray-500">
          <span className="mx-2">— or —</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-50 transition text-gray-800 font-medium"
        >
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <p className="text-sm text-center mt-3 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
