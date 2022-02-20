const { LightOperations, Light } = require('./src/models');
const { getObjectId } = require("./src/utils/common-util")
const mongoose = require('mongoose');
const { DB_URL } = require('./src/config/common.config');

const connectDB = async () => {
  try {
    const con = await mongoose.connect(DB_URL, {
      autoIndex: true // default: true
    });

    console.log(`Connected to MongoDB, port: ${con.connection.port}`)
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

connectDB();

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

let date = { year: 2022, month: 2, day: 14}

// pro.then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log(err)
// })

const tes = async () => {
  let led = await Light.findOne({ name: 'led 1' });
  let res = await fetchLightOperations({query: date, light: led.id});
  console.log('ahihi');
}

tes();