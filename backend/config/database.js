const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/card-details");

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
}

main();

module.exports = mongoose;