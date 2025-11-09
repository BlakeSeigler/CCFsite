const app = require('../server');

// Export the Express app for Vercel serverless functions
// Vercel's @vercel/node builder automatically handles Express apps
module.exports = app;

