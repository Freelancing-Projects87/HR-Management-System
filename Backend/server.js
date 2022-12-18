const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddleware");
const app = express();

///middlewares///
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());



////ROUTES Middleware/////
app.use("/api/users", userRoute);

///Routes/////
app.get("/", (req, res) => {
  res.send("Hello world");
});

////Error Middleware/////
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port: ", PORT);
    });
  })
  .catch((err) => console.log(err));
