import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Package, Star } from "lucide-react";

const OrderTracking = () => {
  const [status, setStatus] = useState("Packed");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const statuses = ["Ordered", "Prepared", "Packed"];
  const currentIndex = statuses.indexOf(status);

  const statusIcons = {
    "Ordered": <Clock className="text-gray-500" size={24} />, 
    "Prepared": <Package className="text-blue-500" size={24} />,
    "Packed": <CheckCircle className="text-green-500" size={24} />,  
  };

  const handleReviewSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center">Order Tracking</h2>
      
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Order #12345</span>
          <span className="text-sm text-gray-400">Estimated: 30 min</span>
        </div>
        
        <div className="flex justify-between items-center space-x-2">
          {statuses.map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              {statusIcons[step]}
              <span className={`text-sm ${index <= currentIndex ? 'font-semibold' : 'text-gray-400'}`}>{step}</span>
            </div>
          ))}
        </div>
        
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <div className="bg-green-500 h-full" style={{ width: `${(currentIndex / (statuses.length - 1)) * 100}%` }}></div>
        </div>
        
        <div className="flex justify-between">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm" disabled={status !== "Ordered"}>Cancel Order</button>
          <button className="border border-white text-white px-4 py-2 rounded-lg text-sm">Contact Support</button>
        </div>
        
        <div className="text-sm text-gray-400 mt-4">
          Payment Status: <span className="font-semibold text-green-400">Paid</span>
        </div>
      </div>
      
      {status === "Packed" && !submitted && (
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 mt-6">
          <h3 className="text-xl font-semibold">Write a Review</h3>
          <textarea 
            className="w-full p-2 bg-gray-900 text-white rounded-lg border border-gray-600" 
            placeholder="Share your experience..." 
            value={review} 
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star 
                key={num} 
                size={24} 
                className={`cursor-pointer ${rating >= num ? 'text-yellow-500' : 'text-gray-500'}`} 
                onClick={() => setRating(num)}
              />
            ))}
          </div>
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full text-sm"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      )}

      {submitted && (
        <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 mt-6">
          <h3 className="text-xl font-semibold text-green-400">Thank you for your review!</h3>
          <p className="text-gray-300">Your review: {review}</p>
          <p className="text-yellow-400">Rating: {"⭐".repeat(rating)}</p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
