const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dev2:ashishtech@dev2.e6btfbw.mongodb.net/test",
    // "mongodb://localhost:27020/mydb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Could not connect", err);
  });
process.on("unhandledRejection", (err) => console.log("----unhandled error---", err.message));
