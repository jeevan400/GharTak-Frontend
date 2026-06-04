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
      toast.error(err?.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

const handleGoogleLogin = async (response) => {

   try{
      const token = response.credential;
      const res = await googleLogin({ token });
      // localStorage.setItem("token", res.token);
      login(res.token);
      navigate("/home");
   } catch(e){
      console.log("FULL ERROR:", e);
      console.log("ERROR DATA:", e.response?.data);
   }
}
  
  return (
    <div className=" w-[100%] h-screen flex items-center justify-center">
        <div className="w-[40%] bg-white flex flex-col gap-4 p-6 rounded-sm">
          <div className="flex justify-center items-center">
            <img className="h-[70px]" src={GharTakLogo} alt="" />
            
             {/* <span className="text-xl font-bold tracking-wider text-[var(--primary)]">Welcome Back</span> */}
          </div>
          <p className="text-[14px] font-semibold -mt-8 flex justify-center items-center ">Access your home service dashboard</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="w-full ">
                <label className="text-[14px] font-medium" htmlFor="email">Email</label>
              <input
                className=" py-2 px-4 text-[16px] w-full border border-[var(--primary)] rounded-md focus:ring-0 outline-none"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              </div>
              <div className="w-full">
                <label htmlFor="password">Password</label>
              <input
                className=" py-2 px-4 text-[16px] w-full border border-[var(--primary)] rounded-md focus:ring-0 outline-none"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              </div>
              <Link to="/forgot-password" className="text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] -mt-2 mb-2">Forgot Password</Link>
              <button style={{background:"var(--gradient-primary)"}} className=" rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold hover:shadow-lg transition-all duration-200 ease-linear" disabled={loading}>
                {loading ? "Loading..." : `LOGIN`}
              </button>
            </form>
            <div className="flex justify-center items-center">
              <div className="flex-1 h-[1px] bg-[var(--border-medium)]"></div>
              <span className="px-4 text-[var(--text-secondary)] text-[14px] py-2">Or continue with</span>
              <div className="flex-1 h-[1px] bg-[var(--border-medium)]"></div>
            </div>
            <GoogleLogin
                onSuccess={(res)=> handleGoogleLogin(res)}
                onError={()=> console.log("Login failed")}
            />

            <p className="text-[14px] font-normal flex justify-center items-center">Don't have an account? <Link className="text-[var(--primary)] font-bold underline" to="/register">&nbsp;Sign Up for free</Link></p>
        </div>
    </div>

  );
};

export default Login;