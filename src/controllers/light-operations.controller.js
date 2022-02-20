const { LightOperationsService } = require('../services');
const catchAsync = require('../utils/catchAsync')

const createLightOperations = catchAsync(async (req, res) => {
  await LightOperationsService.createLightOperations(req.body);
  res.send();
})

const searchLightOperations = catchAsync(async (req, res) => {
  let result = await LightOperationsService.fetchLightOperations(req.query);
  res.json({
    data: result
  });
})

module.exports = {
  createLightOperations,
  searchLightOperations
}