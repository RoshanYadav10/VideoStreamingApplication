const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/order",authMiddleware, createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
