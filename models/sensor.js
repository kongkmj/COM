const mongoose = require('mongoose');

// Sensor Schema
var SensorSchema = mongoose.Schema({
	temp: {
		type: String
	},
	humi: {
		type: String
	},
	light: {
		type: String
	},
	fire: {
		type: String
	},
  gas: {
		type: String
	}
});

var Sensor = module.exports = mongoose.model('Sensor', SensorSchema);

module.exports.createSensor = function (newSensor,callback) {
  newSensor.save(callback);
}
