const mongoose = require("mongoose");
mongoose
    .connect(
        // process.env.MONGO_URL,
        "mongodb://127.0.0.1:27017/mydb",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("database connected");
    })
    .catch(err => {
        console.log("Could not connect", err);
    });
process.on("unhandledRejection", err => console.log("----unhandled error---", err.message));
