import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = (props) => {
  useEffect(()=>{
    if(localStorage.getItem('token'))
      {
        navigate("/social-media")
      }
  },[])
  const navigate=useNavigate();
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
  const onChange=(e)=>
  {
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }
  const handleSubmit= async (e)=>
  {
    e.preventDefault();
      const {name,email,password}=credentials;
      const response = await fetch(`https://backend-8-p7kz.onrender.com/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }, 
          body:JSON.stringify({name,email,password})
        });
const json=await response.json();
if(response.ok)
{

  localStorage.setItem('token', json.authToken)

  toast.success('Signup  Successfully', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark"
  });
  setTimeout(()=>{
    navigate('/')

  },3000)
  // props.showAlert("Account created successfully","success");

}
else{
  // console.log("Can't Signup");
  // props.showAlert("Invalid credentials","danger")
  toast.warn('Signup  failed', {
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
    <div className="container mt-2">
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    <h1 className='my-4'>Create an account</h1>
    <div className='container'>
     <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"onChange={onChange} name="name" id="name" aria-describedby="nameHelp"/> 
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" name="password"onChange={onChange} minLength={5} id="password" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup
