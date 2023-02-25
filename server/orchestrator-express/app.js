const express = require("express");
const PORT = process.env.PORT || 4000;
const Redis = require("ioredis");
const router = require("./routes");
const app = express();
// const redis = new Redis();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
