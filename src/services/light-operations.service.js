const { LightOperations, Light } = require('../models');
const { ObjectId } = require('bson')
const { getObjectId } = require("../utils/common-util")
const { AppException } = require('../exceptions')
const axios = require('axios')
const { SENSOR_URL } = require('../config/common.config');

const createLightOperations = async (data) => {
  if (!data.name)
    throw new AppException('Light name is required!')
  
  let type = data.data.status == 1 ? 'TURN_ON' : 'TURN_OFF';
  let date = data.date ? new Date(data.date) : Date.now()
  let led = await Light.findOne({ name: data.name });

  let lightOperations = new LightOperations({type: type, light: led.id, time: date})

  await lightOperations.save();

  if (data.date) return;

  let ledSensorId = data.name === 'Living Room Light' ? 1 : 2;
  let action = data.data.status == true ? 'on' : 'off';

  await axios({
    method: 'POST',
    url: `${SENSOR_URL}/led/${ledSensorId}/${action}`
  });
}

const fetchLightOperations = async ({ query, light, offset, limit }) => {
  let filter = {}
  offset = offset || 0
  limit = limit || 100

  if (query) {
    filter = {...filter, time: {
      $gte: new Date(query.year, query.month - 1, query.day),
      $lt: new Date(query.year, query.month - 1, query.day + 1)
    }}
  }

  if (light) {
    filter = {...filter, light: getObjectId(light) }
  }

  try {
    const result = await LightOperations
    .find(filter)
    .skip(offset)
    .limit(limit)
    .sort({ time: 1 })
    .lean()
    return result;
  } catch(err) {
    console.log(err);
  }
  
}

module.exports = {
  createLightOperations,
  fetchLightOperations
}