const fs = require("fs");
const data = JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
const products = data.products;

const express = require("express");
const morgan = require("morgan");
const server = express();

//bodyParser
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));

/**
 * get all product list
 */
server.get("/v1/api/products", (req, res, next) => {
  console.log("get all product list!");
  res.json(products);
});

// get particular product
server.get("/v1/api/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
});

// insert new product
server.post("/v1/api/products", (req, res) => {
  products.push(req.body);
  res.status(201).json(products);
});

// replace product using put method
server.put("/v1/api/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(202).json(products);
});

// update product using patch method
server.patch("/v1/api/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(202).json(products);
});

/**
 * server started here:-
 */
server.listen(8080, () => {
  console.log("server started!");
});
