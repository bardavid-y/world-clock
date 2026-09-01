const express = require('express');
const app = express();
const PORT = 4000;

app.get('/health', (req, res) => {
  const fullCommit = process.env.GIT_COMMIT || 'unknown';
  res.json({
    status: "ok",
    build: process.env.BUILD_NUMBER || "local",
    commit: fullCommit !== 'unknown' ? fullCommit.substring(0, 7) : "local"
  });
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