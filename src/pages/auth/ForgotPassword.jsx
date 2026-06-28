import { useState } from "react";
import {
  sendforgotOTP,
  verifyForgotOTP,
  resetPassword,
} from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import GharTakLogo from "../../assets/GharTak.png";
import { Mail, KeyRound, LockIcon, ArrowLeft } from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");
  const [form, setForm] = useState({ password: "" });

  const navigate = useNavigate();

  const handleSendForgotOtp = async () => {
    try {
      const data = await sendforgotOTP({ email });
      setStep(2);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to send OTP");
    }
  };

  const handleVerifyForgotOtp = async () => {
    try {
      const data = await verifyForgotOTP({ email, otp: String(otp) });
      setStep(3);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      const data = await resetPassword({ email, newPassword });
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-4 sm:px-10 shadow-[var(--shadow-lg)] border border-[var(--border-light)] sm:rounded-3xl relative">
          
          <Link to="/login" className="absolute top-6 left-6 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors bg-gray-50 p-2 rounded-full hover:bg-orange-50">
            <ArrowLeft size={18} />
          </Link>

          <div className="flex flex-col items-center gap-3 mb-8 mt-4">
            <img className="h-[65px] object-contain mb-2" src={GharTakLogo} alt="GharTak Logo" />
            <h2 className="text-xl font-extrabold text-[var(--text-primary)]">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verification"}
              {step === 3 && "Reset Password"}
            </h2>
            <p className="text-[14px] font-medium text-[var(--text-secondary)] text-center px-4">
              {step === 1 && "Enter your email address to receive a secure OTP for password reset."}
              {step === 2 && "We've sent a 6-digit OTP to your email. Enter it below to verify."}
              {step === 3 && "Create a new strong password for your account to finish the reset."}
            </p>
          </div>

          <div className="space-y-5">
            {step === 1 && (
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
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  style={{ background: "var(--gradient-primary)" }}
                  className="mt-6 w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
                  onClick={handleSendForgotOtp}
                >
                  SEND OTP
                </button>
              </div>
            )}

            {step === 2 && (
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
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <button
                  style={{ background: "var(--gradient-primary)" }}
                  className="mt-6 w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
                  onClick={handleVerifyForgotOtp}
                >
                  VERIFY OTP
                </button>
                <p className="text-center mt-4 text-[13px] font-medium text-[var(--text-secondary)]">
                  Didn't receive the OTP? <span onClick={handleSendForgotOtp} className="text-[var(--primary)] font-bold cursor-pointer hover:underline">Resend</span>
                </p>
              </div>
            )}

            {step === 3 && (
              <div>
                <label className="text-[13px] font-extrabold text-[var(--text-primary)] mb-1.5 block">
                  New Password
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon size={18} className="text-gray-400" />
                  </div>
                  <input
                    className="appearance-none block w-full pl-11 pr-4 py-3 border border-[var(--border-medium)] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent sm:text-sm transition-all"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button
                  style={{ background: "var(--gradient-primary)" }}
                  className="mt-6 w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white hover:shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-all duration-200"
                  onClick={handleResetPassword}
                >
                  RESET PASSWORD
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
