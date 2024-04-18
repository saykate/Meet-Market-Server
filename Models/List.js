const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  listName: {
    type: String,
    required: true,
    default: "My List"
  },
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  categories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  }],
});

module.exports = mongoose.model("List", ListSchema);