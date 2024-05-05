const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require("./db");
const authRouter = require("./routes/auth");
const portfolioRouter = require("./routes/portfolio");
const orderRouter = require("./routes/order");
const uploadRouter = require("./routes/upload");
const mailRouter = require("./routes/sendmail");
const paymentRouter = require("./routes/payment/payment");
const paymentVerify = require("./routes/payment/verify");
const dashbaordRouter = require("./routes/dashboard");
const multerErrorHandler = require("./middleware/multerhandler");
const { roles } = require("./config/roles");
app.use(paymentRouter);
app.use(paymentVerify);

app.use(authRouter);
app.use(orderRouter);
app.use(portfolioRouter);
app.use(uploadRouter);
app.use(mailRouter);
app.use(dashbaordRouter);
app.use(multerErrorHandler);
const port = process.env.PORT || 4000;
app.listen(port, () => {});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/public/favicon.ico");
});

app.get("/", (req, res) => {
    res.send(`
    <h1>DEV Backend</h1>
   
  <style>*{margin:0;padding:0;body{overflow:hidden}}
  h1{text-align:center}
  body{font-family:sans-serif}
  @media(max-width:767px){
    img{object-fit:cover;height:100%;object-position:center}
  }
  </style>
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
