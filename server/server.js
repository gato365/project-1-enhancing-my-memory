const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/connection');
const routes = require('./routes');

// Set up Express app
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets from the public directory
app.use(express.static('public'));

// Define routes
app.use(routes);

// Start server and database connection
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Here is the link http://localhost:${PORT}`)
    });
});
