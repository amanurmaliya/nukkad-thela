import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCart.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserDashboard = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("shopName"); // Default search by shop name
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${backendUrl}/user/getlocations`);
        setLocations(response.data.locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const goToOrders = () => {
    navigate("/show-user-orders");
  };

  const fetchShops = async () => {
    if (!selectedLocation) {
      alert("Please select a location first.");
      return;
    }
    try {
      const response = await axios.get(`${backendUrl}/user/showshop`, {
        params: {
          location: selectedLocation,
          [searchType]: searchQuery,
        },
      });
      setShops(response.data.shops || []);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8 border p-4 rounded-lg shadow-lg bg-gray-800 text-white">
        <select
          className="p-2 border rounded-md bg-gray-700 text-white"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">📍 Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-md bg-gray-700 text-white"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="shopName">🏬 Search by Shop Name</option>
          <option value="dish">🍽️ Search by Dish Name</option>
        </select>

        <input
          type="text"
          placeholder={`Enter ${searchType === "shopName" ? "shop" : "dish"} name...`}
          className="p-2 border rounded-md flex-grow bg-gray-700 text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={fetchShops}
        >
          🔍 Search
        </button>
      </div>

      {/* Shop List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shops.length > 0 ? (
          shops.map((shop) => <ShopCard key={shop._id} shop={shop} />)
        ) : (
          <p className="text-center text-gray-400">😔 No shops found.</p>
        )}
      </div>

      {/* Track Order Button */}
      <div className="flex justify-center mt-8">
        <Button className="bg-green-500 text-white px-6 py-3 text-lg rounded-lg shadow-md hover:bg-green-600" onClick={goToOrders}>
          🚀 Track Order
        </Button>
      </div>

      {/* Search Guide Section */}
      <div className="mt-12 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">🔎 How Search Works?</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-md bg-gray-800">
            <h3 className="text-lg font-bold">1️⃣ Search by Location 📍</h3>
            <p className="text-gray-300">You must select a location to find shops available in that area.</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-800">
            <h3 className="text-lg font-bold">2️⃣ Search by Shop Name 🏪</h3>
            <p className="text-gray-300">Enter a shop name along with a location to find specific shops.</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-800">
            <h3 className="text-lg font-bold">3️⃣ Search by Dish Name 🍜</h3>
            <p className="text-gray-300">Looking for a specific dish? Enter its name along with the location to find shops that serve it.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
