import React from "react";
import { Star, MapPin, Phone } from "lucide-react";

const ShopPage2 = () => {
  const shop = {
    name: "Shop Name",
    location: "Shop Address or location",
    contact: "+1 234 567 890",
    rating: 3.5,
    reviews: [
      { user: "user1", comment: "Amazing food!", rating: 2 },
      { user: "user2", comment: "Great atmosphere and service.", rating: 4 },
      { user: "user1", comment: "Amazing food!", rating: 3.5 },
      { user: "user2", comment: "Great atmosphere and service.", rating: 5 },
    ],
    images: [
      "https://source.unsplash.com/400x300/?restaurant",
      "https://source.unsplash.com/400x300/?food",
    ],
    menu: [
      { name: "Burger", price: "100rs", img: "https://source.unsplash.com/100x100/?burger" },
      { name: "Pizza", price: "150rs", img: "https://source.unsplash.com/100x100/?pizza" },
      { name: "Pasta", price: "120rs", img: "https://source.unsplash.com/100x100/?pasta" },
    ],
  };

  const getRatingColor = (rating) => {
    if (rating >= 5) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center p-8 space-y-8 shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-white ">{shop.name}</h1>
      <div className="flex flex-col md:flex-row md:justify-between text-gray-300 items-center w-full max-w-5xl">
        <div className="flex items-center space-x-2">
          <MapPin size={24} className="text-blue-400 animate-bounce" />
          <span className="text-lg font-medium">{shop.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone size={24} className="text-green-400 animate-pulse" />
          <span className="text-lg font-medium">{shop.contact}</span>
        </div>
      </div>
      <div className={`flex justify-center items-center space-x-1 text-lg font-semibold ${getRatingColor(shop.rating)}`}>
        <Star size={24} className=" " /> <span>{shop.rating}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-6 w-full max-w-5xl">
        {shop.images.map((img, index) => (
          <img key={index} src={img} alt="Shop" className="rounded-xl shadow-md hover:scale-110 transition-transform duration-300 w-full h-64 object-cover border border-gray-500" />
        ))}
      </div>
      
      <h2 className="text-3xl font-bold mt-8 text-gray-300 underline">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {shop.menu.map((item, index) => (
          <div key={index} className="flex flex-col items-center p-6 border border-gray-600 rounded-lg shadow-lg bg-gray-900 hover:shadow-xl transition-shadow w-full hover:scale-105 transform duration-300">
            <img src={item.img} alt={item.name} className="w-24 h-24 rounded-full mb-4 border-2 border-gray-400" />
            <p className="text-xl font-semibold text-white">{item.name}</p>
            <p className="text-gray-400 text-lg font-medium">{item.price}</p>
          </div>
        ))}
      </div>
      
      <h2 className="text-3xl font-bold mt-8 text-gray-300 underline">Customer Reviews</h2>
      <div className="space-y-6 w-full max-w-5xl">
        {shop.reviews.map((review, index) => (
          <div key={index} className="p-6 border border-gray-600 rounded-lg shadow-lg bg-gray-900 hover:shadow-xl transition-shadow w-full hover:scale-100 transform duration-300">
            <p className="text-lg font-semibold text-white">{review.user}</p>
            <p className="text-gray-400 mt-2">{review.comment}</p>
            <p className={`text-lg mt-1 ${getRatingColor(review.rating)}`}>{"⭐".repeat(review.rating)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage2;
