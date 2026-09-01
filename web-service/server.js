const express = require('express');
const app = express();
const PORT = 3000;
const API_URL = process.env.API_URL || 'http://api-service:4000/api/time';

app.get('/health', (req, res) => {
  const fullCommit = process.env.GIT_COMMIT || 'unknown';
  res.json({
    status: "ok",
    build: process.env.BUILD_NUMBER || "local",
    commit: fullCommit !== 'unknown' ? fullCommit.substring(0, 7) : "local"
  });
});

app.get('/', async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>World Clock</title></head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
          <h1>World Clock via Microservices</h1>
          <p><strong>Israel:</strong> ${data.israel}</p>
          <p><strong>Florida:</strong> ${data.florida}</p>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send('Error communicating with API service');
  }
});

app.listen(PORT, () => {
  console.log(`Web Service running on port ${PORT}`);
});