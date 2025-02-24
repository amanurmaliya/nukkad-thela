const ReviewAndRating = ({ reviews }) => {
    const getStarColor = (rating) => {
        switch (rating) {
            case 1: return 'text-red-700';
            case 2: return 'text-red-500';
            case 3: return 'text-yellow-500';
            case 4: return 'text-green-700';
            case 5: return 'text-green-500';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="mt-4 space-y-4">
            {reviews.map((review, index) => (
                <div key={index} className="border p-3 rounded-lg shadow-md">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{review.user}</h3>
                        <span className={`${getStarColor(review.rating)} text-xl font-bold`}>
                            {'★'.repeat(review.rating)}
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1">{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default ReviewAndRating;
