const db = require('../config/db'); // Import MySQL connection

const Payment = {
  create: (paymentData, callback) => {
    const query = `
      INSERT INTO payments (orderId, amount, status, createdAt,userId,playlistId)
      VALUES (?, ?, ?, NOW(),?,?)
    `;
    db.query(query, [paymentData.orderId, paymentData.amount, 'Pending',paymentData.userId,paymentData.playlistId], callback);
  },

  findByOrderId: (orderId, callback) => {
    const query = 'SELECT * FROM payments WHERE orderId = ?';
    db.query(query, [orderId], callback);
  },

  update: (orderId, updates, callback) => {
    const query = 'UPDATE payments SET paymentId = ?, signature = ?, status = ? WHERE orderId = ?';
    db.query(
      query,
      [updates.paymentId, updates.signature, updates.status, orderId],
      callback
    );
  },
};

module.exports = Payment;
