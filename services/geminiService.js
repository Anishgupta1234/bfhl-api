const axios = require("axios");
const { GEMINI_API_KEY } = require("../config/dotenv");
const askGemini = async (question) => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: question }] }]
    }
  );
  const text =
    response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text.split(" ")[0].replace(/[^a-zA-Z]/g, "");
};
module.exports = { askGemini };