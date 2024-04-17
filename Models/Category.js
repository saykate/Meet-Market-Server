const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  categoryId: { 
    type: Number, 
    required: true,
  },
  products: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Products'
  }],
});

module.exports = mongoose.model("Category", CategorySchema);