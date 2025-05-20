const crypto = require("crypto");
const Payment = require("../models/payment");
const razorpay =require("../config/razorpayConfig")


exports.createOrder = async (req, res) => {
    const { amount, currency = "INR",playlistId } = req.body;
    const userId=req.user.id;
    console.log(userId);
    try {
        const options = {
            amount: amount * 100, // Convert to paise
            currency,
            receipt: `receipt_${Date.now()}`
        };
        console.log(userId);

        const order = await razorpay.orders.create(options);

        // Save the order details in the MySQL database
        Payment.create({ orderId: order.id, amount,playlistId,userId }, (err, result) => {
            if (err) {
                console.error("Error saving payment:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            res.status(201).json({ success: true, order });
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.verifyPayment = async (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    try {
        // Retrieve payment details from the MySQL database
        Payment.findByOrderId(orderId, (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ success: false, message: "Order not found" });
            }

            const payment = results[0]; // Get the first result

            const body = `${orderId}|${paymentId}`;
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");

            if (expectedSignature === signature) {
                // Update the payment details in the MySQL database
                const updates = {
                    paymentId,
                    signature,
                    status: "Paid",
                };

                Payment.update(orderId, updates, (err, result) => {
                    if (err) {
                        console.error("Error updating payment:", err);
                        return res.status(500).json({ success: false, message: "Database error" });
                    }

                    res.status(200).json({ success: true, message: "Payment verified successfully" });
                });
            } else {
                res.status(400).json({ success: false, message: "Invalid signature" });
            }
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
