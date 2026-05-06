import { useState } from "react";
import { googleLogin, loginUser } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

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
      navigate("/home");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

const handleGoogleLogin = async (response) => {

   try{
      const token = response.credential;
      const res = await googleLogin({ token });
      localStorage.setItem("token", res.token);
      navigate("/home");
   } catch(e){
      console.log("FULL ERROR:", e);
      console.log("ERROR DATA:", e.response?.data);
   }
}
  
  return (
    <div className="bg-orange-100 w-[100%] h-screen flex items-center justify-center">
        <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="border py-2 px-4 rounded-lg text-[16px]"
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="border py-2 px-4 rounded-lg text-[16px]"
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <Link to="/forgot-password" className="text-xs font-semibold text-blue-400 -mt-2">Forgot Password</Link>
              <button className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
            <GoogleLogin
                onSuccess={(res)=> handleGoogleLogin(res)}
                onError={()=> console.log("Login failed")}
            />
        </div>
    </div>

  );
};

export default Login;