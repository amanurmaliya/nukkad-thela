import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1️⃣ Create Order (Backend API Call)
      const { data } = await axios.post("http://localhost:4000/api/v1/payment/createorder", {
        amount: 500, // ₹500
        currency: "INR"
      });

      const { amount, id: order_id, currency } = data.order;

      // 2️⃣ Initialize Razorpay
      const options = {
        key: "rzp_test_YrfnFWnclrNh4Y", // Replace with Razorpay Key ID
        amount,
        currency,
        name: "Your Company",
        description: "Test Transaction",
        order_id,
        handler: async function (response) {
          // 3️⃣ Verify Payment
          const verifyRes = await axios.post("http://localhost:4000/api/v1/payment/verifypayment", response);
          alert(verifyRes.data.message);
        },
        prefill: {
          name: "Aman Tripathi",
          email: "aman@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed");
    } finally {
      setLoading(false);
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
