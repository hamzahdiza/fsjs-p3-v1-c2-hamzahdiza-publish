const { MongoClient } = require("mongodb");
const docs = require("./user-init.json");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("p3c2");

    const users = database.collection("Users");

    const option = { ordered: true };
    const result = await users.insertMany(docs, option);

    console.log(result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
