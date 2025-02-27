import React, { useState } from "react";
import axios from "axios";
import PopUp from "@/utils/PopUp";
const CreateDish = () => {
  const [dishData, setDishData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    timeToCook: "",
  });

  const [popupData, setPopupData] = useState(null);

  // Get backend URL from Vite environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setDishData({ ...dishData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/vendor/createdish`,
        dishData,
        { headers: { "Content-Type": "application/json" },
        withCredentials: true,  // Ensures cookies are sent
  timeout: 5000 }
      );

      // Set popup data on success
      setPopupData({
        title: response.data.success ? "Successful" : "Failed",
        description: response.data.message,
        user: "vendor",
        page: "",
      });

      if (response.data.success) {
        // Reset form if the dish is created successfully
        setDishData({
          name: "",
          category: "",
          description: "",
          price: "",
          timeToCook: "",
        });
      }

    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (error.response) {
        errorMessage = error.response.data.message || "Failed to create dish";
      } else if (error.request) {
        errorMessage = "Server is not responding. Please try again later.";
      }

      setPopupData({
        title: "Failed",
        description: errorMessage,
        user: "vendor",
        page: "/dashboard",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-gray-300 text-lg mb-4">Add New Dish</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="text-white">
            Dish Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={dishData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          />

          <label className="text-white">
            Dish Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={dishData.category}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          >
            <option value="">Select Dish Category</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Spicy">Spicy</option>
            <option value="Chinese">Chinese</option>
          </select>

          <label className="text-white">Dish Description (optional)</label>
          <input
            type="text"
            name="description"
            value={dishData.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
          />

          <label className="text-white">
            Dish Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={dishData.price}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            min="1"
            max="10000"
            required
          />

          <label className="text-white">
            Preparation Time <span className="text-red-500">*</span>
          </label>
          <select
            name="timeToCook"
            value={dishData.timeToCook}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 rounded"
            required
          >
            <option value="">Select Preparation Time</option>
            {[...Array(31).keys()].map((i) => (
              <option key={i} value={(i + 1) * 2}>
                {(i + 1) * 2} minutes
              </option>
            ))}
          </select>

          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </form>
      </div>

      {/* Show PopUp when popupData is available */}
      {popupData && <PopUp {...popupData} />}
    </div>
  );
};

export default CreateDish;
