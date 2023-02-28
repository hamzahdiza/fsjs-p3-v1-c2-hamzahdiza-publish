const { MongoClient } = require("mongodb");

// const connectionString = process.env.MONGO_STRING;
const connectionString = "mongodb+srv://hamzahdiza:ltd4W8kEo0AESBio@p3c2.b1yuyjc.mongodb.net/test";

let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db("p3c2");

    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,

  getDatabase,
};
