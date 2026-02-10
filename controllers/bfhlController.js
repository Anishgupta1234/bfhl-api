const { isPrime, gcd, lcm } = require("../utils/mathUtils");
const { askGemini } = require("../services/geminiService");
const { EMAIL } = require("../config/dotenv");
exports.healthCheck = (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
};
exports.handleBFHL = async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body || {});
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Exactly one key is required"
      });
    }
    const key = keys[0];
    let data;
    switch (key) {
      case "fibonacci":
        const n = body.fibonacci;
        if (!Number.isInteger(n) || n < 0 || n > 50) throw "Invalid fibonacci";
        let a = 0, b = 1;
        data = [];
        for (let i = 0; i < n; i++) {
          data.push(a);
          [a, b] = [b, a + b];
        }
        break;
      case "prime":
        data = body.prime.filter(isPrime);
        break;
      case "lcm":
        data = body.lcm.reduce((a, b) => lcm(a, b));
        break;
      case "hcf":
        data = body.hcf.reduce((a, b) => gcd(a, b));
        break;
      case "AI":
        data = await askGemini(body.AI);
        break;

      default:
        throw "Invalid request key";
    }
    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: err || "Internal Server Error"
    });
  }
};