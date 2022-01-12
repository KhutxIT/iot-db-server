const { LightService } = require('../services');
const catchAsync = require('../utils/catchAsync')

const createLight = catchAsync(async (req, res) => {
  let result = await LightService.upsertLight(req.body);
  res.json({
    data: result
  });
})

const updateLight = catchAsync(async (req, res, next) => {
  const data = req.body
  const result = await LightService.upsertLight(data)

  res.json({
    data: result,
  })
})

const removeLight = catchAsync(async (req, res, next) => {
  const data = req.body
  const result = await LightService.removeLight(data)

  res.json({
    data: result
  })
})

const searchLight = catchAsync(async (req, res) => {
  let result = await LightService.fetchLight(req.query);
  res.json({
    data: result
  });
})

module.exports = {
  createLight,
  updateLight,
  removeLight,
  searchLight
}