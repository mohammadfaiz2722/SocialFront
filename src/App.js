// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import SocialMediaPage from './components/SocialMediaPage';
import './App.css';
import Alert from './components/Alert';
import { useState } from 'react'
import ResetPassword from './components/ResertPassword';
import VerifyOTP from './components/VerifyOTP';
import HomePage from './components/Home';

function App() {
  const [alert,setAlert]=useState(null)
const showAlert=((message,type)=>
{
  setAlert({
    message:message,
    type:type
  })
  setTimeout(()=>
  {
    setAlert(null)
  },1000)
})
  return (
    <Router>
      
      <div className="App">
        <Navbar />
        <Alert alert={alert}/>
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login showAlert={showAlert}/>} />
            <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/social-media" element={<SocialMediaPage />} />
            <Route path="/verifyotp" element={<VerifyOTP />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
