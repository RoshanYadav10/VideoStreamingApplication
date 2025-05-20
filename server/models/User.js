const db = require('../config/db');

// User Model
const User = {
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  },

  create: (userData, callback) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [userData.name, userData.email, userData.password], callback);
  },
};

module.exports = User;
