import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const log = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/reg/login", { email, password });
      if (res.data) {
        localStorage.setItem("user", JSON.stringify({ email }));
        setErrorMessage("");
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to your account
        </p>

        {errorMessage && (
          <div className="bg-red-50 text-red-600 text-sm rounded-lg p-3 mb-4 border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={log} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
