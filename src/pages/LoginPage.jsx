import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/admin");
  }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://event-backend-vaxm.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid username or password");
      console.log(err)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">🔐 Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
