const List = require("../models/List");
const User = require("../models/User")

const updateList = async (req, res) => {
  try {
    const { _id } = req.params;
    const { category_id } = req.body;

    if (!category_id) {
      return res.status(400).json({ message: "Category ID must be provided" });
    }

    const list = await List.findById(_id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (list.categories.includes(category_id)) {
      list.categories.pull(category_id);
    } else {
      list.categories.push(category_id);
    }

    await list.save();

    return res
      .status(200)
      .json({ message: "List updated successfully", data: list });
  } catch (error) {
    console.error("Error updating list:", error);
    return res
      .status(500)
      .json({ message: "Failed to update list", error: error.message });
  }
};

const findUsersByCategory = async(req, res) =>{
    const { categoryId } = req.params;
    if (!categoryId) {
      return res.status(400).json({ message: 'Category ID must be provided' });
    }
    try {
    const lists = await List.find({ categories: categoryId }).populate('creator').exec();
    const users = lists.map(list => list.creator);
    const uniqueUsers = [...new Set(users.map(user => user._id.toString()))].map(id => users.find(user => user._id.toString() === id))
    return res.status(200).json({ data: uniqueUsers });
  } catch (error) {
    console.error("Error finding users:", error);
    return res
      .status(500)
      .json({ message: "Failed to find users", error: error.message });
  }
}

module.exports = { updateList, findUsersByCategory };
