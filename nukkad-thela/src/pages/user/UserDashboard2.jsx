import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, Star, MapPin, ShoppingBag } from "lucide-react";

const foodCategories = [
  { id: 1, name: "Healthy", image: "https://source.unsplash.com/300x300/?healthyfood" },
  { id: 2, name: "Biryani", image: "https://source.unsplash.com/300x300/?biryani" },
  { id: 3, name: "Pizza", image: "https://source.unsplash.com/300x300/?pizza" },
  { id: 4, name: "Poha", image: "https://source.unsplash.com/300x300/?poha" },
  { id: 5, name: "Vadapav", image: "https://source.unsplash.com/300x300/?vadapav" },
  { id: 6, name: "Panipuri", image: "https://source.unsplash.com/300x300/?panipuri" },
  { id: 7, name: "Cake", image: "https://source.unsplash.com/300x300/?cake" },
  { id: 8, name: "Shawarma", image: "https://source.unsplash.com/300x300/?shawarma" },
];

const restaurants = [
  { id: 1, name: "Eat Healthy", category: "Healthy food", rating: 4.3, price: "$10 per meal", image: "https://source.unsplash.com/500x400/?restaurant,healthy" },
  { id: 2, name: "Biryani King", category: "Biryani", rating: 4.5, price: "$12 per meal", image: "https://source.unsplash.com/500x400/?restaurant,biryani" },
  { id: 3, name: "Pizza Palace", category: "Pizza", rating: 4.2, price: "$15 per meal", image: "https://source.unsplash.com/500x400/?restaurant,pizza" },
  { id: 1, name: "Eat Healthy", category: "Healthy food", rating: 4.3, price: "$10 per meal", image: "https://source.unsplash.com/500x400/?restaurant,healthy" },
  { id: 2, name: "Biryani King", category: "Biryani", rating: 4.5, price: "$12 per meal", image: "https://source.unsplash.com/500x400/?restaurant,biryani" },
  { id: 3, name: "Pizza Palace", category: "Pizza", rating: 4.2, price: "$15 per meal", image: "https://source.unsplash.com/500x400/?restaurant,pizza" },
];

const CustomerDashboard = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Detecting location...");
  const [showLocation, setShowLocation] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setLocation(data.display_name || "Location not found");
        } catch (error) {
          setLocation("Unable to fetch location");
        }
      },
      () => setLocation("Location access denied")
    );
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen flex flex-col items-center text-white">
      <div className="flex items-center justify-between w-full max-w-5xl mb-6">
        <button className="flex items-center bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-600 hover:bg-white/20 transition-all">
          Track order  <ShoppingBag className="text-white" />
        </button>
        <div className="flex items-center bg-white/10 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-600 w-2/3 max-w-lg relative">
          <Search className="text-white mr-2 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search restaurant, cuisine, or dish..."
            className="w-full bg-transparent outline-none text-white placeholder-gray-300 pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setShowLocation(!showLocation)} className="ml-2">
            <MapPin className="text-white" />
          </button>
        </div>
      </div>
      {showLocation && (
        <div className="bg-white/10 backdrop-blur-md shadow-lg p-3 rounded w-64 border border-gray-600 mb-4">
          <p className="text-white text-sm">{location}</p>
        </div>
      )}
      <h2 className="text-2xl font-semibold mt-6 mb-4">Eat what makes you happy</h2>
      <div ref={sliderRef} className="w-full max-w-5xl overflow-hidden relative">
        <div className="flex space-x-4 p-2 transition-transform duration-500 ease-in-out" style={{ display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}>
          {foodCategories.map((food) => (
            <div key={food.id} className="flex-shrink-0 text-center snap-start">
              <img src={food.image} alt={food.name} className="w-44 h-44 rounded-full border-4 border-white shadow-xl transform hover:scale-110 transition-all duration-300" />
              <p className="mt-2 text-sm font-semibold text-white">{food.name}</p>
            </div>
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Restaurants around you</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden flex flex-col items-center">
            <div className="relative w-64 h-40 overflow-hidden">
              <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">{restaurant.name}</h3>
              <p className="text-gray-300 text-sm">{restaurant.category}</p>
              <div className={`flex justify-center items-center gap-1 text-white text-sm px-3 py-1 rounded-full mt-3 ${restaurant.rating >= 4 ? "bg-green-500" : "bg-yellow-500"}`}>
                <Star size={19} /> <span className="font-semi-bold">{restaurant.rating}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{restaurant.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
