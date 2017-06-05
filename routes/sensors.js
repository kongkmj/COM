const express = require('express');
const router = express.Router();


var Sensor = require('../models/sensor');

// Sensor Recieve
router.post('/',function (req,res) {
  var temp = req.body.temp;
  var humi = req.body.humi;
  var light= req.body.light;
  var gas = req.body.gas;
  var fire = req.body.fire;

  // Data recieve Validation
  if(temp===undefined) console.log('Temp is not sended!');
  if(humi===undefined) console.log('Humi is not sended!');
  if(light===undefined)console.log('Light is not sended!');
  if(gas===undefined) console.log('Gas is not sended!');
  if(fire===undefined) console.log('Fire is not sended!');

  var newSensor = new Sensor({
    temp: temp,
    humi: humi,
    light: light,
    gas: gas,
    fire: fire
  });

  /** Validation
    .............
  **/

  Sensor.createSensor(newSensor,function (err,sensor) {
    if(err) throw err;
    //console.log(sensor);
  })
  io.emit('Sensor',newSensor);
  res.json(newSensor);
})


module.exports = router;
