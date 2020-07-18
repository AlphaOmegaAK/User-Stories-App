const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: false,
    },
    displayName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: false,
    },
    image: {
      type: false,
    },
    email: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
