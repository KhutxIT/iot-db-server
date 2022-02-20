const mongoose = require('mongoose');

const lightOperations = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['TURN_ON', 'TURN_OFF'],
      required: true
    },
    time: {
      type: Date,
      default: Date.now(),
      required: true
    },
    light: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Light'
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

const LightOperations = mongoose.model('LightOperations', lightOperations);

module.exports = LightOperations;