import React, { useState, useEffect } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Get backend URL from Vite environment variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/vendor/showorders`);
        setOrders(response.data.orders); // Assuming the response has an "orders" array
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-900 text-white font-sans flex flex-col items-center py-10">
      <div className="mb-6">
        <div className="bg-gray-300 text-black font-bold px-4 py-2 inline-block rounded">
          Shop Name
        </div>
      </div>

      <div className="w-3/5 mb-6">
        <div className="bg-gray-300 text-black font-bold px-6 py-4 rounded flex justify-between">
          <span>Client</span>
          <span>Price</span>
          <span>Item</span>
          <span>Payment Status</span>
          <span>Order Status</span>
        </div>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-700 px-3 py-3 mt-2 rounded flex justify-between"
            >
              <span>{order.userId}</span>
              <span>₹{" "}{order.productPrice}</span>
              <span>{order.productName}</span>
              <span>{order.paymentStatus}</span>
              <span>{order.orderStatus}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
