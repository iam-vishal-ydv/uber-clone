const mongoose = require("mongoose");

async function connectToDb() {
  try {
    const db = await mongoose.connect(process.env.DB_CONNECT);
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectToDb;
