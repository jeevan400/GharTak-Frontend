import { useState } from "react";
import { sendOTP, verifyOTP, registerUser } from "../../services/auth.service";

const Register = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

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

  const handleSendOtp = async () => {
    await sendOTP({ email });
    setStep(2);
    alert("OTP sent");
  };

  const handleVerifyOtp = async () => {
    await verifyOTP({ email, otp: String(otp) });
    setStep(3);
    alert("OTP verified");
  };

  const handleRegister = async () => {
    await registerUser({ ...form, email });
    alert("Registered");
  };

  return (
    <div>
      {step === 1 && (
        <>
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input 
          onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
          <button 
          onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}

      {step === 3 && (
        <>
          <input
            placeholder="name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            placeholder="phone"
            type="text"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
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
            placeholder="pincode"
            type="text"
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, pincode: e.target.value },
              })
            }
          />
          <button onClick={handleRegister}>Register</button>
        </>
      )}
    </div>
  );
};

export default Register;
