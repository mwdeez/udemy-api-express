// dependencies
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

// models
let Vehicle = require('./app/models/vehicle.js')

// instantiate the app
let app = express()

// configure for bodyParser
// (allows data from POST body)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// define server
let port = process.env.PORT || 4000

// connect to mongo
mongoose.connect('mongodb://localhost:27017/codealong')

// API routes
let router = express.Router()

// prefix all routes with /api
app.use('/api', router)

// MIDDLEWARE
// good for validations, logging, injecting in the middle
// of a request, failure handling
// middleware: all requests
router.use((req, res, next) => {
  console.log('Hitting that middleware...')

  next()
})

//  test route
router.get('/', (req, res) => res.json({ message: 'Welcome aboard!' }))

router.route('/vehicles')
  .post((req, res) => {
    var vehicle = new Vehicle()  // instantiate our new class

    // assignments
    vehicle.make = req.body.make
    vehicle.model = req.body.model
    vehicle.color = req.body.color

    vehicle.save(err => {
      if (err) {
        // send error if we have one
        res.send(err)
      }
      res.json({message: 'Vehicle was successfully manufactures'})
    })
  })
  .get((req, res) => {
    // find all vehicles
    Vehicle.find((err, vehicles) => {
      if (err) {
        res.send(err)
      }
      res.json(vehicles)
    })
  })

router.route('/vehicle/:vehicle_id')
  .get((req, res) => {
    Vehicle.findById(req.params.vehicle_id, (err, vehicle) => {
      if (err) {
        res.send(err)
      }
      res.json(vehicle)
    })
  })

router.route('/vehicle/make/:make')
  .get((req, res) => {
    Vehicle.find({make: req.params.make}, (err, vehicle) => {
      if (err) {
        res.send(err)
      }
      res.json(vehicle)
    })
  })

// returns the first vehicle that contains a substr of the model param
router.route('/vehicle/model/:model')
  .get((req, res) => {
    Vehicle.find({}, (err, vehicles) => {
      if (err) {
        res.send(err)
      }

      // find the vehicle
      // ignoring case
      let matchedVehicle = ''

      for (vehicle of vehicles) {
        if (vehicle.model.toLowerCase().includes(req.params.model.toLowerCase())) {
          matchedVehicle = vehicle
          break
        }
      }

      if (matchedVehicle) {
        res.json(matchedVehicle)
      } else {
        res.send({message: 'no vehicle found'})
      }
    })
  })

router.route('/vehicle/color/:color')
  .get((req, res) => {
    Vehicle.find({color: req.params.color}, (err, vehicle) => {
      if (err) {
        res.send(err)
      }
      res.json(vehicle)
    })
  })

// start the engine
app.listen(port)

// log to console
console.log('Server listening on port: ' + port)
