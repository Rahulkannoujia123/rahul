const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(
    cors({
        origin: "*",
        methods:["GET","POST","PUT","DELETE","PATCH"]
    })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
require("./db");
const authRouter = require("./routes/auth");
const portfolioRouter = require("./routes/portfolio");
const orderRouter = require("./routes/order");
// const uploadRouter = require("./routes/upload");
const mailRouter = require("./routes/sendmail");
const paymentRouter = require("./routes/payment/payment");
const paymentVerify = require("./routes/payment/verify");
const dashbaordRouter = require("./routes/dashboard");
// const multerErrorHandler = require("./middleware/multerhandler");
const { roles } = require("./config/roles");
// app.use(paymentRouter);
// app.use(paymentVerify);
// app.use("/upload", express.static("upload"));
// app.use(authRouter);
// app.use(orderRouter);
// app.use(portfolioRouter);
// app.use(uploadRouter);
// app.use(mailRouter);
// app.use(dashbaordRouter);
// app.use(multerErrorHandler);
const port = process.env.PORT || 4000;
app.listen(port, () => {});
app.get("/", (req, res) => {
    res.send("API RUNNING");
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
