import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const VendorDashboard = () => {
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  // Function to create a new shop
  const createNewShop = () => {
    const newShop = {
      id: Date.now(),
      name: `My Shop`,
      notifications: Math.floor(Math.random() * 5),
      isActive: false,
      location: 'Example Location'
    };
    setShop(newShop);
  };

  // Toggle shop status
  const toggleShopStatus = () => {
    setShop({ ...shop, isActive: !shop.isActive });
  };

  const menuItems = {
    'Shop Detail': 'shop-detail',
    'Menu': 'menu',
    'Upload Photo': 'upload-photo',
    'Show Reviews': 'show-reviews',
    'Show Order': 'show-order',
    'Create Dish': 'create-dish'
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Vendor Dashboard</h1>

      {!shop ? (
        <Button onClick={createNewShop} className="bg-blue-500 text-white">
          Create New Shop
        </Button>
      ) : (
        <Card className="p-4 shadow-lg">
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Notifications: {shop.notifications}</span>
              <Button
                onClick={toggleShopStatus}
                className={shop.isActive ? 'bg-green-500' : 'bg-red-500'}
              >
                {shop.isActive ? 'Active' : 'Inactive'}
              </Button>
            </div>
            <h2 className="text-xl font-semibold">{shop.name}</h2>
            <p className="text-gray-600">Location: {shop.location}</p>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(menuItems).map(([item, url]) => (
                <Button
                  key={item}
                  onClick={() => navigate(`/${url.toLowerCase().replace(/\s/g, '-')}`)}
                  className="bg-gray-200 text-black hover:bg-gray-300"
                >
                  {item}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VendorDashboard;
