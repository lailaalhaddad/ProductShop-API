const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let products = require("./data");
app.get("/products", (req, res) => {
  res.json(products);
});

app.delete("/products/:productId", (req, res) => {
  const { productId } = req.params;
  const foundProduct = products.find((product) => product.id === +productId);
  if (foundProduct) {
    products = products.filter((product) => product.id !== foundProduct);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Product with this ID doesn't exist." });
  }
});

app.post("/products", (req, res) => {
  const id = products[products.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newProduct = { id, slug, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.listen(8000, () => {
  console.log(" the application is running localhost:8000");
});
