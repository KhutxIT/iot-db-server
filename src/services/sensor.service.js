const axios = require('axios');
const { SENSOR_URL } = require('../config/common.config');
const { Dht11 } = require('../models');
const LightOperationsService = require('./light-operations.service')
const { ObjectId } = require('bson')

const getDataSensor = async () => {

  // get living room led status from esp32 sensor
  let livingroomLedData = await axios({
    method: 'get',
    url: `${SENSOR_URL}/led/1/status`
  });
  let livingroomLedStatus = livingroomLedData.data === 'on' ? 1 : 0;

  // get bed room led status from esp32 sensor
  let bedRoomLedData = await axios({
    method: 'get',
    url: `${SENSOR_URL}/led/2/status`
  });
  let bedRoomLedStatus = bedRoomLedData.data === 'on' ? 1 : 0;

  // get temperature and humidity from esp32 sensor
  let dht11Data = await axios({
    method: 'get',
    url: `${SENSOR_URL}/dht11`
  });
  
  // split dht11Data has type: 'Temp Humi'
  let subString = dht11Data.data.split(" ");

  // save temp and humi has got from esp32 to db
  let dht11 = new Dht11({ temperature: subString[0], humidity: subString[1] });
  await dht11.save();

  // calculate weekly used time all light and dht11
  let weeklyLightsUsedTime = [];
  let date = new Date();
  const led1 = new ObjectId('620fbd3d6936c0154408e263');
  const led2 = new ObjectId('620fbd3a6936c0154408e261');
  let totalTimeLed1ByDate = 0;
  let totalTimeLed2ByDate = 0;
  let i = 6;
  while (i >= 0) {
    let tmpDate = { day: date.getDate() - i, month: date.getMonth() + 1, year: date.getFullYear() };
    totalTimeLed1ByDate = await calLightUsedTimeByDate(tmpDate, led1);
    totalTimeLed1ByDate = Math.round(totalTimeLed1ByDate * 10) / 10
    totalTimeLed2ByDate = await calLightUsedTimeByDate(tmpDate, led2);
    totalTimeLed2ByDate = Math.round(totalTimeLed2ByDate * 10) / 10;
    
    weeklyLightsUsedTime.push({ time: `${date.getDate() - i}-${date.getMonth() + 1}`, led1: totalTimeLed1ByDate, led2: totalTimeLed2ByDate});
    i--;
  }

  let data = [];
  data.push({
    data: { status: livingroomLedStatus },
    name: 'Living Room Light'
  });
  data.push({
    data: { status: bedRoomLedStatus },
    name: 'Bed Room Light'
  });
  data.push({
    data: { temperature: subString[0], humidity: subString[1] },
    name: 'dht11'
  });
  data.push({
    data: weeklyLightsUsedTime,
    name: 'weeklyLightsUsedTime'
  });
  return data;
}

const calLightUsedTimeByDate = async (date, light) => {
  let lightData = await LightOperationsService.fetchLightOperations({ query: date, light: light });

  /**
   * co 2 truong hop ngoai le: 
   *   den bat tu hom qua
   *   den hom nay khong tat
   */
  let totalTime = 0;
  let i = 0;
  if (lightData.length > 0)
    while (i < lightData.length) {
      if (lightData[i+1]) {
        let turnOffTime = lightData[i + 1].time;
        let turnOnTime = lightData[i].time;
        totalTime += Math.abs(turnOffTime - turnOnTime) / (1000 * 60 * 60);
      }
      i = i + 2;
    }

  return totalTime;
}

module.exports = {
  getDataSensor,
}