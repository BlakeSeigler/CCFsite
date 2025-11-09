const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from www.unc.edu directory
const staticPath = path.join(__dirname, 'www.unc.edu');
app.use(express.static(staticPath));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving static files from: ${staticPath}`);
});

