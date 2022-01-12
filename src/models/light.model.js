const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Light = mongoose.model('Light', lightSchema);

module.exports = Light;