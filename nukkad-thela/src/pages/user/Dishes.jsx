import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";  // Import Cookies

const Dishes = ({ dishes, shopId }) => {
    const navigate = useNavigate();
    const [quantities, setQuantities] = useState({});
    const userId = Cookies.get("userInfo"); // Get userId from cookies
    // console.log(shopId)
    if (!dishes || dishes.length === 0) {
        return <p className="text-center text-lg text-yellow-500 mt-4">This shop does not have any dishes available.</p>;
    }

    const updateQuantity = (dishId, increment) => {
        setQuantities((prev) => {
            const newQty = Math.max(1, (prev[dishId] || 1) + increment);
            return { ...prev, [dishId]: newQty };
        });
    };

    // 🛒 Handle Payment Process
    const handlePayment = async (dish) => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
            // ✅ No need to send userId manually; it will be extracted from cookies
            const { data } = await axios.post(
                `${backendUrl}/payment/createorder`, 
                {
                    amount: dish.price * 100,  // Razorpay requires amount in paise
                    vendorId: shopId,  
                    productName: dish.name
                },
                { withCredentials: true } // ✅ Ensures cookies are sent
            );
    
            const options = {
                key: import.meta.env.VITE_RAZORPAY_API_KEY,
                amount: data.amount,
                currency: data.currency,
                name: "Style Spot",
                description: `Payment for ${dish.name}`,
                order_id: data.orderId,
                handler: async (response) => {
                    const verifyRes = await axios.post(
                        `${backendUrl}/payment/verifypayment`, 
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            vendorId: shopId,
                            productName: dish.name,
                            productPrice: dish.price
                        },
                        { withCredentials: true }
                    );
    
                    alert(verifyRes.data.message);
                },
                prefill: {
                    name: "Aman Tripathi",
                    email: "aman@example.com",
                    contact: "9876543210"
                }
            };
    
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error in payment:", error);
        }
    };
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {dishes.map((dish) => {
                const quantity = quantities[dish._id] || 1;
                const totalPrice = dish.price * quantity;

                return (
                    <div key={dish._id} className="p-4 bg-gray-900 text-yellow-300 rounded-lg shadow-lg">
                        <img 
                            src={dish.image} 
                            alt={dish.name} 
                            className="w-full h-40 object-cover rounded-md mb-3 border-2 border-yellow-400"
                        />
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{dish.name}</h3>
                            <p className="text-yellow-400 font-bold">₹{dish.price}</p>
                        </div>
                        <p className="text-yellow-500 text-sm">{dish.description}</p>

                        {/* Quantity Selector */}
                        <div className="flex items-center mt-2">
                            <button className="bg-yellow-400 text-black px-2 py-1 rounded-l text-lg"
                                onClick={() => updateQuantity(dish._id, -1)}>−</button>
                            <span className="px-4 py-1 bg-gray-800 text-yellow-300">{quantity}</span>
                            <button className="bg-yellow-400 text-black px-2 py-1 rounded-r text-lg"
                                onClick={() => updateQuantity(dish._id, 1)}>+</button>
                        </div>

                        {/* Total Price */}
                        <p className="text-yellow-300 font-semibold mt-2">Total: ₹{totalPrice}</p>

                        {/* Buy Now Button */}
                        <button className="bg-yellow-500 text-black px-4 py-2 rounded-md mt-3 font-bold hover:bg-yellow-600 w-full"
                            onClick={() => handlePayment(dish)}>Buy Now</button>
                    </div>
                );
            })}
        </div>
    );
};

export default Dishes;
