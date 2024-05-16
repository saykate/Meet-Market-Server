const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  categories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  }],
});

module.exports = mongoose.model("Department", DepartmentSchema);