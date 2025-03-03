const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'] || "";
  const referer = req.headers.referer || "";

  console.log("Referer:", referer);
  console.log("User-Agent:", userAgent);

  // Bloquear peticiones si el User-Agent contiene "curl" (sin encoding)
  if (userAgent.includes("curl")) {
    return res.status(403).send("Access Denied: User-Agent 'curl' is blocked.");
  }

  res.send("Everything is fine!");
});

app.listen(3000, () => console.log('Listening on port 3000'));
