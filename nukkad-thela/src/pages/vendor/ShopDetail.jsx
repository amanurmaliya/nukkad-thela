import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Button } from "@/components/ui/button"
import PopUp from '@/utils/PopUp';


const ShopDetail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopName: '',
    description: '',
    openingTime: '',
    closingTime: '',
    location: '',
    phoneNumber: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const [popupData, setPopupData] =  useState(null)

  const handleSubmit =  async (e) => {
    e.preventDefault();

    const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/vendor/createshop`;
    try {
      const response = await axios.post(backendUrl, formData, {
        headers : {
          "Content-Type" : "application/json"
        },

        withCredentials: true,  // Ensures cookies are sent
        timeout : 5000 // request to timeout after 5 seconds
      })
      

      const resData = response.data;

      setPopupData({
        title: resData.success ? "Success" : "Failed",
        description: resData.message || (resData.success ? "Shop created successfully!" : "Shop creation failed."),
        user: "dashboard",
        page: "",
      });
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || "Failed to create shop";
      } else if (error.request) {
        errorMessage = "Server is not responding. Please try again later.";
      }

      setPopupData({
        title: "Error",
        description: errorMessage,
        user: "vendor",
        page: "dashboard",
      });
    } 

    // navigate('/dashboard'); // Navigate to new page after submit -> "Menu" page
  };

  return (
    
    <div className='bg-[#000]'>
      {popupData && <PopUp {...popupData}/>}
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#000] ">
      <div className="w-full max-w-xl border-4 border-yellow-400 bg-gray-900 rounded-xl shadow-lg p-6">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Shop Detail</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Tagline"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <label htmlFor="openingTime" className="text-white">Opening Time</label>
            <input
              type="time"
              name="openingTime"
              value={formData.openingTime}
              onChange={handleChange}
              className="w-full sm:w-1/2 p-2 border rounded"
              required
            />

            <label htmlFor="closingTime" className='text-white'>Closing Time</label>
            <input
              type="time"
              name="closingTime"
              value={formData.closingTime}
              onChange={handleChange}
              className="w-full sm:w-1/2 p-2 border rounded"
              placeholder='closing-time'
              required
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <Button variant="destructive">
            Submit
          </Button>
        </form>
      </div>
    </div>

    </div>
  );
};

export default ShopDetail;
