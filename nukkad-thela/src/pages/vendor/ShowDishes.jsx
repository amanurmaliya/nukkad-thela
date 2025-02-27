import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const ShowDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/vendor/showdishes`, { withCredentials: true });
        setDishes(response.data.dishes);
      } catch (error) {
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  const removeDish = async (dishId) => {
    try {
      await axios.delete(`${backendUrl}/vendor/deletedish/${dishId}`, { withCredentials: true });
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== dishId));
    } catch (error) {
      console.error("Error deleting dish:", error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-white mb-8">
        Flavors of your shop that hit different!🔥🔥
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading dishes...</p>
      ) : dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={dish._id}
              className="relative bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-700 
                        transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Floating Sequence Number Badge */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-gray-300 to-gray-500 text-black 
                              text-xs px-4 py-1 rounded-full font-semibold shadow-md">
                #{index + 1}
              </div>

              <h3 className="text-2xl font-semibold text-white mt-6">{dish.name}</h3>
              <p className="text-gray-400 mt-1 text-sm">Category: {dish.category}</p>
              <p className="text-white mt-2 text-xl font-bold">₹{dish.price}</p>

              <button
                onClick={() => removeDish(dish._id)}
                className="mt-4 bg-gradient-to-r from-sky-300 to-sky-500 hover:from-sky-400 hover:to-sky-600 
                           text-black font-medium px-6 py-2 rounded-lg flex items-center justify-center transition w-full 
                           shadow-md hover:shadow-lg"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Remove Dish
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No dishes uploaded yet.</p>
      )}
    </div>
  );
};

export default ShowDishes;
