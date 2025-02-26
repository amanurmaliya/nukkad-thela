import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Loader, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

const statusMapping = {
  Pending: { label: "Order Placed", icon: <Clock className="w-5 h-5" /> },
  Cooking: { label: "Order Cooking", icon: <Loader className="w-5 h-5 animate-spin" /> },
  Delivered: { label: "Served", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
};

const OrderTracking = ({ order, onClose }) => {
  if (!order) return null;

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleReviewSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${backendUrl}/vendor/createratingandreview`,
        {
          rate: rating,
          comment: review,
          shopId: order.shopId,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        alert("Review submitted successfully!");
        setReview("");
        setRating(5);
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred while submitting your review.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-gray-900 shadow-lg rounded-xl p-4 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-300 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <CardHeader>
          <CardTitle className="text-white text-center text-2xl">🍽️ Order Tracking</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 text-white">
            <p className="text-lg font-semibold">Shop: {order.shopName}</p>
            <p className="text-lg">🍽️ Items: {order.productName} (Qty: {order.productQuantity || 1})</p>
            <p className="text-lg">💰 Amount: ₹{order.productPrice}</p>
            <p className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-lg font-semibold">
                {statusMapping[order.orderStatus]?.icon} {statusMapping[order.orderStatus]?.label}
              </span>
            </p>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  order.orderStatus === "Pending"
                    ? "bg-yellow-500 w-1/3"
                    : order.orderStatus === "Cooking"
                    ? "bg-blue-500 w-2/3"
                    : "bg-green-500 w-full"
                }`}
              ></div>
            </div>
          </div>

          {/* Review & Rating (Only if the order is delivered) */}
          {order.orderStatus === "Delivered" && (
            <div className="mt-6">
              <h3 className="text-lg text-gray-300 mb-2">📝 Leave a Review:</h3>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                className="bg-gray-700 text-white border-none rounded-lg p-3 focus:ring-2 focus:ring-orange-500"
              />
              {/* Rating Selection */}
              <div className="flex items-center mt-3 space-x-2">
                <span className="text-gray-300">⭐ Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-400" : "text-gray-500"}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              {/* Submit Review Button */}
              <Button
                className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg"
                onClick={handleReviewSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTracking;
