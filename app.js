const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());

const products = require("./data");
app.get("/products", (req, res) => {
  res.json(products);
});
app.listen(8000, () => {
  console.log(" the application is running localhost:8000");
});
