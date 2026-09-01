const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Live World Clock</title>
        <style>
          body { font-family: system-ui, sans-serif; background: #f4f4f9; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
          .card { background: white; width: 350px; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
          h1 { font-size: 1.4rem; margin-bottom: 20px; color: #111; }
          .time-row { margin: 15px 0; font-size: 1.1rem; }
          .time-val { font-weight: bold; color: #0066cc; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Live World Clock</h1>
          <div class="time-row">Israel:<br><span id="israel-time" class="time-val">Loading...</span></div>
          <div class="time-row">Florida (EST/EDT):<br><span id="florida-time" class="time-val">Loading...</span></div>
        </div>
        <script>
          function updateClocks() {
            const now = new Date();
            document.getElementById('israel-time').innerText = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Jerusalem' });
            document.getElementById('florida-time').innerText = now.toLocaleTimeString('en-US', { timeZone: 'America/New_York' });
          }
          updateClocks();
          setInterval(updateClocks, 1000);
        </script>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});