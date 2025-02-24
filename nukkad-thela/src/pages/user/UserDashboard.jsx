import React, { useEffect, useState } from "react";
import axios from "axios";
import ShopCard from "./ShopCart.jsx";

const backendUrl = import.meta.env.VITE_BACKEND_URL


const UserDashboard = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [shops, setShops] = useState([]);

  // Fetch locations from backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(`${backendUrl}/user/getlocations`);
        setLocations(response.data.locations || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/showshop`, {
        params: { location: selectedLocation, query: searchQuery },
      });

      console.log(response)
      setShops(response.data.shops || []);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-6 border p-3 rounded-lg shadow-md">
        {/* Location Dropdown */}
        <select
          className="p-2 border rounded-md"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Enter shop or dish name..."
          className="p-2 border rounded-md flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button onClick={fetchShops}>Search</button>
      </div>

      {/* Shop List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shops.length > 0 ? (
          shops.map((shop) => <ShopCard key={shop._id} shop={shop} />)
        ) : (
          <p className="text-center text-gray-500">No shops found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
