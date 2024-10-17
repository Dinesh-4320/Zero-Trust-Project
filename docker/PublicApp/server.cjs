const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));

// Serve static files from the dist directory
app.use('/public-service/',express.static(path.join(__dirname, 'dist')));

// Handle client-side routing by sending index.html for every request
app.get('/public-service/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server on port 5000 (or any preferred port)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
