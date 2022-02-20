const LightService = require('./light.service');
const LightOperationsService = require('./light-operations.service');
const AuthService = require('./auth.service');
const SensorService = require('./sensor.service');
const Dht11Service = require('./dht11.service');

module.exports = {
  LightService,
  LightOperationsService,
  AuthService,
  SensorService,
  Dht11Service
}