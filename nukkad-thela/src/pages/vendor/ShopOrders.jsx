import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ShopOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusCount, setStatusCount] = useState({
    Cooking: 0,
    Pending: 0,
    Delivered: 0,
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backendUrl}/vendor/showorders`, {
        withCredentials: true,
      });
      if (Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
        updateStatusCount(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatusCount = (orders) => {
    const count = { Cooking: 0, Pending: 0, Delivered: 0 };
    orders.forEach((order) => count[order.orderStatus]++);
    setStatusCount(count);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(
        `${backendUrl}/vendor/changestatus`,
        { orderId, orderStatus: newStatus },
        { withCredentials: true }
      );
      if (Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
        updateStatusCount(response.data.orders);
        console.log(response.data.orders)
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderOrders = (status, title) => {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === status
    );
    return (
      <div className="flex flex-col items-center w-full mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-600 pb-2 text-center">
          {title}
        </h2>
        <div className="flex flex-col items-center w-full space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card
                key={order._id}
                className="max-w-2xl w-full p-6 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 bg-gray-800 rounded-2xl border border-gray-700"
              >
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {order.userId.name || "Unknown Customer"}
                    </h3>
                    <Badge
                      className={`text-white px-3 py-1 rounded-full ${
                        order.orderStatus === "Cooking"
                          ? "bg-orange-500"
                          : order.orderStatus === "Pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </div>
                  <ul className="my-3 space-y-1 text-gray-300">
                    <li>• {order.productName}</li>
                  </ul>
                  <p className="font-semibold text-gray-200 flex justify-between">
                    <span>Price: ₹{order.productPrice}</span>
                    <span>Quantity :  {order?.productQuantity || 1}</span>
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      className={`w-full ${
                        order.orderStatus === "Cooking"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-700 hover:bg-orange-500"
                      } ${order.orderStatus === "Delivered" ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={() => updateOrderStatus(order._id, "Cooking")}
                      disabled={order.orderStatus !== "Pending"}
                    >
                      Cooking
                    </Button>
                    <Button
                      className={`w-full ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-500 text-white"
                          : "bg-gray-700 hover:bg-green-500"
                      } ${order.orderStatus === "Delivered" ? "cursor-not-allowed opacity-50" : ""}`}
                      onClick={() => updateOrderStatus(order._id, "Delivered")}
                      disabled={order.orderStatus !== "Cooking"}
                    >
                      Delivered
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-400">No orders right now.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center mb-10 animate-pulse">
        Your Orders
      </h1>
      <div className="flex justify-center gap-6 mb-10">
        {["Cooking", "Pending", "Delivered"].map((status) => (
          <Card
            key={status}
            className="w-40 text-center shadow-lg border border-gray-700 hover:scale-105 transition-transform"
          >
            <CardContent>
              <h2 className="text-lg font-semibold capitalize">{status}</h2>
              <p
                className={`text-3xl font-bold ${
                  status === "Cooking"
                    ? "text-orange-400"
                    : status === "Pending"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {statusCount[status]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-600 pb-2 text-left w-full">
        🔥 Your Current Orders
      </h3>
      {renderOrders("Pending", "🟡 Pending Orders")}
      {renderOrders("Cooking", "🟠 Cooking Orders")}
      <h3 className="text-2xl font-semibold text-white mb-4 border-b border-gray-600 pb-2 text-left w-full">
        ✅ Your Completed Orders
      </h3>
      {renderOrders("Delivered", "🟢 Delivered Orders")}
    </div>
  );
};

export default ShopOrders;
