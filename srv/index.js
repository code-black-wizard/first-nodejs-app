const express = require('express')
const cors = require('cors')
const app = express()
const MongoClient = require('mongodb').MongoClient
const { createTask, getTasks, removeTask } = require('./router')
const { handleError, handleErrorCustom } = require('./helpers/handlerError')

MongoClient.connect('mongodb://localhost:27017')
  .then(client => {
    const db = client.db('myFirstDatabase')
    app.use(cors())
    app.use(express.json())
    createTask(app, db, handleErrorCustom)
    getTasks(app, db)
    removeTask(app, db, handleErrorCustom)
    app.use((err, req, res, next) => {
      handleError(err, res)
    })
    app.listen(3000, () => {
      console.log('Example app listening on port 3000!')
    })
  })
  .catch(err => {
    throw err
  })
