const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "https://eatzyy.netlify.app",
    optionsSuccessStatus: 200,
  })
);

app.get(/^\/api\/(.*)/, async (req, res) => {
  try {
    const swiggyPath = req.params[0];
    // Append query string if present
    const query = req.url.split("?")[1];
    const swiggyURL = `https://www.swiggy.com/${swiggyPath}${
      query ? "?" + query : ""
    }`;

    const response = await fetch(swiggyURL, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch", message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
