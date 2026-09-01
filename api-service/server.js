const express = require('express');
const app = express();
const PORT = 4000;
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'api-service' });
});

app.get('/api/time', (req, res) => {
  res.json({
    israel: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }),
    florida: new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
  });
});

app.listen(PORT, () => {
  console.log(`API Service running on port ${PORT}`);
});