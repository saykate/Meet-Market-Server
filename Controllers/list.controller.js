const List = require("../models/List");

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

    // const categoryIdString = category_id.toString();

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

module.exports = { updateList };
