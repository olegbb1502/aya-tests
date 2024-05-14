// app.js
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

// Configure middleware, body parser, etc.

app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
