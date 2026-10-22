const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

exports.routes = router;
exports.products = products;
