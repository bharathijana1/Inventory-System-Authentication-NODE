// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');
// const cors = require('cors');

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/auth', authRoutes);
// app.use('/products', productRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(5000, () => {
//       console.log('Server running on port 5000');
//     });
//   })
//   .catch(err => {
//     console.error('DB error:', err);
//   });

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Load environment variables
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(cors()); // To enable CORS
app.use(express.json()); // Parse JSON bodies

// Set up routes
app.use('/auth', authRoutes); // Authentication routes (login, register)
app.use('/products', productRoutes); // Product routes (CRUD operations)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful DB connection
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });
