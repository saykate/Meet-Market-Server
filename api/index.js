require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoDB = process.env.MONGO_CREDS;
const SECRET = process.env.JWT_SECRET;
const clientURL = process.env.CLIENT_URL
const app = express();
const User = require("../models/User");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const authRouter = require("../routes/auth.routes");
const userRouter = require("../routes/users.routes");
const messageRouter = require("../routes/messages.routes");
const listRouter = require("../routes/lists.routes");
const departmentRouter = require("../routes/departments.routes");
const whitelist = [clientURL, "http://localhost:5173"];
const corsOptions = { origin: whitelist, credentials: true };

mongoose.set("strictQuery", false);
main().catch((err) => console.error(err));
async function main() {
  mongoose.connect(mongoDB);
}

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const checkIsAuthenticated = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      throw new Error(err.message);
    }
    if (!user) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    return next();
  })(req, res, next);
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

passport.use(
  new Strategy(options, async (payload, next) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return next(null, false);
      }
      return next(null, user);
    } catch (error) {
      return next(error);
    }
  })
);

app.get("/", (req, res) => {res.json("Hello from the Server")})
app.use("/auth", authRouter);
app.use("/users", checkIsAuthenticated, userRouter);
app.use("/messages", checkIsAuthenticated, messageRouter)
app.use("/lists", checkIsAuthenticated, listRouter);
app.use("/departments", departmentRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    error: err,
  });
});

module.exports = app;
