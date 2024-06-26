const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');
const imageRoute = require('./routes/imageRoute');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/images', imageRoute);

// Database connection
mongoose.connect('mongodb+srv://USE_YOUR_STRING@book-store1.hh5tv6d.mongodb.net/image-app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
