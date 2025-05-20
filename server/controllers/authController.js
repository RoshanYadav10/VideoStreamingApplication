const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    User.findByEmail(email, async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = { name, email, password: hashedPassword };
      User.create(newUser, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Database error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.json({ token });
  });
};
