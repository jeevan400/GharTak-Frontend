import { useState } from "react";
import {
  sendOTP,
  verifyOTP,
  registerUser,
  googleLogin,
} from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    password: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await sendOTP({ email });
      setError("");
      setStep(2);
      console.log("send otp : ", res);
      alert("OTP sent");
    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.message || "Failed to send OTP");

      setTimeout(()=>{
        setError("");
      }, 2000)
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOTP({ email, otp: String(otp) });
      setError("");
      setStep(3);
      alert("OTP verified");
    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.message || "OTP verification failed");
      setTimeout(()=>{
        setError("");
      }, 2000)
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ ...form, email });
      setError("");
      alert("Registered");
      navigate("/login");
    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.message || "Registration failed");
      setTimeout(()=>{
        setError("");
      }, 2000)
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const token = response.credential;
      const res = await googleLogin({ token });
      localStorage.setItem("token", res.token);
      navigate("/home");
    } catch (e) {
      console.log("FULL ERROR:", e);
      console.log("ERROR DATA:", e.response?.data);
    }
  };

  return (
    <div className="bg-orange-100 w-[100%] h-screen flex items-center justify-center">
      {step === 1 && (
        <>
        <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
          <input
            className="border py-2 px-4 rounded-lg text-[16px]"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          {error && (
            <p className="text-red-600 text-xs font-medium">{error}</p>
          )}
          <button className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" onClick={handleSendOtp}>Send OTP</button>
          <GoogleLogin
            onSuccess={(res) => handleGoogleLogin(res)}
            onError={() => console.log("Login failed")}
          />
          </div>
        </>
      )}

      {step === 2 && (
        <>
        <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
          <input className="border py-2 px-4 rounded-lg text-[16px]" onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
          <button className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="phone"
              type="text"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="street"
              type="text"
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, street: e.target.value },
                })
              }
            />
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="city"
              type="text"
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, city: e.target.value },
                })
              }
            />
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="state"
              type="text"
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, state: e.target.value },
                })
              }
            />
            <input
              className="border py-2 px-4 rounded-lg text-[16px]"
              placeholder="pincode"
              type="text"
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, pincode: e.target.value },
                })
              }
            />
            <button className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" onClick={handleRegister}>Register</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
