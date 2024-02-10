require("express-async-errors");
require("dotenv").config();
require("./src/db/dbConnections");
const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
const router = require("./src/routers");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./src/helpers/corsOptions");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const apiLimiter = require("./src/middlewares/rateLimit");

// Middlewares
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname)));

// CORS
app.use(cors(corsOptions));

// Fazla istek engelleme
app.use("/api", apiLimiter);
// Mongo injection
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

// Routers
app.use("/api", router);

// Hata yakalama
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running... Port: ${port}`);
});
