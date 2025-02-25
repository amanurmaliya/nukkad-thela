import { useParams } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
import ReviewAndRating from "./ReviewAndRating";
import Dishes from "./Dishes";
import UserReview from "./UserReview";
const ShopDetail = () => {
    const { id: shopId } = useParams();  // ✅ Correct way to extract shopId
    const [shop, setShop] = useState(null);
    
    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${backendUrl}/user/shop/${shopId}`);
                setShop(response.data.shop);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching shop details", error);
            }
        };

        if (shopId) fetchShopDetails(); // ✅ Ensure shopId is defined before calling API
    }, [shopId]);

    if (!shop) return <p className="text-center text-xl text-yellow-400">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-black text-yellow-400 min-h-screen rounded-lg shadow-lg">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row justify-between items-center border-b border-yellow-400 pb-6">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-yellow-300">{shop.shopName}</h1>
                    <p className="text-lg text-yellow-500 mt-2">{shop.location}</p>
                    <p className="text-md text-yellow-600 mt-1 italic">{shop.description}</p>
                </div>
                <img src={shop.image} alt={shop.name} className="w-48 h-48 object-cover rounded-lg border-4 border-yellow-300 shadow-md" />
            </div>

            {/* Middle Section - Dishes */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold border-b border-yellow-400 pb-2">Dishes</h2>
                <Dishes dishes={shop.dishes} shopId={shop._id}/>
            </div>

            {/* Bottom Section - Ratings & Reviews */}
            <div className="mt-8">
                <div className="flex justify-between items-center border-b border-yellow-400 pb-2">
                    <h2 className="text-2xl font-bold">Ratings & Reviews</h2>
                    <span className="text-3xl font-extrabold text-yellow-300">{shop.overallRating} ★</span>
                </div>
                <ReviewAndRating reviews={shop.reviewsAndRatings} />
            </div>
            <div className="m-8">

                <UserReview shopId={shop._id}/>
            </div>
        </div>
    );
};

export default ShopDetail;
