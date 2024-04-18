const User = require("../models/User");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users: ", users);
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
      return res.status(400).json({ message: "Missing required fields" })
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id, 
      body, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Success updating user", data: updatedUser})
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};
// exports.getUserMessages = async (req, res) => {};
// exports.getUserLists = async (req, res) => {};