import { useState } from 'react'
import { sendforgotOTP, verifyForgotOTP, resetPassword } from '../../services/auth.service'
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState("");
    const [form, setForm] = useState({password:""});

    const navigate = useNavigate();

    const handleSendForgotOtp = async () => {
        await sendforgotOTP({email});
        setStep(2);
        alert("OTP sent. Please check your email.");
    };

    const handleVerifyForgotOtp = async ()=>{
        await verifyForgotOTP({email, otp:String(otp)});
        setStep(3);
        alert("OTP Verified");
    };

    const handleResetPassword = async ()=>{
        await resetPassword({email, newPassword});
        alert("Password change successfully!");
        navigate("/login");
    }

  return (
    <div className="bg-orange-100 w-[100%] h-screen flex items-center justify-center">
      {
        step === 1 && (
            <>
                <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
                  <input
                  className="border py-2 px-4 rounded-lg text-[16px]"
                  type="text"
                  placeholder='email'
                  onChange={(e)=> setEmail(e.target.value)}
                  />
                  <button className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" onClick={handleSendForgotOtp}>Send OTP</button>
                </div>
            </>
        )
      }

      {
        step === 2 && (
            <>
            <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
                <input 
                className="border py-2 px-4 rounded-lg text-[16px]"
                type="text"
                placeholder='OTP'
                onChange={(e)=> setOtp(e.target.value)}
                />
                <button  className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" onClick={handleVerifyForgotOtp}>Verify OTP</button>
                </div>
            </>
        )
      }

      {
        step === 3 && (
            <>
            <div className="w-[50%] bg-white flex flex-col gap-4 p-6 rounded-lg">
                <input 
                className="border py-2 px-4 rounded-lg text-[16px]"
                type="text"
                placeholder='New password'
                onChange={(e)=> setNewPassword(e.target.value)}
                 />
                 <button className="bg-orange-600 rounded-lg p-2 cursor-pointer text-white text-[16px] font-semibold" onClick={handleResetPassword}>Reset Password</button>
                 </div>
            </>
        )
      }
    </div>
  )
}

export default ForgotPassword
