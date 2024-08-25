import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token'))
      {
        navigate("/social-media")
      }
  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://backend-8-p7kz.onrender.com/api/auth/forgotpassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const json = await response.json();
    if (response.ok) {
      localStorage.setItem('otpToken', json.otpToken);
      localStorage.setItem('email', email);
      toast.success('OTP sent to your email', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(() => {
        navigate('/verifyotp');
      }, 3000);
    } else {
      toast.error('Failed to send OTP', {
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
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Reset Password</button>
      </form>
      <div className="mt-3">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
