// required for schema definition
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// model properties go here
var VehicleSchema = new Schema({
  make: String,
  model: String,
  color: String
})

module.exports = mongoose.model('Vehicle', VehicleSchema)
