const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  department: {
    type: String,
    required: true,
  },
  departmentId: { 
    type: Number, 
    required: true,
  },
  categories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  }],
});

module.exports = mongoose.model("Department", DepartmentSchema);