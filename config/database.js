const mongoose = require("mongoose");
const { MONGO_URI } = process.env;
exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection Established");
    })
    .catch((error) => {
      console.log("Database Connection Failed to establish");
      console.error(error);
      process.exit(1);
    });
};
