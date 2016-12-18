import mongoose from 'mongoose';
let Schema = mongoose.Scheme;

let restaurantSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Restaurant');
