const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  bio: { 
    type: String, 
    required: true 
  },
  birthdate: { 
    type: Date, 
    required: true 
  },
  profilePhoto: String,
  coverPhoto: String,
  followers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
  following: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);