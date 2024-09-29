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

exports.getUserCategories = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "User Id required" });
    }

    const user = await User.findById(_id).populate("categories");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Success fetching Categories", data: user.categories });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch Categories", error: error.message });
  }
};

exports.addCategoryToUser = async (req, res) => {
    try {
      const { _id } = req.params;
      const { category_id } = req.body;
  
      if (!category_id) {
        return res.status(400).json({ message: "Category ID must be provided" });
      }
  
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.categories.push(category_id);
      await user.save();
  
      return res
        .status(200)
        .json({ message: "Category added successfully", data: user });
    } catch (error) {
      console.error("Error adding category:", error);
      return res
        .status(500)
        .json({ message: "Failed to add category", error: error.message });
    }
  };

 exports.removeCategoryFromUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { category_id } = req.body;

    if (!category_id) {
      return res.status(400).json({ message: "Category ID must be provided" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.categories.pull(category_id);
    await user.save();

    return res.status(200).json({ message: "Category removed successfully", data: user });
  } catch (error) {
    console.error("Error removing category:", error);
    return res.status(500).json({ message: "Failed to remove category", error: error.message });
  }
};
  
exports.findUsersByCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ message: "Category ID must be provided" });
  }
  try {
    const users = await User.find({ categories: categoryId }).exec();
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error finding users:", error);
    return res.status(500).json({ message: "Failed to find users", error: error.message });
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

    const userMessages = await Message.find({
      $or: [{ author: user._id }, { recipient: user._id }],
    }).populate("author recipient");

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

exports.followUser = async (req, res) => {
  try {
    const { userId, targetUserId } = req.body;

    if (!targetUserId) {
      return res.status(404).json({ message: "Target user ID must be provided" });
    }

    if (!userId) {
      return res.status(404).json({ message: "Current user must be authenticated" });
    }

    const targetUser = await User.findById(targetUserId)
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found"})
    }

    const currentUser = await User.findById(userId)
    if (!currentUser) {
      return res.status(404).json({ message: "Target user not found"})
    }

    console.log("current user", currentUser)


    await User.findByIdAndUpdate(userId, {
      $addToSet: { following: targetUserId }
    })
    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: userId }
    })
    return res
    .status(200)
    .json({ message: "Successfully followed the user" });
  } catch (error) {
    console.error("Error following user", error);
    return res
      .status(500)
      .json({ message: "Error following user" });
  }
}

exports.getUserFollowers = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "User Id required" });
    }

    const user = await User.findById(_id).populate("followers");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("followers", res)

    return res
      .status(200)
      .json({ message: "Success fetching followers", data: user.followers });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch followers", error: error.message });
  }
};

exports.getUserFollowing = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ message: "User Id required" });
    }

    const user = await User.findById(_id).populate("following");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Success fetching following", data: user.following });
  } catch (error) {
    console.error("Error updating user:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch following", error: error.message });
  }
};