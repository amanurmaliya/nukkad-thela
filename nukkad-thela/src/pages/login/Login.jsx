import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid"; // Icons for email and password

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("Customer"); // Default selection
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("User Type:", userType);

    // Redirect to another page after login
    navigate("/dashboard"); // Change the route as needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000]">
      <div className="bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border-2 border-yellow-400">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
          Welcome Back!
        </h1>

        {/* User Type Selector */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setUserType("Customer")}
            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ${
              userType === "Customer"
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setUserType("Vendor")}
            className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ${
              userType === "Vendor"
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Vendor
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-yellow-400 font-semibold mb-2">
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-yellow-400 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="h-6 w-6 text-yellow-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <a
            href="/forgot-password" // Add your forgot password route
            className="text-yellow-400 hover:text-yellow-500 underline transition-all duration-300"
          >
            Forgot Password?
          </a>
        </div>

        {/* Signup Button */}
        <div className="mt-8 text-center">
          <p className="text-yellow-400">Don't have an account?</p>
          <button
            onClick={() => navigate("/signup")} // Add your signup route
            className="mt-2 bg-gray-800 text-yellow-400 px-6 py-2 rounded-lg font-semibold text-lg hover:bg-gray-700 transition-all duration-300 shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;