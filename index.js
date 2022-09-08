const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
require("dotenv").config();
require("./db");
const authrouter = require("./controllers/auth");
const portfoliorouter = require("./controllers/portfolio");
const orderrouter = require("./controllers/order");
app.use(authrouter);
app.use(orderrouter);
app.use(portfoliorouter);

app.listen(4000, () => {
  console.log("listening on 4000");
});
