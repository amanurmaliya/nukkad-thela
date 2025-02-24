import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedStar, setSelectedStar] = useState('All');

  useEffect(() => {
    // Mock reviews data
    const fetchReviews = async () => {
      const data = [
        { id: 1, stars: 5, customer: 'Alice', comment: 'Amazing food!' },
        { id: 2, stars: 4, customer: 'Bob', comment: 'Really good, will visit again.' },
        { id: 3, stars: 3, customer: 'Charlie', comment: 'Decent experience.' },
        { id: 4, stars: 5, customer: 'Dave', comment: 'Loved it!' },
        { id: 5, stars: 2, customer: 'Eve', comment: 'Could be better.' }
      ];
      setReviews(data);
      setFilteredReviews(data);
    };

    fetchReviews();
  }, []);

  // ⭐ Filter reviews based on selected star
  const handleFilterChange = (value) => {
    setSelectedStar(value);
    if (value === 'All') {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter(review => review.stars === parseInt(value));
      setFilteredReviews(filtered);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-center">Customer Reviews</h1>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-2 flex-wrap">
        {['All', 5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            onClick={() => handleFilterChange(star.toString())}
            className={`px-4 py-2 rounded-lg border ${
              selectedStar === star.toString()
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-black hover:bg-green-300'
            }`}
          >
            {star === 'All' ? 'All' : `${star} Star${star !== 1 ? 's' : ''}`}
          </button>
        ))}
      </div>

      {/* Reviews Display */}
      <div className="space-y-4 max-w-2xl mx-auto">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(({ id, stars, customer, comment }) => (
            <Card key={id} className="shadow-md">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{customer}</span>
                  <div className="flex space-x-1">
                    {[...Array(stars)].map((_, index) => (
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
