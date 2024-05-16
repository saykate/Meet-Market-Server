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
  departments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department'
  }],
});

module.exports = mongoose.model("List", ListSchema);
