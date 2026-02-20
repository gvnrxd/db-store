const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("Hello World!");
});

console.log(process.env.S3_BUCKET);
console.log(process.env.SECRET_KEY);

app.listen(PORT, () => {
  console.log(`Db store listening on port ${PORT}`);
});
