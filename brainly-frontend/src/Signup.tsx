
import { useState } from 'react';
import { Button } from './components/Button'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
 async function signup(){
  const res=await axios.post(`https://brainezium.onrender.com/api/v1/signup`,{username,password});
  alert(res.data.message);
  navigate("/");
 }
  return (

    <div className="flex items-center justify-center h-screen bg-[#f7f9fb]">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full mb-4" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border border-gray-300 rounded-md p-2 w-full mb-4" />
        <div className="flex justify-center mb-4">
        <Button variant="#4445d7" textColor="#fff" size="lg" text="Sign Up" onClick={()=>{signup()}} />
          </div>
          <span className="text-sm text-gray-600 mt-4">
            Already have an account ? <Link to="/" className="text-blue-500 hover:underline">Sign in</Link>
          </span>
      </div>
    </div>
  )
}

export default Signup