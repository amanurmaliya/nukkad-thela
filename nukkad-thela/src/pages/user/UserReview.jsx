import React, { useState } from 'react';
import { Star } from 'lucide-react';

const UserReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const handleSubmit = async () => {
    const reviewData = { rating, comment };
    try {
      const response = await fetch(`${backendUrl}/vendor/createratingandreview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      const data = await response.json();
      alert(`Review submitted: ${JSON.stringify(data)}`);
    } catch (error) {
      alert('Error submitting review');
    }
  };

  const getStarColor = (star) => {
    if (rating >= star || hover >= star) {
      if (rating === 1) return "fill-red-700 stroke-red-700";
      if (rating === 2) return "fill-red-400 stroke-red-400";
      if (rating === 3) return "fill-yellow-400 stroke-yellow-500";
      if (rating === 4) return "fill-green-300 stroke-green-300";
      if (rating === 5) return "fill-green-700 stroke-green-700";
    }
    return "fill-gray-200 stroke-gray-400";
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md align-center items-center justify-center">
      <h2 className="text-lg font-semibold mb-2">*Product Rating:</h2>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-8 w-8 cursor-pointer transition-colors ${getStarColor(star)}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
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