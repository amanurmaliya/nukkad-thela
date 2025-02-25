import { useNavigate } from "react-router-dom";

const ShopCard = ({ shop }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop-detail/${shop._id}`);
  };

  // Truncate description to first 5 words
  const truncateDescription = (desc) => {
    if (!desc) return "No description available.";
    const words = desc.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : desc;
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:border-gray-500"
    >
      {/* Shop Name & Location */}
      <h2 className="text-lg font-bold text-white flex justify-between items-center">
        {shop.shopName} <span className="text-gray-400 text-sm">📍 {shop.location}</span>
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-sm mt-2">
        {truncateDescription(shop.description)}
      </p>
    </div>
  );
};

export default ShopCard;
