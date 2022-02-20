const axios = require('axios')
const { SENSOR_URL } = require('../config/common.config');
const { Dht11 } = require('../models');

const saveTempAndHumi = async () => {
  let dht11Data = await axios({
    method: 'get',
    url: `${SENSOR_URL}/dht11`
  });
  let subString = dht11Data.data.split(" ");
  let dht11 = new Dht11({ temperature: subString[0], humidity: subString[1] });
  await dht11.save();
}

const fetchDht11 = async ({ query, light, offset, limit }) => {
  let filter = {}
  offset = offset || 0
  limit = limit || 100

  if (query) {
    filter = {...filter, time: {
      $gte: new Date(query.year, query.month - 1, query.day),
      $lt: new Date(query.year, query.month - 1, query.day + 1)
    }}
  }

  try {
    const result = await Dht11
    .find(filter)
    .skip(offset)
    .limit(limit)
    .lean()
    return result;
  } catch(err) {
    console.log(err);
  }
  
}

module.exports = {
  saveTempAndHumi,
  fetchDht11
}