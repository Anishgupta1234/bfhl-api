require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bfhlRoutes = require("./routes/bfhlRoutes");
const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use("/", bfhlRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("EMAIL:", process.env.OFFICIAL_EMAIL);
});