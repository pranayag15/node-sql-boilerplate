import routeMiddleware from "../routes/router";
const express = require("express");
const router = require("express").Router();
const morgan = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
// import { auth } from './auth'

require("dotenv").config();

let app = express();
// app.use(auth.initialize())
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});

// app.use('/api/v1/brand_logos', express.static('brand_logos'))

app.get("/", (req, res) => {
  res.json("api connected");
});

app.use("/api/v1", routeMiddleware);

app.get("/all", (req, res) => {
  res.json({
    status: `API Its Working`,
    route: app._router.stack
      .filter((r) => r.route)
      .map((r) => {
        return { path: r.route.path, methods: r.route.methods };
      }),
    message: "Welcome to my crafted with love!",
  });
});

export default app;
