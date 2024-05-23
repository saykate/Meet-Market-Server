const List = require("../models/List");
const User = require("../models/User");
const Message = require("../models/Message");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "success", data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};
exports.getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "success", data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { body } = req;
    if (!_id || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const updatedUser = await User.findByIdAndUpdate(_id, body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Success updating user", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

exports.getUserLists = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "User Id required" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userLists = await List.find({ creator: user._id }).populate('categories');

    return res
      .status(200)
      .json({ message: "Success fetching Lists", data: userLists });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch Lists", error: error.message });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "User Id required" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userMessages = await Message.find({ $or: [{ author: user._id }, { recipient: user._id }] }).populate('author recipient');

    return res
      .status(200)
      .json({ message: "Success fetching Messages", data: userMessages });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch Messages", error: error.message });
  }
};
