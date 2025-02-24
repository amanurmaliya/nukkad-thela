import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Menu = () => {

    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([{ dishName: '', price: '' }]);
    

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMenu = [...menuItems];
    updatedMenu[index][name] = value;
    setMenuItems(updatedMenu);
  };

  const handleAddDish = () => {
    setMenuItems([...menuItems, { dishName: '', price: '' }]);
  };

  const handleRemoveDish = (index) => {
    const updatedMenu = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedMenu);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Menu Submitted:', menuItems);
    navigate('/vendor/photoUpload'); // Redirect to new page after submission -> photoupload
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#000]">
      <div className="w-full max-w-2xl border-4 border-yellow-400 bg-gray-900 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Menu</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {menuItems.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                type="text"
                name="dishName"
                placeholder="Dish Name"
                value={item.dishName}
                onChange={(e) => handleChange(index, e)}
                className="w-full sm:w-1/2 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(index, e)}
                className="w-full sm:w-1/4 p-2 border rounded"
                required
              />
              <Button
                type="button"
                onClick={() => handleRemoveDish(index)}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={handleAddDish}
            className="w-full bg-green-500 text-white hover:bg-green-600"
          >
            Add Dish
          </Button>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit Menu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Menu;
