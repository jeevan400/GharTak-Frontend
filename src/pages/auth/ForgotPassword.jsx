import { useState } from 'react'
import { sendforgotOTP, verifyForgotOTP, resetPassword } from '../../services/auth.service'


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState("");
    const [form, setForm] = useState({password:""});

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
    }

  return (
    <div>
      {
        step === 1 && (
            <>
                <input 
                type="text"
                placeholder='email'
                onChange={(e)=> setEmail(e.target.value)} 
                />
                <button onClick={handleSendForgotOtp}>Send OTP</button>
            </>
        )
      }

      {
        step === 2 && (
            <>
                <input 
                type="text"
                placeholder='OTP'
                onChange={(e)=> setOtp(e.target.value)}
                />
                <button onClick={handleVerifyForgotOtp}>Verify OTP</button>
            </>
        )
      }

      {
        step === 3 && (
            <>
                <input 
                type="text"
                placeholder='New password'
                onChange={(e)=> setNewPassword(e.target.value)}
                 />
                 <button onClick={handleResetPassword}>Reset Password</button>
            </>
        )
      }
    </div>
  )
}

export default ForgotPassword
