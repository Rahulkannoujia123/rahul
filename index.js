const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
require("./db");
const authRouter = require("./routes/auth");
const portfolioRouter = require("./routes/portfolio");
const orderRouter = require("./routes/order");
const uploadRouter = require("./routes/upload");
const postRouter = require("./routes/blog/post");
const mailRouter = require("./routes/sendmail");
const paymentRouter = require("./routes/payment/payment");
const paymentVerify = require("./routes/payment/verify");
const categoryRouter = require("./routes/blog/category");
const multerErrorHandler = require("./middleware/multerhandler");
app.use(paymentRouter);
app.use(paymentVerify);
app.use("/upload", express.static("upload"));
app.use(authRouter);
app.use(orderRouter);
app.use(portfolioRouter);
app.use(uploadRouter);
app.use(postRouter);
app.use(categoryRouter);
app.use(mailRouter);
app.use(multerErrorHandler);
app.listen(process.env.PORT || 4000, () => {});
app.get("/", (req, res) => {
  res.json({
    message: "server is running on port " + (process.env.PORT || 4000),
  });
});
app.get("/paymentkey", async (req, res) => {
  res.json({
    success: true,
    key: process.env.RAZORPAY_KEYID,
  });
});
