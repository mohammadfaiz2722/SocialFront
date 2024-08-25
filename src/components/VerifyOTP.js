import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = () => {
    useEffect(()=>{
        if(localStorage.getItem('token'))
          {
            navigate("/social-media")
          }
      },[])
  const [otp, setOtp] = useState('');
  const [otpToken, setOtpToken] = useState(localStorage.getItem('otpToken'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://backend-8-p7kz.onrender.com/api/auth/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp, otpToken })
    });

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem('resetToken', json.resetToken);
      navigate('/resetpassword');
    } else {
      toast.error('OTP verification failed', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    }
  }

  return (
    <div className="auth-container">
      <ToastContainer />
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">OTP</label>
          <input 
            type="text" 
            className="form-control" 
            id="otp" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Verify OTP</button>
      </form>
    </div>
  );
}

export default VerifyOTP;
