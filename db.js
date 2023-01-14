const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://devnew:ashishtech@cluster0.0mkjw2h.mongodb.net/test",
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
