import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const [loading, setLoading] = useState(false);


const handlePayment = async () => {
    try {
        const { data } = await axios.post("http://localhost:4000/api/v1/payment/createorder", {
            amount: 500,  // Example amount
            userId: "user123",
            vendorId: "shop456",
            productName: "Special Dish"
        });

        const options = {
            key: import.meta.env.VITE_RAZORPAY_API_KEY,
            amount: data.amount,
            currency: data.currency,
            name: "Style Spot",
            description: "Order Payment",
            order_id: data.orderId,
            handler: async (response) => {
                const verifyRes = await axios.post("http://localhost:4000/api/v1/payment/verifypayment", {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    userId: "user123",
                    vendorId: "shop456",
                    productName: "Special Dish",
                    productPrice: 500
                });

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
    <div>
      <Button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay ₹500"}
      </Button>
    </div>
  );
};

export default Payment;
