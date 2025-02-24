import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/solid";
import PopUp from "@/utils/PopUp";
import PopUpModal from "@/utils/PopUpModal";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [userType, setUserType] = useState("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(true);
  const [enable, setEnable] = useState(false);
  const [popup, setPopup] = useState({ open: false, title: "", description: "" });
  const [popupModal, setPopupModal] = useState({ open: false, title: "", description: "" });

  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      setPopup({ open: true, title: "Error", description: "Please enter your email first." });
      return;
    }
  
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${backendUrl}/${userType}/sendotp`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );
  
  
      // Show success popup and disable the OTP button
      setPopupModal({ open: true, title: "Success", description: "OTP sent successfully! Check your email." });
      setOtpSent(false);
      setEnable(false);
      setIsEmailVerified(true);  // ✅ Automatically mark email as verified
    } catch (error) {
      console.error("OTP Sending Error:", error.response?.data || error.message);
      setPopupModal({ open: true, title: "Error", description: error.response?.data?.message || "Failed to send OTP." });
    }
  };
  

  const handleLogin = () => {
    navigate("/login")
  }

  const enableHandler = (e) => {
    setEnable(e.target.value.length > 0);
    setEmail(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      setPopup({ open: true, title: "Error", description: "Please verify your email before signing up." });
      return;
    }

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(
        `${backendUrl}/${userType}/create${userType}`,
        { name, email, phone, password },
        { headers: { "Content-Type": "application/json" } }
      );
      
      // Show success popup
      setPopup({ open: true, title: "Success", description: "Account created successfully!" });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      setPopup({ open: true, title: "Error", description: error.response?.data?.message || "Something went wrong!" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border-2 border-yellow-400">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Sign Up</h1>

        {/* PopUp Component for Success/Error Messages */}
        {popup.open && <PopUp title={popup.title} description={popup.description} />}
        {popupModal.open && <PopUpModal title={popupModal.title} description={popupModal.description} />}

        <div className="flex justify-center space-x-4 mb-8">
          <button onClick={() => setUserType("user")} className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ${userType === "user" ? "bg-yellow-400 text-black shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            User
          </button>
          <button onClick={() => setUserType("vendor")} className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ${userType === "vendor" ? "bg-yellow-400 text-black shadow-lg" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
            Vendor
          </button>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label className="block text-yellow-400 font-semibold mb-2">Name</label>
            <div className="relative">
              <UserIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter your name" required />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-yellow-400 font-semibold mb-2">Email</label>
            <div className="relative flex">
              <EnvelopeIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="email" value={email} onChange={(e) => enableHandler(e)} className="w-full pl-12 pr-20 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter your email" required />
              <button type="button" onClick={sendOtp} className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black px-4 py-1 rounded-lg font-semibold text-sm hover:bg-yellow-500 transition-all duration-300 ${enable ? "visible" : "invisible"}`}>
                {enable && (otpSent ? "Sent" : "verify")}
              </button>
            </div>
          </div>

          {!otpSent && (
            <div className="mb-6">
              <label className="block text-yellow-400 font-semibold mb-2">Enter OTP</label>
              <div className="relative flex">
                <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-4 pr-20 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter OTP" required />
                
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-yellow-400 font-semibold mb-2">Phone</label>
            <div className="relative">
              <PhoneIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter your phone number" required />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-yellow-400 font-semibold mb-2">Password</label>
            <div className="relative">
              <LockClosedIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="Enter your password" required />
            </div>
          </div>

          <button type="submit" disabled={!isEmailVerified} className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 shadow-lg">
            Sign Up
          </button>
          <div className="text-white text-center mt-2">
            <Button onClick={handleLogin} className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 shadow-lg">Existing User? Login</Button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Signup;
