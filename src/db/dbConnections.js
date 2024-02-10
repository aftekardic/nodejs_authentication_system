const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected database...");
  })
  .catch((err) => {
    console.log(`An error occurred while connecting to the database: ${err}`);
  });
