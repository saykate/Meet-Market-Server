const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department'
  },
  // products: [{ 
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'Product'
  // }],
});

module.exports = mongoose.model("Category", CategorySchema);