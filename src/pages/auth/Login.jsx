import { useState } from "react";
import { googleLogin, loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import GharTakLogo from "../../assets/GharTak.png";
import { LockIcon } from "lucide-react";

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
      if (!data?.token) {
        throw new Error(data?.message || "Login failed");
        toast.error("Login Failed");
      }
      login(data.token);
      navigate("/home");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Login failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const token = response.credential;
      const res = await googleLogin({ token });
      login(res.token);
      navigate("/home");
    } catch (e) {
      console.log("FULL ERROR:", e);
      console.log("ERROR DATA:", e.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-4 sm:px-10 shadow-[var(--shadow-lg)] border border-[var(--border-light)] sm:rounded-3xl">
          <div className="flex flex-col items-center gap-3 mb-8">
            <img className="h-[65px] object-contain" src={GharTakLogo} alt="GharTak Logo" />
            <p className="text-[14px] font-medium text-[var(--text-secondary)] text-center">
              Access your home service dashboard
            </p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block" htmlFor="email">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] block" htmlFor="password">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-1">
                <input
                  className="appearance-none block w-full px-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                style={{ background: "var(--gradient-primary)" }}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <>
                    <LockIcon size={16} />
                    SIGN IN
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border-medium)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-[var(--text-secondary)] font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={(res) => handleGoogleLogin(res)}
                onError={() => console.log("Login failed")}
                size="large"
                theme="outline"
                shape="pill"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <p className="text-[14px] font-medium text-[var(--text-secondary)]">
              Don't have an account?{" "}
              <Link
                className="font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                to="/register"
              >
                Sign Up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
