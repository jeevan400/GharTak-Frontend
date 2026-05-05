import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await loginUser(form); // { token }
      login(data.token);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Link to="/forgot-password">Forgot Password</Link>
      <button disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default Login;