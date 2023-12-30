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
const { roles } = require("./config/roles");
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
  res.send(`
  <style>*{margin:0;padding:0;body{overflow:hidden}}</style>
  <img width="100%" src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
  `);
});
app.get("/roles", (req, res) => {
  res.json(roles);
});
app.get("/paymentkey", async (req, res) => {
  res.json({
    success: true,
    key: process.env.RAZORPAY_KEYID,
  });
});
