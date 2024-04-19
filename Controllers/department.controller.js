const Department = require("../models/Department");

exports.listDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ message: "success", data: departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch departments", error: error.message });
  }
};

exports.getDepartment = async (req, res) => {
  try {
    const { _id } = req.params;
    const department = await Department.findById(_id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    return res.status(200).json({ message: "success", data: department });
  } catch (error) {
    console.error("Error fetching department:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch department", error: error.message });
  }
};