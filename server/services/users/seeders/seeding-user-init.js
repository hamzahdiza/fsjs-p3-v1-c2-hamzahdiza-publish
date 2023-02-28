const { MongoClient } = require("mongodb");
const docs = require("./user-init.json");
const PASSWORD_MONGO = process.env.PASSWORD_MONGO;

const uri = `mongodb+srv://hamzahdiza:qK4PKSz1CODbXIjd@p3c2.b1yuyjc.mongodb.net/test`;
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
