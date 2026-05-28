import API from "../api/axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register(){
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  try{
    const res = await API.post("/auth/register", { username, email, password });
    alert(res.data.msg);
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.msg || "Registration failed");
  }
}

return(
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-4">
    <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="Username" required
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"/>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" required
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" required
          className="w-full p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"/>
        <button type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition duration-300">
          Register
        </button>
      </form>
      <p className="text-center text-gray-500 mt-4">
        Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
      </p>
    </div>
  </div>
)
}
export default Register;
