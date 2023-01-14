const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
require("./db");
const authRouter = require("./routes/auth");
const portfolioRouter = require("./routes/portfolio");
const orderRouter = require("./routes/order");
const uploadRouter = require("./routes/upload");
app.use("/images", express.static("upload/images"));
app.use(authRouter);
app.use(orderRouter);
app.use(portfolioRouter);
app.use(uploadRouter);

app.listen(4000, () => {
  console.log("listening on 4000");
});
