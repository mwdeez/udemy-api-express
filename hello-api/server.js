// dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// models
var Vehicle = require('./app/models/vehicle.js');

// instantiate the app
var app = express();

// configure for bodyParser
// (allows data from POST body)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// define server
var port = process.env.PORT || 4000;

// connect to mongo
mongoose.connect('mongodb://localhost:27017/codealong');

// API routes
var router = express.Router();

// prefix all routes with /api
app.use('/api', router);


// MIDDLEWARE!
// good for validations, logging, injecting in the middle
// of a request, failure handling
// middleware: all requests
router.use(function(req, res, next) {
  console.log('Hitting that middleware...')

  next();
});

//  test route
router.get('/', function(req, res) {
  res.json({message: 'Welcome aboard!'});
});

router.route('/vehicles')
  .post(function(req, res) {
    var vehicle = new Vehicle();  // instantiate our new class

    // assignments
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err) {
      success = {message: 'Vehicle was successfully manufactured!'};
      err ? res.send(err) : res.json(success)
    });
  })
  
  .get(function(req, res) {
    // find the requested vehicle
    Vehicle.find(function(err, vehicles) {
      err ? res.send(err) : res.json(vehicles)
    });
  });

router.route('/vehicle/:vehicle_id')
  .get(function(req, res) {
    Vehicle.findById(req.params.vehicle_id, function(err, vehicle) {
      err ? res.send(err) : res.json(vehicle)
    });
  });

router.route('/vehicle/make/:make')
  .get(function(req, res) {
    Vehicle.find({make: req.params.make}, function(err, vehicle) {
      err ? res.send(err) : res.json(vehicle)
    });
  });

router.route('/vehicle/color/:color')
  .get(function(req, res) {
    Vehicle.find({color: req.params.color}, function(err, vehicle) {
      err ? res.send(err) : res.json(vehicle)
    });
  });

// start the engine
app.listen(port);

// log to console
console.log('Server listening on port: ' + port);
