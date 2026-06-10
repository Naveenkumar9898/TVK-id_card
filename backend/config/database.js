const mongoose = require("mongoose");

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/card-details");
    // await mongoose.connect("mongodb+srv://naveenkumar302623_db_user:3mKkT2NccayFqSny@cluster0.l6rl6x3.mongodb.net/card-details?retryWrites=true&w=majority");
    

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB Connection Error:", err);
  }
}

main();

module.exports = mongoose;