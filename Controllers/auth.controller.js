const User = require("../models/User");
const List = require("../models/List");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    user.authenticate(password, (err, user, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const token = jwt.sign(
        { sub: user._id, ...user },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );
      res.status(200).json({ data: { JWT: `Bearer ${token}` } });
    });
  } catch (error) {
    next(error);
  }
};

const handleRegister = async (req, res, next) => {
  try {
    const { username, password, bio, birthdate } = req.body;
    User.register(
      new User({ username, bio, birthdate }),
      password,
      async (err, user) => {
        if (err) {
          return next(err);
        }
        const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
          expiresIn: 3600,
        });
        const list = new List({ creator: user._id });
        await list.save();
        res.status(201).json({ data: { JWT: `Bearer ${token}`, user } });
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleRegister,
};
