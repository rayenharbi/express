const express = require('express');
const app = express();

// Custom middleware to verify the time of the request
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

// Serve static files from the "public" directory
app.use(express.static('public'));

// Apply the working hours middleware to all routes
app.use(workingHoursMiddleware);

// Home page route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Our Services page route
app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

// Contact us page route
app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


