import { useState } from "react";
import {
  sendOTP,
  verifyOTP,
  registerUser,
  googleLogin,
} from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import GharTakLogo from "../../assets/GharTak.png";

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
    if (!email?.trim()) {
      setError("Please enter your email address before requesting OTP.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const res = await sendOTP({ email });
      setError("");
      setStep(2);
      toast.success(res.message);
    } catch (e) {
      console.log("sendOTP error:", e);

      if (e.code === "ECONNABORTED" || e.message?.includes("timeout")) {
        setError("Request timed out. Please try again in a moment.");
      } else if (e?.response?.status === 409) {
        setError(
          e.response?.data?.message ||
            "Conflict error. Please verify your email or try again.",
        );
      } else {
        setError(e?.response?.data?.message || "Failed to send OTP");
      }

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleVerifyOtp = async () => {
    if (!email?.trim()) {
      setError("Email is missing. Please go back and enter your email.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!otp?.trim()) {
      setError("Please enter the OTP sent to your email.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const data = await verifyOTP({ email, otp: String(otp) });
      setError("");
      setStep(3);
      toast.success(data.message);
    } catch (e) {
      console.log("verifyOTP error:", e);
      setError(e?.response?.data?.message || "OTP verification failed");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleRegister = async () => {
    try {
      const data = await registerUser({ ...form, email });
      setError("");
      toast.success(data.message);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setError(e?.response?.data?.message || "Registration failed");
      setTimeout(() => {
        setError("");
      }, 2000);
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
    <div className="bg-[var(--primary-light)] w-[100%] h-screen flex items-center justify-center">
      {step === 1 && (
        <>
          <div className="w-full min-h-screen flex items-center justify-center bg-[var(--primary-light)] px-4">
            <div className="w-full md:w-[500px] bg-white rounded-xl shadow-xl p-8">
              <div className="flex flex-col items-center mb-6">
                <img className="h-[70px]" src={GharTakLogo} alt="" />
                <h1 className="text-2xl font-bold text-[var(--primary)]">
                  Create Account
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  Enter your email to get verification OTP
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium">Email Address</label>

                  <input
                    className="w-full mt-1 py-3 px-4 border border-[var(--primary)] rounded-lg outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  style={{ background: "var(--gradient-primary)" }}
                  className="text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                  <span className="text-sm text-gray-500">
                    Or continue with
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-300"></div>
                </div>

                <GoogleLogin
                  onSuccess={(res) => handleGoogleLogin(res)}
                  onError={() => console.log("Login failed")}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="w-full md:w-[500px] bg-white rounded-xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-6">
              <img className="h-[70px]" src={GharTakLogo} alt="" />
              <h1 className="text-2xl font-bold text-[var(--primary)]">
                Verify OTP
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Enter the OTP sent to your email
              </p>
            </div>

            <input
              className="w-full py-3 px-4 border border-[var(--primary)] rounded-lg outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              type="text"
            />

            <button
              style={{ background: "var(--gradient-primary)" }}
              className="w-full mt-4 text-white py-3 rounded-lg font-semibold"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="w-full md:w-[700px] bg-white rounded-xl shadow-xl p-8">
            <div className="flex flex-col items-center mb-6">
              <img className="h-[70px]" src={GharTakLogo} alt="" />
              <h1 className="text-2xl font-bold text-[var(--primary)]">
                Complete Registration
              </h1>

              <p className="text-sm text-[var(--text-secondary)]">
                Fill in your details to create your account
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border border-[var(--primary)] rounded-lg px-4 py-3"
                placeholder="Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="password"
                className="border border-[var(--primary)] rounded-lg px-4 py-3"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />

              <input
                className="border border-[var(--primary)] rounded-lg px-4 py-3"
                placeholder="Phone Number"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                className="border border-[var(--primary)] rounded-lg px-4 py-3"
                placeholder="Street Address"
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      street: e.target.value,
                    },
                  })
                }
              />

              <input
                className="border border-[var(--primary)] rounded-lg px-4 py-3"
                placeholder="City"
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      city: e.target.value,
                    },
                  })
                }
              />

              <input
                className="border border-[var(--primary)] rounded-lg px-4 py-3"
                placeholder="State"
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      state: e.target.value,
                    },
                  })
                }
              />

              <input
                className="border border-[var(--primary)] rounded-lg px-4 py-3 md:col-span-2"
                placeholder="Pincode"
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: {
                      ...form.address,
                      pincode: e.target.value,
                    },
                  })
                }
              />
            </div>

            <button
              style={{ background: "var(--gradient-primary)" }}
              className="w-full mt-6 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
              onClick={handleRegister}
            >
              Create Account
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
