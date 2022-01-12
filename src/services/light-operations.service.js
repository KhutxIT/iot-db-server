const { LightOperations } = require('../models');
const { ObjectId } = require('bson')
const { getObjectId } = require("../utils/common-util")
const { AppException } = require('../exceptions')

const createLightOperations = async (data) => {
  if (!data.light)
    throw new AppException('Light ID is required!')
  
  let lightOperations = new LightOperations(data)

  data = await lightOperations.save();

  return data && data.toObject()
}

const fetchLightOperations = async ({ query, light, offset, limit }) => {
  let filter = {}
  offset = offset || 0
  limit = limit || 100

  if (query) {
    filter = {...filter, $text: { $search: query }}
  }

  if (light) {
    filter = {...filter, light: getObjectId(light) }
  }

  const result = await LightOperations
    .find(filter)
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 })

  return result;
}

module.exports = {
  createLightOperations,
  fetchLightOperations
}