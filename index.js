const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(
    cors({
        origin: "*",
        credentials:true,
        crossorigin: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    })
);
app.use(cookieParser());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/upload", express.static(path.join(__dirname, "upload")));
app.get("/cookie",(req,res)=>{
    res.cookie("dev",'ashish',{
  
    })
    res.json({
        success:true,
        message:"cookie set"
    })
})
require("./db");
const authRouter = require("./routes/auth");
const portfolioRouter = require("./routes/portfolio");
const profileRouter = require("./routes/profile");
const orderRouter = require("./routes/order");
const adminRouter = require("./routes/admin");
const uploadRouter = require("./routes/upload");
const mailRouter = require("./routes/sendmail");
const paymentRouter = require("./routes/payment/payment");
const paymentVerify = require("./routes/payment/verify");
const dashbaordRouter = require("./routes/dashboard");
const multerErrorHandler = require("./middleware/multerhandler");
const { roles } = require("./config/roles");
const {success}=require("./utils/httpcode");
app.use(paymentRouter);
app.use(paymentVerify);

app.use(authRouter);
app.use(adminRouter);
app.use(orderRouter);
app.use(portfolioRouter);
app.use(profileRouter);
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
    res.sendFile(path.join(__dirname, "public", "index.html"));
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
