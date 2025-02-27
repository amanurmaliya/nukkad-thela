import React from "react";
import { FaBiking, FaUtensils, FaHeadset, FaLeaf, FaWallet, FaTruck, FaPizzaSlice, FaGift } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";

const Service = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-400 to-yellow-500 py-16 px-4 md:px-16">
      <h1 className="text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg tracking-wide animate-pulse">
        🚀 Our Best Services 🚀
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Service Cards */}
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:bg-white/30 hover:shadow-xl border border-white/30"
          >
            <service.icon className="text-6xl text-white drop-shadow-md mx-auto mb-5 animate-bounce" />
            <h2 className="text-2xl font-bold text-white">{service.title}</h2>
            <p className="text-white/80 mt-3 font-light">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Services Data
const services = [
  {
    icon: FaBiking,
    title: "⚡ Super Fast Service",
    description: "Get your favorite street food prepared & delivered quickly.",
  },
  {
    icon: FaUtensils,
    title: "🍽️ Authentic Street Food",
    description: "Enjoy flavors from local stalls, thelas, and dhabas.",
  },
  {
    icon: FaWallet,
    title: "💰 Affordable Pricing",
    description: "Delicious food at pocket-friendly prices with daily offers.",
  },
  {
    icon: FaLeaf,
    title: "🍃 Hygienic & Fresh Food",
    description: "Prepared with high-quality, fresh ingredients under strict hygiene standards.",
  },
  {
    icon: FaHeadset,
    title: "📞 24/7 Customer Support",
    description: "We are always available to help with orders and queries.",
  },
  {
    icon: FaTruck,
    title: "🚚 Live Order Tracking",
    description: "Track your order in real-time from restaurant to doorstep.",
  },
  {
    icon: FaPizzaSlice,
    title: "🍕 Wide Variety of Food",
    description: "Chaat, momos, rolls, pav bhaji, biryani, juices & more!",
  },
  {
    icon: MdOutlineDiscount,
    title: "🎉 Special Discounts",
    description: "Earn reward points & cashback on every order.",
  },
  {
    icon: FaGift,
    title: "🎊 Festival & Weekend Offers",
    description: "Enjoy special deals on weekends & festivals.",
  },
];

export default Service;