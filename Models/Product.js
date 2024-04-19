const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  }
});

module.exports = mongoose.model("Product", ProductSchema);