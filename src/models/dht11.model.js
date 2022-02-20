const mongoose = require('mongoose');

const dht11 = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      default: Date.now(),
      required: true,
    }
  },
  {
    timestamps: false,
    versionKey: false
  }
);

const Dht11 = mongoose.model('Dht11', dht11);

module.exports = Dht11;