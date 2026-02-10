const express = require("express");
const router = express.Router();
const {
  healthCheck,
  handleBFHL
} = require("../controllers/bfhlController");
router.get("/health", healthCheck);
router.post("/bfhl", handleBFHL);
module.exports = router;