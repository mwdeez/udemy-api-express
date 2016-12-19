import mongoose from 'mongoose'
import { Router } from 'express'
import Foodtruck from '../model/foodtruck'

export default({ config, db }) => {
  let api = Router()

  // CREATE
  // '/v1/foodtruck/add'
  api.post('/add', (req, res) => {
    let newTruck = new Foodtruck()
    newTruck.name = req.body.name

    newTruck.save(err => {
      if (err) {
        res.send(err)
      }
      res.json({ message: `Foodtruck saved successfully: ${req.body.name}` })
    })
  })

  // READ
  // /v1/foodtruck/ - list all
  api.get('/', (req, res) => {
    Foodtruck.find({}, (err, trucks) => {
      if (err) {
        res.send(err)
      }
      res.json(trucks)
    })
  })

  // READ
  // /v1/foodtruck/:id - details
  api.get('/:id', (req, res) => {
    Foodtruck.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err)
      }
      res.json(truck)
    })
  })

  // UPDATE
  // /v1/foodtruck/:id - update
  api.put('/:id', (req, res) => {
    Foodtruck.findById(req.params.id, (err, truck) => {
      if (err) {
        res.send(err)
      }
      // update restaurant
      truck.name = req.body.name
      truck.save(err => {
        if (err) {
          res.send(err)
        }
        res.json({ message: `successfully updated record ${req.params.id}` })
      })
    })
  })

  // DELETE
  // /v1/foodtruck/:id - delete
  api.delete('/:id', (req, res) => {
    Foodtruck.remove({
      _id: req.params.id
    }, (err, truck) => {
      if (err) {
        res.send(err)
      }
      res.json({ message: `Successfully deleted record ${req.params.id}` })
    })

  })

  return api
}
