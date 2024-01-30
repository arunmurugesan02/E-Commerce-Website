const mongoose = require("mongoose");

const connectedDatabase = () => {
  console.log("MongoDB URI:", process.env.MONGO_DB_URI); // Add this line for debugging
  mongoose
    .connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MONGODB");
    });
};
module.exports = connectedDatabase;
