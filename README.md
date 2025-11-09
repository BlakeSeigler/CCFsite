# UNC Static Site Server

A Node.js Express server to serve the UNC website as a static site, configured for deployment on Vercel.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Server Locally

Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

You can change the port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## Deployment to Vercel

This project is configured for deployment on Vercel using Node.js serverless functions.

### Deploy

1. Install Vercel CLI (if not already installed):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Project Structure

- `www.unc.edu/` - Main deployment directory containing:
  - `index.html` - Homepage
  - `wp-content/` - WordPress content (plugins, themes, uploads)
  - `wp-includes/` - WordPress core files (CSS, JS libraries)
  - `posts/` - Blog post pages
  - `discover/` - Discovery article pages

- `api/index.js` - Vercel serverless function wrapper
- `server.js` - Express app configuration
- `vercel.json` - Vercel deployment configuration

## What's Included

- Main homepage (`www.unc.edu/index.html`)
- All necessary assets (CSS, JS, images) from `wp-content/` and `wp-includes/`
- Blog posts and discovery articles
- Full upload history for all referenced assets

