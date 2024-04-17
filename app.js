require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoDB = process.env.MONGO_CREDS;
const app = express();
const mongoose = require("mongoose");
// const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/users.routes");
// const messageRouter = require("./routes/messages.routes")
const listRouter = require("./routes/lists.routes");
// const departmentRouter = require("./routes/departments.routes")
const whitelist = ["http://localhost:5173", "https://meet-market.netlify.app"];
const corsOptions = { origin: whitelist, credentials: true };

mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));
async function main() {
  mongoose.connect(mongoDB);
}

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/auth", authRouter)
app.use("/users", userRouter);
// app.use("/messages", messageRouter)
app.use("/lists", listRouter);
// app.use("/departments", departmentRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    error: err,
  });
});

module.exports = app;
