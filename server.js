const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from www.unc.edu directory
const staticPath = path.join(__dirname, 'src');
app.use(express.static(staticPath));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading page');
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal server error');
});

// Start server (only if not in Vercel environment)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Serving static files from: ${staticPath}`);
  });
}

module.exports = app;

