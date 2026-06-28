import { useState } from "react";
import {
  sendOTP,
  verifyOTP,
  registerUser,
  googleLogin,
} from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Navbar from "../../components/layout/Navbar";
import toast from "react-hot-toast";
import GharTakLogo from "../../assets/GharTak.png";
import { Mail, KeyRound, User, Lock, Phone, MapPin, Building, Map, Hash, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {step === 1 && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <div className="bg-white py-8 px-4 sm:px-10 shadow-[var(--shadow-lg)] border border-[var(--border-light)] sm:rounded-3xl relative">
            <div className="flex flex-col items-center gap-3 mb-8">
              <img className="h-[65px] object-contain mb-2" src={GharTakLogo} alt="GharTak Logo" />
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                Create Account
              </h2>
              <p className="text-[14px] font-medium text-[var(--text-secondary)] text-center">
                Enter your email to get a verification OTP
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">
                  Email Address
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <button
                style={{ background: "var(--gradient-primary)" }}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
                onClick={handleSendOtp}
              >
                SEND OTP <ArrowRight size={16} />
              </button>

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

                <div className="mt-6 flex justify-center w-full [&>div]:w-full [&>div>div]:w-full">
                  <GoogleLogin
                    onSuccess={(res) => handleGoogleLogin(res)}
                    onError={() => console.log("Login failed")}
                    size="large"
                    theme="outline"
                    shape="pill"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <p className="text-[14px] font-medium text-[var(--text-secondary)]">
                  Already have an account?{" "}
                  <Link
                    className="font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                    to="/login"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
          <div className="bg-white py-8 px-4 sm:px-10 shadow-[var(--shadow-lg)] border border-[var(--border-light)] sm:rounded-3xl">
            <div className="flex flex-col items-center gap-3 mb-8">
              <img className="h-[65px] object-contain mb-2" src={GharTakLogo} alt="GharTak Logo" />
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                Verify OTP
              </h2>
              <p className="text-[14px] font-medium text-[var(--text-secondary)] text-center px-4">
                We've sent a 6-digit verification code to <br /><span className="font-bold text-[var(--primary)]">{email}</span>.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">
                  One-Time Password (OTP)
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound size={18} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all tracking-[0.2em] font-bold text-center"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    maxLength={6}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <button
                style={{ background: "var(--gradient-primary)" }}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
                onClick={handleVerifyOtp}
              >
                VERIFY OTP <CheckCircle2 size={16} />
              </button>
              
              <p className="text-center mt-4 text-[13px] font-medium text-[var(--text-secondary)]">
                Didn't receive the OTP? <span onClick={handleSendOtp} className="text-[var(--primary)] font-bold cursor-pointer hover:underline">Resend</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl px-4 sm:px-0">
          <div className="bg-white py-8 px-4 sm:px-10 shadow-[var(--shadow-lg)] border border-[var(--border-light)] sm:rounded-3xl">
            <div className="flex flex-col items-center gap-3 mb-8">
              <img className="h-[65px] object-contain mb-2" src={GharTakLogo} alt="GharTak Logo" />
              <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
                Complete Registration
              </h2>
              <p className="text-[14px] font-medium text-[var(--text-secondary)] text-center">
                Fill in your personal details to finish creating your account
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Enter your full name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Create a password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Enter phone number"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Street Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Street/House No."
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
                </div>
              </div>

              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Enter city"
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
                </div>
              </div>

              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">State</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Map size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Enter state"
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
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">Pincode</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash size={16} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] sm:text-sm transition-all"
                    placeholder="Enter postal code"
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
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center mt-5">{error}</p>}

            <button
              style={{ background: "var(--gradient-primary)" }}
              className="w-full mt-6 flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
              onClick={handleRegister}
            >
              CREATE ACCOUNT <CheckCircle2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
