const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product: {
    type: String,
    required: true,
  },
  productId: { 
    type: Number, 
    required: true,
  }
});

module.exports = mongoose.model("Product", ProductSchema);