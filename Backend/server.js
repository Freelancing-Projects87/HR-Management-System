const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const adminRoute=require('./routes/adminRoute')
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();
///middlewares///
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); 

////ROUTES Middleware/////
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);

///Routes/////
app.get("/", (req, res) => {
  res.send("Hello world");
});

////Error Middleware/////
app.use(errorHandler);

const PORT = process.env.PORT
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on port: ", PORT);
    });
  }).catch((err) => console.log(err));
