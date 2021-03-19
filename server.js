if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
//for express-ejs-layouts
app.use(expressLayouts);
//for our css & js
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABSE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", (error) => console.log("Connection Successfull"));

//all out page routing
app.use("/", indexRouter);

app.listen(port);
