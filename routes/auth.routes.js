const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");

const verifyBody = (req, res, next) => {
  if (!req.body?.username || !req.body?.password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }
  return next();
};

router.post("/login", verifyBody, auth.handleLogin);
router.post("/register", verifyBody, auth.handleRegister);

module.exports = router;
