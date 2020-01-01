import mongoose from "mongoose";

const { MONGODB_URI, NODE_ENV, MONGO_OPTIONS } = process.env;
const mongoUrl = MONGODB_URI || "mongodb://localhost:27017/E-Voting";

const options = MONGO_OPTIONS
  ? JSON.parse(MONGO_OPTIONS)
  : { useNewUrlParser: true, useUnifiedTopology: true };

module.exports = mongoose
  .connect(mongoUrl, options)
  .then(resp => {
    if (NODE_ENV !== "test" && resp) {
      console.log("mongo is running on: ", mongoUrl);
      console.log("mongodb connected successfully");
    }

    return mongoose;
  })
  .catch(error => {
    console.error(error);
    process.exit();
  });
