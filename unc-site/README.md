# UNC Static Site Server

A simple Node.js Express server to serve the UNC homepage as a static site.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

You can change the port by setting the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## What's Included

- Main homepage (`www.unc.edu/index.html`)
- All necessary assets (CSS, JS, images) from `wp-content/` and `wp-includes/`

All other pages and directories have been removed to keep only the homepage.

