// Import required modules
const express = require("express");
require('dotenv').config(); // Load environment variables

const bodyParser = require('body-parser');
const cors = require('cors');

// Set the port from the environment variable or default to 3306
const port = process.env.APP_PORT || 3001;

// Create an instance of the Express application
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

// Routes
const userRoute = require('./routes/userRoute');
const addressRoute = require('./routes/addressRoute');
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const reviewRoute = require('./routes/reviewRoute');
const orderRoute = require('./routes/orderRoute');
const shipmentRoute = require('./routes/shipmentRoute');
const customizeRoute = require('./routes/customizeRoute');

// Define routes for each table
app.use('/api/user', userRoute);
app.use('/api/address', addressRoute);
app.use('/api/category', categoryRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/review', reviewRoute);
app.use('/api/order', orderRoute);
app.use('/api/shipment', shipmentRoute);
app.use('/api/customize', customizeRoute);

// Define a default route for the index page
app.get("/", (req, res) => {
    res.status(200).json({ message: "This is the index page" });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

