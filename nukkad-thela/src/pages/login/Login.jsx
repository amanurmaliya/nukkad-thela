import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Default selection
  const [popupModal, setPopupModal] = useState({ open: false, title: "", description: "" });
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signup")
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${backendUrl}/${userType}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" },    
        withCredentials: true  // Enable cookies in request
         }
      );

      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 }); // Store JWT in cookies for 7 days
        if(userType==='vendor')
        navigate("/dashboard"); // Redirect to dashboard
      else navigate("/")
      } else {
        setPopupModal({ open: true, title: "Error", description: response.data.message });
      }
    } catch (error) {
      setPopupModal({
        open: true,
        title: "Login Failed",
        description: error.response?.data?.message || "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border-2 border-yellow-400">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Welcome Back!</h1>

        {/* User Type Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={() => setUserType("user")} className={`px-6 py-2 rounded-full font-semibold text-lg ${userType === "user" ? "bg-yellow-400 text-black shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            User
          </button>
          <button onClick={() => setUserType("vendor")} className={`px-6 py-2 rounded-full font-semibold text-lg ${userType === "vendor" ? "bg-yellow-400 text-black shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            Vendor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-yellow-400 font-semibold mb-2">Email</label>
            <div className="relative">
              <EnvelopeIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400" placeholder="Enter your email" required />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-yellow-400 font-semibold mb-2">Password</label>
            <div className="relative">
              <LockClosedIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400" placeholder="Enter your password" required />
            </div>
          </div>

          <button type="submit" className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500">Login</button>
          <div className="text-white text-center mt-2">
          <Button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500" onClick={handleSignIn}> New User? SignUp</Button> 
          </div>
        </form>

        {popupModal.open && (
          <div className="mt-6 bg-red-500 text-white p-4 rounded-lg text-center">
            <p className="font-bold">{popupModal.title}</p>
            <p>{popupModal.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
