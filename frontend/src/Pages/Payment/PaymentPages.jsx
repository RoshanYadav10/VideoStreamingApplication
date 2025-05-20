import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const { playlistId, playlistPrice } = location.state || {};

  useEffect(() => {
    if (!playlistId || !playlistPrice) {
      navigate("/");
    } else {
      setAmount(playlistPrice);
    }
  }, [playlistId, playlistPrice, navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/order",
        { amount, playlistId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_TUXmHdlMzmFPvE",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "JNJ",
        description: "Playlist Purchase",
        order_id: data.order.id,
        prefill: {
          name: "JNJ",
          email: "ntpmcoat@gmail.com",
          contact: "9999999999",
        },
        handler: async function (response) {
          try {
            const verifyData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            };

            const verifyResponse = await axios.post(
              "http://localhost:5000/api/payment/verify",
              verifyData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyResponse.data.success) {
              alert("✅ Payment successful!");
              navigate(-1);
            } else {
              throw new Error(verifyResponse.data.message);
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("❌ Payment verification failed. Redirecting to home.");
            navigate("/");
          }
        },
        theme: {
          color: "#0a9396",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("❌ Payment Failed. Redirecting to home.");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 Secure Payment</h2>
        <p style={styles.text}><strong>Playlist ID:</strong> {playlistId}</p>
        <p style={styles.amount}>Amount to Pay: <strong>₹{amount}</strong></p>
        <button
          onClick={handlePayment}
          style={loading ? styles.disabledButton : styles.payButton}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    background: "linear-gradient(to right, #edf2f7, #cfe8f3)",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "16px",
    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#2b2d42",
  },
  text: {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#4a4e69",
  },
  amount: {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
    color: "#22223b",
  },
  payButton: {
    backgroundColor: "#0a9396",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    color: "#555",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontSize: "1rem",
    border: "none",
    cursor: "not-allowed",
  },
};

export default PaymentPage;
