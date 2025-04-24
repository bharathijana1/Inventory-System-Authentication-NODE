const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to check if admin exists and create it if not
const createAdminIfNotExists = async () => {
  const admin = await User.findOne({ email: 'admin@gmail.com' });
  if (!admin) {
    const newAdmin = new User({
      email: 'admin@gmail.com',
      password: 'admin',
      role: 'admin',
    });
    await newAdmin.save();
    console.log('Admin created with default credentials');
  }
};

// Run the admin creation when the server starts
createAdminIfNotExists();

// Register route for customers
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'customer' // default role as customer
    });
    await newUser.save();
    res.json({ message: 'Customer registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // First check if the email and password match the default admin credentials
  if (email === 'admin@gmail.com' && password === 'admin') {
    // If yes, automatically assign the admin role
    const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);
    return res.json({ token, role: 'admin' });
  }
  
  // If not admin, check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // If user is found, check if they are a customer and proceed
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

module.exports = router;
