import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const VendorDashboard = () => {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vendorName, setVendorName] = useState("Vendor"); // Placeholder for vendor name
  
  const navigate = useNavigate();

  // Fetch shop details from backend
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/vendor/getshopdetails`,
          { withCredentials: true } // If authentication is required
        );

        if (response.data.success) {
          setShop(response.data.shop);
          setVendorName(response.data.vendorName || "Vendor"); // Assuming vendorName is sent from backend

        } else {
          setShop(null);
        }
      } catch (error) {
        console.error("Error fetching shop details:", error);
        setShop(null);
      } finally {
        setLoading(false);
      }
    };

    fetchShopDetails();
  }, []);

  // Toggle shop status
  const toggleShopStatus = () => {
    setShop({ ...shop, isActive: !shop.isActive });
  };

  const menuItems = [
    { label: "Shop Detail", url: "shop-detail" },
    { label: "Your Dishes", url: "show-dishes" },
    { label: "Show Reviews", url: "show-reviews" },
    { label: "Show Order", url: "show-orders" },
    { label: "Create Dish", url: "create-dish" },
  ];

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* Vendor's Dashboard Title */}
      <h1 className="text-4xl font-bold text-center mb-6 text-green-500">{vendorName}'s Dashboard</h1>

      {/* Shop Card with Buttons */}
      <Card className="p-4 shadow-lg bg-white">
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Notifications: {shop ? shop.notifications || 0 : 0}
            </span>
            {shop && (
              <Button
                onClick={toggleShopStatus}
                className={shop.isActive ? "bg-green-500" : "bg-red-500"}
              >
                {shop.isActive ? "Active" : "Inactive"}
              </Button>
            )}
          </div>

          <h2 className="text-2xl font-semibold">{shop ? shop.shopName : "No Shop Found"}</h2>
          <p className="text-gray-600">{shop ? `Location: ${shop.location}` : "Please create your shop"}</p>

          {/* Buttons - Keep them together */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {menuItems.map(({ label, url }, index) => (
              <Button
                key={label}
                onClick={() => navigate(`/${url.toLowerCase().replace(/\s/g, "-")}`)}
                className={`bg-gray-200 text-black hover:bg-gray-300 py-3 text-lg ${
                  !shop && index !== 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!shop && index !== 0} // Disable all except "Shop Detail" if no shop
              >
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Manual Section */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">📖 User Manual</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <span className="font-semibold">📌 Shop Detail:</span> If you haven’t created a shop, this
            section allows you to create one. Once your shop is created, you can update its details
            anytime.
          </li>
          <li>
            <span className="font-semibold">🍽️ Your Dishes:</span> View all the dishes you have added. You
            can edit or remove them as needed.
          </li>
          <li>
            <span className="font-semibold">⭐ Show Reviews:</span> Read customer feedback on your shop.
            Understand what customers like and improve your services.
          </li>
          <li>
            <span className="font-semibold">📦 Show Order:</span> Track your orders in two sections:
            <ul className="pl-4 list-disc">
              <li>
                <span className="font-medium">Current Orders:</span> Orders that are still pending or in
                the cooking process.
              </li>
              <li>
                <span className="font-medium">Completed Orders:</span> Orders that have been delivered.
              </li>
            </ul>
            At the top, you can see the total number of pending, cooking, and delivered orders.
          </li>
          <li>
            <span className="font-semibold">🍛 Create Dish:</span> Easily add new dishes to your shop,
            providing all necessary details to attract customers.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VendorDashboard;
