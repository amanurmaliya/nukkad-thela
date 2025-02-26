import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Loader } from "lucide-react";
import OrderTracking from "./OrderTracking";

const statusMapping = {
  Cooking: { label: "Cooking", color: "text-orange-500", icon: <Loader className="w-5 h-5 animate-spin" /> },
  Pending: { label: "Order Placed", color: "text-blue-500", icon: <Clock className="w-5 h-5" /> },
  Delivered: { label: "Order Completed", color: "text-green-500", icon: <CheckCircle className="w-5 h-5" /> },
};

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/user/showorders`, { withCredentials: true });

        if (data.success) {
          const transformedOrders = data.orders.map(order => ({
            ...order,
            shopName: order.shopId?.shopName || "Unknown Shop",
          }));

          setOrders(transformedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const currentOrders = orders?.filter(order => order.orderStatus !== "Delivered") || [];
  const completedOrders = orders?.filter(order => order.orderStatus === "Delivered") || [];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-4xl font-bold text-center text-white tracking-wide">😋 My Orders 😋</h2>

      {/* Current Orders */}
      {currentOrders.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
            🔥 Your Current Orders
          </h3>
          <div className="flex flex-col gap-6 items-center">
            {currentOrders.map((order) => {
              const status = statusMapping[order.orderStatus];
              return (
                <Card
                  key={order._id}
                  onClick={() => handleOrderClick(order)}
                  className="w-full max-w-2xl bg-gradient-to-r from-gray-800 to-gray-900 shadow-md rounded-xl p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-white">
                      <span className="text-lg font-semibold">
                        <span className="text-gray-300">Shop :</span> {order.shopName}
                      </span>
                      <Badge className={`flex items-center gap-1 ${status.color}`}>
                        {status.icon} {status.label}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-white font-medium">
                      <div>
                        <span className="text-gray-300 font-semibold">🍽️ Items: {order.productName}</span>
                        <span className="text-gray-300 font-semibold"> , Qty {order?.productQuantity || 1}</span>
                      </div>
                      <div>
                        <span className="text-gray-300 font-semibold">💰 Amount: </span>
                        <span className="font-bold">₹{order.productPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Completed Orders */}
      {completedOrders.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold text-white mt-8 mb-4 border-b border-gray-600 pb-2">
            ✅ Completed Orders
          </h3>
          <div className="flex flex-col gap-6 items-center">
            {completedOrders.map((order) => {
              const status = statusMapping[order.orderStatus];
              return (
                <Card
                  key={order._id}
                  onClick={() => handleOrderClick(order)}
                  className="w-full max-w-2xl bg-gradient-to-r from-gray-700 to-gray-800 shadow-md rounded-xl p-4 hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-white">
                      <span className="text-lg font-semibold">
                        <span className="text-gray-300">Shop :</span> {order.shopName}
                      </span>
                      <Badge className={`flex items-center gap-1 ${status.color}`}>
                        {status.icon} {status.label}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-white font-medium">
                      <div>
                        <span className="text-gray-300 font-semibold">🍽️ Items: {order.productName}</span>
                        <span className="text-gray-300 font-semibold"> , Qty {order?.productQuantity || 1}</span>
                      </div>
                      <div>
                        <span className="text-gray-300 font-semibold">💰 Amount: </span>
                        <span className="font-bold">₹{order.productPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {selectedOrder && <OrderTracking order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default OrderStatus;
