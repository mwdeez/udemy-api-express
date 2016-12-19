import mongoose from 'mongoose'
import { Router } from 'express'
import Restaurant from '../model/restaurant'

export default({ config, db }) => {
  let api = Router()

  // CREATE
  // '/v1/restaurant/add'
  api.post('/add', (req, res) => {
    let newRest = new Restaurant()
    newRest.name = req.body.name

    newRest.save(err => {
      if (err) {
        res.send(err)
      }
      res.json({ message: `Restaurant saved successfully: ${req.body.name}` })
    })
  })

  // READ
  // /v1/restaurant/ - list all
  api.get('/', (req, res) => {
    Restaurant.find({}, (err, restaurants) => {
      if (err) {
        res.send(err)
      }
      res.json(restaurants)
    })
  })

  // READ
  // v1/restaurant/:id - details
  api.get('/:id', (req, res) => {
    Restaurant.find({_id: req.params.id}, (err, restaurant) => {
      if (err) {
        res.send(err)
      }
      res.json(restaurant)
    })
  })
  // UPDATE

  // DELETE

  return api
}
