const { SensorService } = require('../services');
const catchAsync = require('../utils/catchAsync')

const getDataSensor = catchAsync(async (req, res) => {
  let result = await SensorService.getDataSensor();
  res.json({
    data: result
  });
})

module.exports = {
  getDataSensor
}