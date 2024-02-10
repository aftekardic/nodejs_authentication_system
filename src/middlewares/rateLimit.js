const rateLimit = require("express-rate-limit");

const allowedList = ["::1"];
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req, res) => {
    if (req.url == "/login" || req.url == "/register") {
      return 5;
    } else {
      return 20;
    }
  },
  message: {
    success: false,
    message: "You've made too many requests. Try again after 15 minutes...",
  },
  skip: (req, res) => allowedList.includes(req.ip),
  standartHeaders: true,
  legacyHeaders: false,
});

module.exports = apiLimiter;
