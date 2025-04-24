const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// 🧾 Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ➕ Add product (admin only)
router.post('/add', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✏️ Update product (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ❌ Delete product (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🛒 Buy product (customer only)
router.put('/buy/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ error: 'Only customers can buy products' });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.quantity <= 0) {
      return res.status(400).json({ error: 'Product not available' });
    }
    product.quantity -= 1;
    await product.save();
    res.json({ message: 'Product purchased successfully', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
