import React, { useState } from "react";
import { Star } from "lucide-react";
import axios from "axios"; // ✅ Use axios for better handling

const UserReview = ({ shopId }) => {
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/vendor/createratingandreview`,
        { rate, comment, shopId }, // ✅ Send correct field names
        { withCredentials: true } // ✅ Ensures cookies are sent
      );

      alert(`Review submitted: ${JSON.stringify(data)}`);
      setRate(0); 
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  const getStarColor = (star) => {
    if (rate >= star || hover >= star) {
      return rate === 1
        ? "fill-red-700 stroke-red-700"
        : rate === 2
        ? "fill-red-400 stroke-red-400"
        : rate === 3
        ? "fill-yellow-400 stroke-yellow-500"
        : rate === 4
        ? "fill-green-300 stroke-green-300"
        : "fill-green-700 stroke-green-700";
    }
    return "fill-gray-200 stroke-gray-400";
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md align-center">
      <h2 className="text-lg font-semibold mb-2">*Product Rating:</h2>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-8 w-8 cursor-pointer transition-colors ${getStarColor(star)}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRate(star)}
          />
        ))}
      </div>
      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        Submit Review
      </button>
    </div>
  );
};

export default UserReview;
