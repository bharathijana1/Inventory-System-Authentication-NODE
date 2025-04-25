const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware to parse incoming JSON requests
app.use(cors()); 
app.use(express.json()); 

// Set up routes
app.use('/auth', authRoutes); 
app.use('/products', productRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');    
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

  const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`)
})
