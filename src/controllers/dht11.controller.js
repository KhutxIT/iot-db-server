const { Dht11Service } = require('../services');
const catchAsync = require('../utils/catchAsync')

const saveTempAndHumi = catchAsync(async (req, res) => {
  await Dht11Service.saveTempAndHumi();
  res.send();
})

module.exports = {
  saveTempAndHumi
}