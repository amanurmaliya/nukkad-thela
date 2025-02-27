import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import axios from "axios";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedStar, setSelectedStar] = useState("All");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/vendor/showreviews`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setReviews(response.data.reviews);
          setFilteredReviews(response.data.reviews);
        } else {
          setReviews([]);
          setFilteredReviews([]);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
        setFilteredReviews([]);
      }
    };

    fetchReviews();
  }, []);

  // ⭐ Filter reviews based on selected star rating
  const handleFilterChange = (value) => {
    setSelectedStar(value);
    if (value === "All") {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.rate === parseInt(value));
      setFilteredReviews(filtered);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center text-white">✨ Real Experiences, Real Feedback....✨</h1>
      <br/>
      {/* ⭐ Filter Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {["All", 5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            onClick={() => handleFilterChange(star.toString())}
            className={`px-4 py-2 rounded-lg border ${
              selectedStar === star.toString()
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-black hover:bg-green-300"
            }`}
          >
            {star === "All" ? "All" : `${star} Star${star !== 1 ? "s" : ""}`}
          </button>
        ))}
      </div>

      {/* ⭐ Reviews Display */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(({ _id, rate, userId, comment }) => (
            <Card key={_id} className="shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{userId?.name || "Anonymous"}</span>
                  <div className="flex space-x-1">
                    {Array.from({ length: rate }, (_, index) => (
                      <Star key={index} className="w-5 h-5 text-green-500" fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">No reviews found.</p>
        )}
      </div>
    </div>
  );
};

export default ShowReview;
